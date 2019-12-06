/* eslint-disable no-useless-escape */

function checkAPA(citation) {

    // APA citation checker
    // Returns true if format is correct
    var _2015 = /\((\d{4})\)/
        // (2015)
    var author_c_2015 = /\((\w+\,\s\d{4})\)/
        // (Johns & Brian, 2015)
    var author_8_author_c_2015 = /\((\w+\s\&\s\w+\,\s\d+)\)/
        // (Johns & Brian, 2015)
    var author_c_author_c_8_author_c_2015 = /\((\w+\,\s\w+\,\s\&\s\w+\,\s\d+)\)/
        // (Johns, Kelly, & Brian, 2015)
    var author_c_author_c_author_c_8_author_c_2015 = /\((\w+\,\s\w+\,\s\w+\,\s\&\s\w+\,\s\d+)\)/
        // (Johns, Kelly, Richards, & Brian, 2015)
    var author_c_author_c_author_c_author_c_8_author_c_2015 = /\((\w+\,\s\w+\,\s\w+\,\s\w+\,\s\&\s\w+\,\s\d+)\)/
        // (Johns, Kelly, Richards, Richards, & Brian, 2015)
    var author_c_2015_c_p_155 = /\((\w+\,\s\d+\,\s\p\.\s\d+)\)/
        // (Johns, 2015, p. 155)
    var author_8_author_c_2015_c_p_155 = /\((\w+\s\&\s\w+\,\s\d{4}\,\s\p\.\s\d+)\)/
        // (Johns & Kelly, 2015, p. 155)
    var author_c_author_c_8_author_c_2015_c_p_155 = /\((\w+\,\s\w+\,\s\&\s\w+\,\s\d{4}\,\s\p\.\s\d+)\)/
        // (Johns, Spencer, & Kelly, 2015, p. 155)
    var author_et_al_2015 = /\((\w+\s\et\s\al\.\,\s\d{4})\)/
        // (Johns et al., 2015)
    var author_et_al_2015_c_p_155 = /\((\w+\s\et\s\al\.\,\s\d{4}\,\s\p\.\s\d+)\)/
        // (Johns et al., 2015, p. 155)
    var p_155 = /\p\.\s\d+/
        // (p. 155)
    var quotations_2015 = /\((\".*?\"\,\s\d{4})\)/
        // ("Imperial States", 2015)
    var quotations_2015_c_p_155 = /\((\".*?\"\,\s\d{4}\,\s\p\.\s\d+)\)/
        // ("Imperial States", 2015)
    var quotations = /\((\".*?\")\)/
        // ("Imperial States")
    var title = /\((\.*?\,\s\d{4})\)/
        // (Some Title, 2015)

        
    var correctCheck = [
        _2015,
        author_c_2015,
        author_8_author_c_2015,
        author_c_author_c_8_author_c_2015,
        author_c_author_c_author_c_8_author_c_2015,
        author_c_author_c_author_c_author_c_8_author_c_2015,
        author_c_2015_c_p_155,
        author_8_author_c_2015_c_p_155,
        author_c_author_c_8_author_c_2015_c_p_155,
        author_et_al_2015,
        author_et_al_2015_c_p_155,
        quotations_2015,
        quotations_2015_c_p_155,
        quotations,
        p_155,
        title,
        
    ]
    for (var r = 0; r < correctCheck.length; r++) {
        if (correctCheck[r].test(citation)) {return true; }
    }
   
    return false
}

export default checkAPA;





