export function toAUMLCode(componentName:string ,args:object, namespace:string = 'c'){
return `<${namespace}:${componentName} ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')} />`;
}