export function toAUMLCode(componentName:string ,args:any, namespace:string = 'c'){
    const entries = Object.entries(args).filter(([key]) => key !== 'children');
    const children = args['children'];
return `<${namespace}:${componentName}${entries.length > 0 ? ' ' : ''}${entries.map(([key, value]) => `${key}="${value}"`).join(' ')}${children ? `>\t\n${children}\n</${namespace}:${componentName}>` : '/>'}`;
}