let listeners = [];

document.querySelectorAll('body main *').forEach(element => {
    let rootNode = element.childNodes[0];
    if (!rootNode || !rootNode.nodeValue) return;
    let textContent = rootNode.textContent.trim();
    if (textContent.includes("\{\{") && textContent.includes("}}")) {
        var variables = getHTMLInLineVariables(textContent);
        if (variables.length === 0) return;
        variablesValues = [];
        variables.forEach(variable => variablesValues[variable] = undefined);
        listeners.push({ element: rootNode, content: textContent, variables: variablesValues });
    }
});

function getHTMLInLineVariables(str) {
    let result = [];
    let openBracesIndex = -1;
    for(let i = 0; i < str.length; i++) { 
        // If opening delimiter is encountered 
        if (str.substring(i, i + 2) === "\{\{" && openBracesIndex === -1)
            openBracesIndex = i;
        // If closing delimiter is encountered 
        else if (str.substring(i, i + 2) === "}}" && openBracesIndex > -1) {
            let substring = str.substring(openBracesIndex + 2, i);
            result.push(substring);
            openBracesIndex = -1;
        } 
    }
    return result;
}

function getKeysArray(str) {
    let results = [];
    let values = str.split(".");
    values.forEach(val => {
        if (!val.includes("[")) results.push(val);
        else val.split("[").forEach(val => results.push(val.replace("]", "")));
    });
    return results;
}

const KSDom = {
    updateListeners(variableName, newValue) {
        let updatedListeners = [];
        listeners.forEach(listener => {
            let isUpdated = false;
            Object.keys(listener.variables).forEach(variableKey => {
                let value = structuredClone(newValue);
                let keysArray = getKeysArray(variableKey.trim());
                if (keysArray[0] === variableName) {
                    if (keysArray.length > 1)
                        for(let i = 1; i < keysArray.length; i++)
                            value = value[keysArray[i]];
                    isUpdated = true;
                    listener.variables[variableKey] = value;
                }
            });
            if (isUpdated)
                updatedListeners.push(listener);
        });
        updatedListeners.forEach(listener => {
            let textContent = listener.content;
            Object.keys(listener.variables).forEach(variableKey =>
                textContent = textContent.replaceAll("\{\{" + variableKey + "}}", listener.variables[variableKey])
            );
            listener.element.textContent = textContent;
        });
    }
};