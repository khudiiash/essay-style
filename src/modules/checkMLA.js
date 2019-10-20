/* eslint-disable no-useless-escape */

function checkMLA(citation) {
    //MLA
    var _45 = /\((\d+)\)/
        // (45)
    var _quotations = /\((\".*?\")\)/
        // ("Imperial Colonies of The US")
    var _quotations_45 = /\((\".*?\"\s\d+)\)/
        // ("Imperial Colonies of The US" 45)
    var author = /\((\w+)\)/
        // (Johnson)
    var author_45 = /\((\w+\s\d+)\)/
        // (Johnson 45)
    var author_and_author_45 = /\((\w+\s\and\s\w+\s\d+)\)/
        // (Johnson and Peterson 45)
    var author_et_al = /\((\w+\s\et\s\al\.)\)/
        // (Johnson et al.)
    var author_et_al_45 = /\((\w+\s\et\s\al\.\s\d+)\)/
        // (Johnson et al. 45)
    
    var correctCheck = [_45,
        _quotations,
        _quotations_45,
        author,
        author_45,
        author_and_author_45,
        author_et_al,
        author_et_al_45,
    ]

    for (var r = 0; r < correctCheck.length; r++) {
        if (correctCheck[r].test(citation)) { return true; }
    }
    
    return false

}


export default checkMLA;





