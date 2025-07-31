import fs from "fs";
import fg from 'fast-glob';
import process from 'process';
import pkg from '../package.json' with { type: "json" };
import path from 'path';
import ora from 'ora';

import { BlobServiceClient } from '@azure/storage-blob';
import { createTableService, TableUtilities } from 'azure-storage';
import { exit } from 'process';


const spinner = ora('Codenotch : Publishing package...').start();
const configPath = path.join(process.cwd(), 'codenotch.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

let connStr = "DefaultEndpointsProtocol=https;AccountName=sioaumlcomponentsprod;AccountKey=E+v1MLkmQidanx2YRr1S5+bEAutm9ipaIeIONMaWxS9R7lxTCaTqQ6hRAyYQjF8eNHKDJjaOovYZdyvU6DJTYg==;EndpointSuffix=core.windows.net";
process.env.AZURE_STORAGE_CONNECTION_STRING = connStr;

let blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

const containerName = "public-js";
const containerClient = blobServiceClient.getContainerClient(containerName);

const jsContentType = { blobHTTPHeaders: { blobContentType: 'text/javascript' } };
const jsonContentType = { blobHTTPHeaders: { blobContentType: 'application/json' } };

console.log(config.outDir);
console.log(path.join(process.cwd(), config.outDir));
const includes = [
    config.outDir + '/*.js.gz',
    config.outDir + '/*.cjs.gz',
    config.outDir + '/*.js',
    config.outDir + '/*.cjs',
]

const hasGZ = includes.some(include => include.endsWith('.gz'));

const outFiles = await fg(includes, {
    cwd: process.cwd(),
    absolute: true,
});

if (outFiles.length === 0) {
    spinner.fail(`No output files found in ${config.outDir}`);
    exit(1);
}

jsContentType.blobHTTPHeaders.blobContentEncoding = 'gzip';


let name = pkg.codenotch?.['library-name'] || pkg.name;
let company = '';
let pkgFolder = '';
let partition = '';
let row = '';
let latest = '';

if (name.includes('/')) {
    let split = name.split('/');
    //removes @ char
    company = split[0].substring(1);
    name = split[1];

    pkgFolder = `${company}/${name}/${pkg.version}/`;
    partition = company;
    row = `${company}-${name}@${pkg.version}`;
    latest = `${company}-${name}@latest`;
}
else {
    pkgFolder = `${name}/${pkg.version}/`;
    partition = 'common';
    row = `${name}@${pkg.version}`;
    latest = `${name}@latest`;
}

const baseBundleName = `${pkgFolder}bundle${hasGZ ? '.gz' : ''}.js`;

for (const file of hasGZ ? outFiles.filter(f => f.endsWith('.gz')) : outFiles) {
    const bundleContent = fs.readFileSync(file);
    const extension = path.basename(file).split('.').slice(1).join('.');
    const bundleName = `${pkgFolder}bundle.${extension}`;
    const bundleBlob = containerClient.getBlockBlobClient(bundleName);
    const bundleResponse = await bundleBlob.upload(bundleContent, bundleContent.length, jsContentType);
    spinner.info(`Bundle uploaded: ${bundleName} (${bundleResponse._response.status})`);
}

const dspContent = fs.readFileSync(path.join(process.cwd(), config.outDir, 'dsp.json'), 'utf8');
const dspName = `${pkgFolder}dsp.json`
const dspBlob = containerClient.getBlockBlobClient(dspName);
const dspResponse = await dspBlob.upload(dspContent, dspContent.length, jsonContentType);
spinner.info(`DSP uploaded: ${dspName} (${dspResponse._response.status})`);

var tableService = createTableService();

tableService.createTableIfNotExists('compMP', function (error, result, response) {
    if (!error) {
        var entGen = TableUtilities.entityGenerator;
        var entity = {
            PartitionKey: entGen.String(partition),
            RowKey: entGen.String(row),
            bundleLocation: entGen.String(baseBundleName),
            dspLocation: entGen.String(dspName),
            packageLocation: entGen.String(pkgFolder),
            version: entGen.String(pkg.version),
        };

        //console.log(`creating table entity partition:${partition} row:${row} version:${pkg.version} location:${pkgFolder} `);
        tableService.insertEntity('compMP', entity, function (error, result, response) {
            if (!error) {
                // result contains the ETag for the new entity
                //console.log('no error '+response.statusCode)
            }
            else {
                //console.log('error '+response.error);
            }
        });

        spinner.info(`Package data uploaded`);

        var latestEntity = {
            PartitionKey: entGen.String(partition),
            RowKey: entGen.String(latest),
            bundleLocation: entGen.String(baseBundleName),
            dspLocation: entGen.String(dspName),
            packageLocation: entGen.String(pkgFolder),
            version: entGen.String(pkg.version),
        };

        //console.log(`creating LATEST table entity partition:${partition} row:${latest} version:${pkg.version} location:${pkgFolder} `);

        tableService.insertOrReplaceEntity('compMP', latestEntity, function (error, result, respons) {
            if (!error) {
                // result contains the ETag for the new entity
                //console.log('no error '+response.statusCode)
            }
            else {
                //console.log('error '+response.error);
            }
        })
    }
});
spinner.succeed(`Package published`);