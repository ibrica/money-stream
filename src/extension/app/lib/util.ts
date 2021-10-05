// TODO: Recheck this approach, scope of callbacks?

export function JSONStringifyFunctions(obj: any): string {
    // First flatten object (include prototype properties)
    let flatObj: object = flatten(obj);
    // get a stringified version of our object
    // and indent the keys at 2 spaces
    return JSON.stringify(flatObj, function(k,value){ // replacer function
        //special treatment for function types
        if(typeof value === "function"){
            return value.toString();//save the function as string
        }
        return value;
    }, 2);
}

// Add all proto elements in real object, use recursion
function flatten(obj: object) {
    if (obj === null) {
        return null;
    }

    if (Array.isArray(obj)) {
        var newObj = [];
        for (var i = 0; i < obj.length; i++) {
            if (typeof obj[i] === 'object') {
                newObj.push(flatten(obj[i]));
            }
            else {
                newObj.push(obj[i]);
            }
        }
        return newObj;
    }

    var result = Object.create(obj);
    for(var key in result) {
        if (typeof result[key] === 'object') {
            result[key] = flatten(result[key]);
        }
        else {
            result[key] = result[key];
        }
    }
    return result;
}

export function JSONParseFunctions (serialized: string) {
        return JSON.parse(serialized, function(key,value){ // reviver
            // TODO: find a better way to determ if a value is a function string
            if(typeof value === "string" && (value.indexOf("function") !== -1 || value.indexOf("=>") == -1)){
                let functionTemplate = `(${value})`;    
                return eval(functionTemplate); 
            }
            return value;
    });
}
