
import fs from "fs";
import fg from 'fast-glob';
import process from 'process';
import { parse } from 'react-docgen-typescript';
import pkg from '../package.json' with { type: "json" };
import path from 'path';
import ora from 'ora';

(async () => {
  const spinner = ora('Codenotch : Generating DSP...').start();

  const configPath = path.join(process.cwd(), 'codenotch.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));


  // 1. Find all .tsx/.jsx files
  const files = await fg(config.include, {
    ignore: config.exclude,
    cwd: process.cwd(),
    absolute: true,
  });
  const componentFiles = files.filter(f => f.endsWith('.tsx') || f.endsWith('.jsx'));

  const baseDSP = {
    "dsp_spec_version": "1.0",
    "last_updated": new Date().toISOString(),
    "settings": {
      "languages": [
        {
          "label": "Scenar.io",
          "export_tokens": false,
          "snippet_id": "scenar.io",
          "syntax": "text/xml"
        }
      ],
      "name": pkg.codenotch?.['library-name'],
      "package_version": pkg.version,
    },
    "last_updated_by": "unknown",
    "ext-com_echino-library": {
      "logo": "",
      "displayName": pkg.codenotch?.['library-name'],
    },
    "entities": []
  };

  // 2. Extract DSP info from each component file
  for (const file of componentFiles) {
    const name = path.basename(file, path.extname(file));
    const folderName = path.dirname(file).split('/').pop();
    const baseComponent = {
      "class": "component",
      "type": "page",
      "id": name,
      "name": name,
      "snippets": { "trigger": name, "languages": {} },
      "ext-com_echino-entity": {
        "menuPath": folderName,
        "kind": "react",
        "props": []
      },
      "description": "",
      "last_updated": new Date().toISOString(),
      "last_updated_by": "unknown",
      "tags": [],
      "related_entity_ids": []
    }

    // Parse the component file to extract props and other metadata
    // Using react-docgen-typescript to parse the file
    const parsedComponent = parse(file, {
      savePropValueAsString: true,
      shouldExtractLiteralValuesFromEnum: true,
      shouldExtractValuesFromUnion: true,
    });

    // Parse the component file to extract tags
    if (parsedComponent && parsedComponent.length > 0 && parsedComponent[0].tags) {
      const tags = parsedComponent[0].tags;
      if (tags.snippet) {
        baseComponent.snippets.languages = {
          "scenar.io": tags.snippet.replace(/\\n/g, "\n").replace(/\\t/g, "\t")
        }
      }
      if (tags.hidden) {
        continue; // Skip hidden components
      }
    }

    // Extract bindable values from the file content
    const fileContent = fs.readFileSync(file, 'utf-8');
    const bindableValues = [];

    for (const match of fileContent.matchAll(/onPropertyChanged\(['"`](.+)['"`]/gm)) {
      const bindableValue = match[1];
      bindableValues.push(bindableValue);
    }

    if (bindableValues.length > 0) {
      baseComponent["ext-com_echino-entity"].bindable = bindableValues;
    }

    // If the component has a description, add it to the baseComponent
    if (parsedComponent && parsedComponent.length > 0 && parsedComponent[0].description) {
      baseComponent.description = parsedComponent[0].description;
    }

    const parsedProps = parsedComponent[0].props;

    // Loop through each prop and extract relevant information
    for (const [propName, info] of Object.entries(parsedProps)) {

      const prop = {
        "name": info.name || propName,
        "displayName": info.name || propName
      }

      if (info.parent?.fileName.includes('codenotch.d.ts')) {
        if (info.parent?.name === 'IChildrenInheritedProps') {
          if (!baseComponent["ext-com_echino-entity"].childrenProps) {
            baseComponent["ext-com_echino-entity"].childrenProps = [];
          }

          const childrenProps = info.type.name;

          if (childrenProps.includes('{')) {

          }
          else {
            const ccInterfaceMatch = fileContent.match(/Test\s+{(.+?)}/gms);
            if (ccInterfaceMatch && ccInterfaceMatch.length > 0) {
              const ccTypes = ccInterfaceMatch[0].matchAll(/^\s*([\w$]+)\??:\s*([^;]+);/gms);
              for (const [ccMatch, ccKey, ccType] of ccTypes) {
                spinner.info(`Found children props for ${name} - ${ccKey}: ${ccType}`);
                baseComponent["ext-com_echino-entity"].childrenProps.push({
                  "name": ccKey,
                  "description": `${ccKey} field for ${name}`,
                  "type": ccType
                });
              }
            }
          }

          continue;
        }
        else {
          continue; // Skip props that are not directly defined in the component
        }
      }

      if (info.defaultValue) {
        prop.default = info.defaultValue.value;
      }

      if (info.required) {
        prop.required = info.required;
      }

      if (info.description) {
        prop.description = info.description;
        if (info.description.includes('@hidden')) {
          spinner.info(`Skipping hidden prop: ${name}.${propName}`);
          continue; // Skip hidden props
        }
      }

      switch (info.type.name) {
        case 'string':
          prop.type = 'string';
          break;
        case 'number':
          prop.type = 'number';
          break;
        case 'boolean':
          prop.type = 'boolean';
          break;
        case 'enum':
          switch (info.type.raw) {
            case 'ReactNode':
              prop.type = 'reactNode';
              break;
            case 'boolean':
              prop.type = 'boolean';
              break;
            default:
              if (!info.type.raw.includes('\"')) {
                prop.type = 'string';
                prop.enum = info.type.value.map(v => v.value.replace(/\"/g, ''));
              }
              break
          }
          break;
        default:
          if (info.type.name.match(/\(\s*as\s*:\s*string\s*,\s*data\s*:\s*any\s*\)\s*=>\s*ReactNode/g)) {
            prop.type = 'renderer';
          }
          else if (info.type.name.match(/\(.+\)\s*=>\s*.+/g)) {
            prop.type = 'action';
          }
          else if (info.type.name.match(/Action.*/g)) {
            prop.type = 'action';
          }
          break;

      }

      baseComponent["ext-com_echino-entity"].props.push(prop);
    }

    baseDSP.entities.push(baseComponent);
  }

  // 3. Write DSP spec to JSON file
  fs.writeFileSync(
    path.join(process.cwd(), config.outDir, 'dsp.json'),
    JSON.stringify(baseDSP, null, 2),
    'utf-8'
  );
  spinner.succeed('Codenotch : DSP generated successfully');
})();