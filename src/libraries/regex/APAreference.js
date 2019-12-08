


export let APAtitle = /(?<=\(\d{4}\)\. )(?:[A-Z][^\.\s]*\s?|\b(?:and|of|among|in|for|a|the|from|is|or) )+(?=\.(?: |\n))/g
export let APAjournal = /Journal[^A-Z]+?(?=\, )/g
