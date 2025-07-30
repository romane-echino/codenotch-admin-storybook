export var SourceType;
(function (SourceType) {
    SourceType["Array"] = "array";
    SourceType["SIOQL"] = "sioql";
    SourceType["API"] = "api";
    SourceType["Unknown"] = "unknown";
})(SourceType || (SourceType = {}));
export function getSourceType(source) {
    if (source === null || source === undefined) {
        return SourceType.Unknown;
    }
    else if (Array.isArray(source)) {
        return SourceType.Array;
    }
    else if (typeof source === 'object') {
        const request = source;
        if (request && request.state && request.state !== 'success') {
            return SourceType.Unknown;
        }
        else if (Array.isArray(request.data)) {
            return SourceType.API;
        }
        else if (typeof request.data === 'object' && request.data !== null) {
            return SourceType.SIOQL;
        }
    }
    return SourceType.Unknown;
}
export function getDataFromSource(source) {
    if (source === null || source === undefined) {
        return [];
    }
    switch (getSourceType(source)) {
        case SourceType.Array: return source;
        case SourceType.Unknown: return [];
        case SourceType.API: return source.data || [];
        case SourceType.SIOQL:
            {
                const arrayKey = getArrayKey(source);
                return arrayKey ? source.data[arrayKey] : [];
            }
    }
}
export function getArrayKey(source) {
    if (source === null || source === undefined || getSourceType(source) !== SourceType.SIOQL) {
        return undefined;
    }
    return Object.keys(source.data).find(key => Array.isArray(source.data[key]));
}
export function getColumnsFromSource(source) {
    if (source === null || source === undefined) {
        return [];
    }
    switch (getSourceType(source)) {
        case SourceType.Array:
            return Object.keys(source[0])
                .filter(key => typeof source[0][key] !== 'object'
                && typeof source[0][key] !== 'function'
                && !Array.isArray(source[0][key]));
        case SourceType.Unknown:
            return [];
        case SourceType.API:
            return Object.keys(source.data[0])
                .filter(key => typeof source.data[0][key] !== 'object'
                && typeof source.data[0][key] !== 'function'
                && !Array.isArray(source.data[0][key]));
        case SourceType.SIOQL:
            {
                const arrayKey = getArrayKey(source);
                if (arrayKey && source.data[arrayKey].length > 0) {
                    return Object.keys(source.data[arrayKey][0]);
                }
                return [];
            }
    }
}
export function getIndexFromSource(source, value, valueField) {
    let defaultIndex = -1;
    if (value !== undefined && value !== null) {
        if (valueField) {
            defaultIndex = source.findIndex((item) => item[valueField] === value);
        }
        else {
            defaultIndex = source.findIndex((item) => item === value);
        }
    }
    return defaultIndex;
}
