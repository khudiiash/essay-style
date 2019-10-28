export default function withoutReferences(text) {

    if (text.includes("References")) {
        text = text.split("References")[0];
    }
    else if (text.includes("Reference")) {
        text = text.split("Reference")[0];
    }
    else if (text.includes("REFERENCES")) {
        text = text.split("REFERENCES")[0];
    } 
    else if (text.includes("REFERENCE")) {
        text = text.split("REFERENCE")[0];
    }
    else if (text.includes("Work Cited")) {
        text = text.split("Work Cited")[0];
    }
    else if (text.includes("Works Cited")) {
        text = text.split("Works Cited")[0];
    }
    else if (text.includes("Work cited")) {
        text = text.split("Work cited")[0];
    }
    else if (text.includes("Works cited")) {
        text = text.split("Works cited")[0];
    }

    return text;
}