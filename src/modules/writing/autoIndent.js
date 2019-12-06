import $ from 'jquery'
function autoIndent(ta, indent) {
    indent || (indent = "\t");
    let text = $(ta).val()
    
    $(ta).val(text.replace(/\\n/,indent))

}

export default autoIndent;