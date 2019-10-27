import replace from '../libraries/replace'
import getIndicesOf from './getIndicesOf'

export default function checkReplace(text, suggestions) {
    for (var p = 0; p < replace.length; p++) {
        let pair = replace[p];

        let replaceWord = Object.keys(pair)[0];
        let indices = getIndicesOf(text, replaceWord+' ')
        var current = [];
        for (var g = 0; g < suggestions.length; g++) {
            current.push(suggestions[g].index);
        }
        for (var i = 0; i < indices.length; i++) {
            if (!current.includes(indices[i])) {
                suggestions.unshift({
                    index: indices[i],
                    offset: replaceWord.length,
                    reason: `${Object.values(pair)[0]}`,
                    type: 'replace'
                })
            }
        }
    }
    return suggestions
}