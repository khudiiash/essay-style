

let verbs = 'been|born|beaten|become|begun|bet|blown|brocken|built|bought|brought|caught|chosen|cut|dealt|done|drawn|drunk|driven|eaten|fallen|felt|fought|found|flown|forgotten|forgiven|frozen|given|gone|grown|hung|heard|hidden|hit|held|hurt|kept|known|laid|left|lent|let|lain|lit|lost|made|meant|met|paid|put|read|ridden|rung|risen|run|said|seen|sought|sold|sent|set|shaken|shone|shot|shown|shut|sung|sunk|sat|slept|spoken|spent|stood|stolen|stuck|struck|sworn|swept|swum|swung|taken|taught|torn|told|thought|thrown|understood|woken|worn|won|written'
let aux = 'be|been|are|were|was|is|being'
let extra = 'his|her|their|my|our|its|a|the'

let pattern = `(?:\\b((?:${aux})\\s)(?:\\w+ly\\s|not\\s)?(\\b(?:\\w+ed|(?:${verbs}))\\b)((\\s\\w+ly)?\\s\\bby\\b(?!\\w+ing)(\\s(?:${extra})\\s\\w+)?)?|\\b(?!${aux})(\\w+ly\\s)?(\\b(?:\\w+ed|(?:${verbs}))\\b)((\\s\\w+ly)?\\s\\bby\\b(?!\\s\\w+ing)(\\s(?:${extra})\\s\\w+)?))`

export const passiveRXglobal = new RegExp(pattern,'g')
export const passiveRXinline = new RegExp(`^${pattern}$`,'g')



