declare var require: any;
const queryString = require("query-string");

export function queryBuilder(baseUrl : string, options : Object){
    return `${baseUrl}?${queryString.stringify(options)}`
}