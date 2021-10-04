export function JSONStringifyFunctions(obj: any): string {
    return JSON.stringify(obj, function(k,v){
        //special treatment for function types
        if(typeof v === "function")
            return v.toString();//we save the function as string
        return v;
    });
}


function compileFunction(str: string){
    //find parameters
    let pstart = str.indexOf('('), pend = str.indexOf(')');
    let params = str.substring(pstart+1, pend);
    params = params.trim();
    //find function body
    let bstart = str.indexOf('{'), bend = str.lastIndexOf('}');
    str = str.substring(bstart+1, bend);
    return Function(params, str);
}

export function JSONParseFunctions (serialized: string) {
    console.log("Compile");
    console.log(this);
    console.log(serialized);
        return JSON.parse(serialized, function(k,v){
            // TODO: find a better way to determ if a value is a function string
            if(typeof v === "string" && v.indexOf("function") !== -1)
                return compileFunction(v);
            return v;
    });
}
