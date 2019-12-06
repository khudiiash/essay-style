let replace = [
    { '(?<!the United States of )America':'the US'},
    { 'appear to be' : 'are'},
    { 'appears to be' : 'is'},
    { 'appeared to be' : 'was'},
    { 'abundance' : 'enough or plenty' },
    { 'accede to' : 'agree' }, { 'accedes to' : 'agrees' }, { 'acceded to' : 'agreed' }, { 'acceding to' : 'agreeing' },
    { 'advantageous' : 'helpful' },
    { 'ameliorates' : 'improves' }, { 'ameliorated' : 'improved' }, { 'ameliorating' : 'improving' },{ 'ameliorate' : 'improve' }, 
    { 'cognizant' : 'aware' },
    { 'commensurate' : 'equal' },
    { 'consolidates' : 'combines' }, { 'consolidated' : 'combined' }, { 'consolidating' : 'combining' },{ 'consolidate' : 'combine' }, 
    { 'deleterious' : 'harmful' },
    { 'disseminates' : 'issue or send' }, { 'disseminated' : 'issue or send' }, { 'disseminating' : 'issue or send' },{ 'disseminate' : 'issue or send' }, 
    { 'endeavors' : 'efforts' },
    { 'erroneous' : 'incorrect' },
    { 'expeditious' : 'fast' },
    { 'inception' : 'start' },
    { 'leverages' : 'uses' }, { 'leveraged' : 'used' }, { 'leveraging' : 'using' },{ 'leverage' : 'use' }, 
    { 'proficiency' : 'skill' }, { 'proficiencies' : 'skills' },
    { 'promulgates' : 'issues or publishes' }, { 'promulgated' : 'issued or published' }, { 'promulgating' : 'issuing or publishing' },{ 'promulgate' : 'issue or publish' }, 
    { 'proximity' : 'near' },
    { 'subsequently' : 'after or later' },
    { 'utilize' : 'use' }, 
    { 'utilizes' : 'uses' }, 
    { 'utilized' : 'used' }, 
    { 'utilizing' : 'using' },
    { 'abundance' : 'enough, plenty, a lot' },
    { 'accentuate' : 'stress' },
    { 'accommodation' : 'home' },
    { 'accompanying' : 'with' },
    { 'accomplish' : 'finish' }, 
    { 'according to records' : 'records show' },
    { 'according to studies' : 'studies proves that' },
    { 'accordingly' : 'in line with this, so' },
    { 'acquiesce' : 'agree' },
    { 'adjacent' : 'next to' },
    { 'adjustment' : 'change, alteration' },
    { 'admissible' : 'allowed, acceptable' },
    { 'advantageous' : 'useful, helpful' },
    { 'affix' : 'add, write, fasten, stick on, fix to' },
    { 'afford an opportunity' : 'let, allow' },
    { 'aforesaid' : 'this, earlier in this document' },
    { 'aggregate' : 'total' },
    { 'aligned' : 'lined up, in line' },
    { 'alleviate' : 'ease, reduce' },
    { 'allocate' : 'divide, share, give' },
    { 'alternatively' : 'or, on the other hand' },
    { 'amendment' : 'change' },
    { 'amongst' : 'among' },
    { 'anticipates' : 'expects' },{ 'anticipated' : 'expected' },{ 'anticipating' : 'expecting' },{ 'anticipate' : 'expect' },
    { 'apparent' : 'clear, plain, obvious' },
    { 'appreciable' : 'large' },
    { 'apprise' : 'inform, tell' },
    { 'appropriate' : 'proper, right, suitable' },
    { 'appropriate to' : 'suitable for' },
    { 'approximately' : 'roughly' },
    { 'as a consequence of' : 'because' },
    { 'as of the date of' : 'from' },
    { 'as regards' : 'on the subject of' },
    { 'ascertain' : 'establish' },
    { 'assemble' : 'build, gather' },
    { 'assistance' : 'help' },
    { 'at an early date' : 'soon (or say when)' },
    { 'at its discretion' : 'can, may' },
    { 'at the moment' : 'now, when' },
    { 'at the present time' : 'now' },
    { 'attributable to' : 'because of' },
    { 'authorize' : 'allow, let' },
    { 'authority': 'right, power' },
    { 'axiomatic' : 'obvious' },
    { 'become a witness of' : 'witness'},
    { 'becomes a witness of' : 'witnesses'},
    { 'becoming a witness of' : 'witnessing'},
    { 'became a witness of' : 'witnessed'},
    { 'belated' : 'late' },
    { 'bestow' : 'give, award' },
    { 'breach' : 'break' },
    { 'breaches' : 'breaks' },
    { 'breached' : 'broke' },
    { 'by means of' : 'by' },
    { 'bring about' : 'cause'}, { 'brings about' : 'causes'}, { 'brought about' : 'caused'}, { 'bringing about' : 'causing'},
    { 'By and large,' : 'In general' },
    { 'are able to' : 'can'}, { 'were able to' : 'might' }, { 'was able to' : 'could'},{ 'is able to' : 'can'},
    { 'can be able to' : 'can'}, { 'might be able to' : 'might' }, { 'could be able to' : 'could'},
    { 'ceases' : 'finishes, stops, ends' },{ 'ceased' : 'finished, stopped, ended' },{ 'ceasing' : 'finishing, stopping, ending' },{ 'cease' : 'finish, stop, end' },
    { 'circumvent' : 'avoid, skirt, circle' },
    { 'clarification' : 'explanation, help' },
    { 'combines' : 'mixes' },{ 'combined' : 'mixed' },{ 'combining' : 'mixing' },{ 'combine' : 'mix' },
    { 'combined' : 'together' },
    { 'commences' : 'starts, begins' },{ 'commenced' : 'started, began' },{ 'commencing' : 'starting, beginning' },{ 'commence' : 'start, begin' },
    { 'compile' : 'collect' },
    { 'complies with' : 'meets' },{ 'complied with' : 'met' },{ 'complying with' : 'meeting' },{ 'comply with' : 'meet' },
    { 'component' : 'element' },
    { 'comprises' : 'includes' },
    { 'conceal' : 'hide' },
    { 'concur' : 'agree' },
    { 'constitutes' : 'forms' },
    { 'construe' : 'interpret' },
    { 'consult' : 'talk to, meet, ask' },
    { 'contemplate' : 'think' },
    { 'contrary to' : 'against, despite' },
    { 'costs the sum of' : 'costs' },
    { 'courteous' : 'polite' },
    { 'cumulative' : 'added together' },
    { 'customary' : 'usual, normal' },
    { 'deem to be' : 'treat as' },
    { 'defer' : 'put off, delay' },
    { 'deficiency' : 'lack of' },
    { 'delete' : 'cross out' }, 
    
    { 'deal with' : 'handle, manage'},
    { 'deals with' : 'handles, manages'},
    { 'dealt with' : 'handled, managed'},
    { 'dealing with' : 'handling, managing'},

    { 'despite the fact that' : 'though, although' }, 
    { 'detrimental' : 'harmful, damaging' }, 
    { 'diminish' : 'lessen, reduce' }, 
    { 'disburse' : 'pay, pay out' }, 
    { 'discontinue' : 'stop, end' },
    { 'discrete' : 'separate' }, 
    { 'disseminate' : 'spread' }, 
    { 'documentation' : 'papers, documents' }, 
    { 'domiciled in' : 'living in' }, 
    { 'drawbacks' : 'weaknesses'}, { 'drawback' : 'weakness'},
    { 'due to the fact that' : 'because, as' },
    { 'due to' : 'because of, in result of'},
    { 'during which time' : 'while' }, 
    { 'dwelling' : 'home' }, 
    { 'eligible' : 'allowed, qualified' }, 
    { 'elucidate' : 'explain, clarify' }, 
    { 'empower' : 'allow, let' },
    { 'enables' : 'allows' },{ 'enabled' : 'allowed' },{ 'enabling' : 'allowing' },{ 'enable' : 'allow' },
    { 'enclosed' : 'inside, with' }, 
    { 'encounter' : 'meet' }, 
    { 'enquire' : 'ask' }, 
    { 'enquiry' : 'question' }, 
    { 'entitlement' : 'right' }, 
    { 'envisage' : 'expect, imagine' }, 
    { 'equivalent' : 'equal, the same' }, 
    { 'evaluates' : 'tests, checks' }, { 'evaluated' : 'tested, checked' }, { 'evaluating' : 'testing, checking' }, { 'evaluate' : 'test, check' }, 
    { 'evince' : 'prove' }, 
    { 'ex officio' : 'because of his or her position' }, 
    { 'excluding' : 'apart from, except' }, 
    { 'exclusively' : 'only' }, 
    { 'exempt from' : 'free from' }, 
    { 'expedite' : 'accelerate' }, 
    { 'expeditiously' : 'as soon as possible, quickly' }, 
    { 'expenditure' : 'spending' }, 
    { 'extremity' : 'limit' },
    { 'finalizes' : 'ends, finishes' }, 
    { 'finalized' : 'ended, finished' }, 
    { 'finalizing' : 'ending, finishing' }, 
    { 'finalize' : 'end, finish' }, 
    { 'first and foremost' : 'first'},
    { 'for the duration of' : 'during, while' }, 
    { 'for the purpose of' : 'to, for' }, 
    { 'for the sake of' : 'for'},
    { 'formulate' : 'plan, devise' }, 
    { 'forthwith' : 'now, at once' }, 
    { 'frequently' : 'often' }, 
    { 'further to' : 'after, following' },
    { 'generate' : 'produce' },
    { 'go back' : 'return'},
    { 'goes back' : 'returns'},
    { 'going back' : 'returning'},
    { 'give consideration to' : 'consider' }, 
    { 'great': 'considerable,prominent,excellent'},
    { 'greatly': 'considerably,positively,excellently'},
    { 'henceforth' : 'from now on, from today' }, 
    { 'he/she' : 'he or she'},
    { 'his/her' : 'his or her'},
    { 'him/her' : 'him or her'},
    { 'his/her' : 'his or her'},
    { 'hereby' : 'now, by this (or edit out)' }, 
    { 'herein' : 'here (or edit out)' }, 
    { 'hereinafter' : 'after this (or edit out)' }, 
    { 'hereof' : 'of this' },
    { 'hereto' : 'to this' }, 
    { 'heretofore' : 'until now, previously' }, 
    { 'hereunder' : 'below' }, 
    { 'herewith' : 'with this (or edit out)' }, 
    { 'hitherto' : 'until now' }, 
    { 'hold in abeyance' : 'wait, postpone' }, 
    { 'hope and trust' : 'hope, trust (but not both)' }, 
    { 'if when' : 'if, when (but not both)' }, 
    { 'immediately' : 'at once, now' }, 
    { 'implies' : 'suggests' },{ 'implied' : 'suggested' },{ 'implying' : 'suggesting' },{ 'imply' : 'suggest' },
    { 'important' : 'significant, essential, crucial'},
    { 'in accordance with' : 'in line with' },
    { 'in a bid' : 'in attempt'},
    { 'in conjunction with' : 'and, with' }, 
    { 'in connection with' : 'for' }, 
    { 'in consequence' : 'because, as a result' }, 
    { 'in excess of' : 'more than' }, 
    { 'in lieu of' : 'instead of' }, 
    { 'In the end' : 'Finally'},
    { 'in a nutshell' : 'to summarize'},
    { 'I think' : 'In my opinion'},
    { 'cheap' : 'inexpensive'},
    { 'smart' : 'intelligent'},
    { 'in order that' : 'so that' }, 
    { 'in order to' : 'to'},
    { 'in receipt of' : 'get, have, receive' }, 
    { 'in the absence of' : 'without' }, 
    { 'in the course of' : 'while, during' },
    { 'in the event(\\s\\bthat\\b)?' : 'if'},
    { 'in the process of' : 'in'},
    { 'in the majority of instances' : 'most, mostly' },
    { 'majority of' : 'most'},
    { 'in the near future' : 'soon' }, 
    { 'in the neighborhood of' : 'around' }, 
    { 'in view of the fact that' : 'as, because' }, 
    { 'inappropriate' : 'unsuitable' }, 
    { 'inception' : 'start, beginning' }, 
    { 'incorporating' : 'that includes' }, 
    { 'incur' : 'have to pay, owe' }, 
    { 'initiate' : 'begin, start' }, 
    { 'instances' : 'cases' }, 
    { 'intend to' : 'will' }, 
    { 'irrespective of' : 'despite, even if' }, 
    { 'jeopardize' : 'risk, threaten' }, 
    { 'large number of' : 'many, most (or say how many)' },
    { 'lets' : 'permits'},
    { 'letting' : 'permitting'},
    { 'let' : 'permit'},
    { 'literally' : 'edit out'},
    { 'Looking at' : 'Considering'},
    { 'locality' : 'place, area' }, 
    { 'locate' : 'find, put' },
    { 'make it easier' : 'facilitate'},
    { 'makes it easier' : 'facilitate'},
    { 'made it easier' : 'facilitated'},
    { 'making it easier' : 'facilitating'},

    { 'make it easy' : 'facilitate'},
    { 'makes it easy' : 'facilitate'},
    { 'made it easy' : 'facilitated'},
    { 'making it easy' : 'facilitating'},

    { 'make use of' : 'benefit from' },
    { 'makes use of' : 'benefits from' },
    { 'made use of' : 'benefited from' },
    { 'making use of' : 'benefitting from' },

    { 'make a difference':'differentiate, distinguish'},
    { 'makes a difference':'differentiates, distinguishes'},
    { 'made a difference':'differentiated, distinguished'},
    { 'making a difference':'differentiating, distinguishing'},
   
    { 'make it clear' : 'clarify'},
    { 'makes it clear' : 'clarifies'},
    { 'making it clear' : 'clarifying'},
    { 'made it clear' : 'clarified'},
   
    { 'make sure' : 'ensure'},
    { 'makes sure' : 'ensures'},
    { 'making sure' : 'ensuring'},
    { 'made sure' : 'ensured'},
    { 'magnitude' : 'size' }, 
    { 'making sure' : 'ensuring'}, { 'makes sure' : 'ensures'},{ 'made sure' : 'ensured'},{ 'making sure' : 'ensuring'},   
    { 'marginal' : 'small, slight' }, 
    { 'materialize' : 'happen, occur' }, 
    { 'may in the future' : 'may, might, could' }, 
    { 'mislay' : 'lose' },
    { 'Most of the' : 'Most'},
    { 'notwithstanding' : 'even if, despite, still, yet' },
    { 'occasioned by' : 'caused by, because of' }, 
    { 'on a regular basis':'regularly'},
    { 'on behalf of' : 'for' }, 
    { 'on numerous occasions' : 'often' }, 
    { 'on the grounds that' : 'because' }, 
    { 'on the occasion that' : 'when, if' }, 
    { 'operate' : 'work, run' }, 
    { 'optimum' : 'best, ideal' }, 
    { 'option' : 'choice' }, 
    { 'ordinarily' : 'normally, usually' }, 
    { 'owing to' : 'because of' }, 
    { 'partially' : 'partly' }, 
    { 'particulars' : 'details, facts' }, 
    { 'per annum' : 'a year' }, 
    { 'permissible' : 'allowed' }, 
    { 'permit' : 'let, allow' },
    { 'persons' : 'people' },
    { 'person being interviewed' : 'interviewee'},
    { 'peruse' : 'read, read carefully' }, 
    { 'possess' : 'have, own' }, 
    { 'possessions' : 'belongings' }, 
    { 'practically' : 'almost, nearly' }, 
    { 'predominant' : 'main' }, 
    { 'prescribe' : 'set, fix' }, 
    { 'preserve' : 'keep, protect' }, 
    { 'principal' : 'main' }, { 'prior to' : 'before' }, 
    { 'procure' : 'obtain, arrange' }, 
    { 'profusion of' : 'plenty, too many (or say how many)' },
    { 'prohibits' : 'bans, stops' },{ 'prohibited' : 'banned, stopped' },{ 'prohibiting' : 'banning, stopping' },{ 'prohibit' : 'ban, stop' }, 
    { 'projected' : 'estimated' }, 
    { 'prolonged' : 'long' }, 
    { 'promptly' : 'quickly, at once' }, 
    { 'promulgate' : 'advertise, announce' }, 
    { 'proportion' : 'part' }, 
    { 'provided that' : 'if, as long as' }, 
    { 'provisions' : 'rules, terms' },
    { 'proximity' : 'closeness, nearness' }, 
    { 'pursuant to' : 'under, because of, in line with' }, 
    { 'referred to as' : 'called' },
    { 'reimburse' : 'repay, pay back' }, 
    { 'reiterate' : 'repeat, restate' }, 
    { 'remainder' : 'the rest, what is left' }, 
    { 'remittance' : 'payment' }, 
    { 'remuneration' : 'pay, wages, salary' }, 
    { 'request' : 'ask, question' }, 
    { 'restriction' : 'limit' }, 
    {'sometimes':'occasionally'},
    { 'say' : 'state'},
    { 'saying' : 'stating'},
    { 'says' : 'states'},
    { 'said' : 'stated'},
    { 'scrutinize' : 'study, research' },
    { 'slowly' : 'gradually'},
    { 'solely' : 'only' },
    { 'some of the' : 'some'},
    { 'so as to' : 'to'},
    { 'seems' : 'appears'},
    { 'seemed' : 'appeared'},
    { 'seemingly' : 'apparently'},
    { 'seeming' : 'appearing'},
    { 'seem' : 'appear'},
    { 'specified' : 'given, written, set' },  
    { 'statutory' : 'legal, by law' }, 
    { 'subject to' : 'depending on, under, keeping to' }, 
    { 'submit' : 'send, give' },
    { 'starts' : 'begins, commences'},
    { 'started' : 'began, commenced'},
    { 'starting' : 'beginning, commencing'},
    { 'start' : 'begin, commence'},
    { 'subsequently' : 'later' }, 
    { 'substantially' : 'more or less' }, 
    { 'supplementary' : 'extra, more' }, 
    { 'take place' : 'occur'},
    { 'took place' : 'occurred'},
    { 'takes place' : 'occurs'},
    { 'taking place' : 'occurring'},
    { 'talk about' : 'discuss'},
    { 'talks about' : 'discusses'},
    { 'talking about' : 'discussing'},
    { 'told about' : 'discussed'},
    { 'terminate' : 'stop, end' }, 
    { 'that being the case' : 'if so' },
    { 'the question as to whether' : 'whether' }, 
    { 'thereafter' : 'then, afterwards' }, 
    { 'thereby' : 'by that, because of that' }, 
    { 'therein' : 'in that, there' }, 
    { 'thereof' : 'of that' }, 
    { 'thereto' : 'to that' },
    { 'tertiary institutions' : 'higher education institutions'},
    { 'tertiary institution' : 'higher education institution'},
    { 'to date' : 'so far, up to now' }, 
    { 'to the extent that' : 'if, when' }, 
    { 'transfer' : 'change, move' },
    { 'transmit' : 'send' }, 
    { 'try' : 'attempt'},
    { 'tries' : 'attempts'},
    { 'tried' : 'attempted'},
    { 'trying' : 'attempting'},
    { 'ultimately' : 'in the end, finally' }, 
    { 'unavailability' : 'lack of' }, 
    { 'undertake' : 'agree, promise, do' }, 
    { 'uniform' : 'same, similar' }, 
    { 'unilateral' : 'one-sided, one-way' }, 
    { 'unoccupied' : 'empty' }, 
    { 'until such time' : 'until' }, 
    { 'variation' : 'change' }, 
    { 'virtually' : 'edit out' }, 
    { 'visualize' : 'see, predict' }, 
    { 'ways and means' : 'ways' },
    { 'whatsoever' : 'whatever, what, any' },
    { 'whensoever' : 'when' }, 
    { 'whereas' : 'but' }, 
    { 'will be able to' : 'could'},
    { 'whether or not' : 'whether' }, 
    { 'with a view to' : 'to, so that' }, 
    { 'with effect from' : 'from' }, 
    { 'with reference to' : 'regarding' }, 
    { 'with regard to' : 'regarding' },
    { 'with the aim of' : 'to'}, 
    { 'with the minimum of delay' : 'quickly'},

    // Short Forms
    { 'don’t' : 'do not' },
    { 'doesn’t' : 'does not' },
    { 'didn’t' : 'did not' },
    { 'aren’t' : 'are not' },
    { 'it’s' : 'it is' },
    { 'that’s' : 'that is' },
    { 'isn’t' : 'is not' },
    { 'won’t' : 'will not' },
    { 'couldn’t' : 'could not' },
    { 'could’ve' : 'could have' },
    { 'shouldn’t' : 'should not' },
    { 'should’ve' : 'should have' },
    { 'wouldn’t' : 'would not' },
    { 'would’ve' : 'would have' },
    { 'can’t' : 'cannot' },
    { 'aren’t' : 'are not' },
    { 'wasn’t' : 'was not' },
    { 'weren’t' : 'were not' },
    { 'hasn’t' : 'has not' },
    { 'hadn’t' : 'had not' },
    { 'there’s' : 'there is'},
    { 'here’s' : 'here is' },
    { 'he’s' : 'he is' },
    { 'he’ll' : 'he will' },
    { 'he’d' : 'he would' },
    { 'she’s' : 'she is' },
    { 'she’ll' : 'she will' },
    { 'she’d' : 'she would' },
    { 'they’ll' : 'they will' },
    { 'they’d' : 'they would' },
    { 'they’re' : 'they are' },
    { 'i’m' : 'I am' },
    { 'i’ve' : 'I have' },
    { 'i’ll' : 'I will' },
    { 'i’d' : 'I would' },
    { 'wanna' : 'want to' },
    { 'gonna' : 'going to' },
    { 'gotto' : 'have to' },
    { "don't" : "do not" },
    { "doesn't" : "does not" },
    { "didn't" : "did not" },
    { "aren't" : "are not" },
    { "it's" : "it is" },
    { "that's" : "that is" },
    { "isn't" : "is not" },
    { "won't" : "will not" },
    { "couldn't" : "could not" },
    { "could've" : "could have" },
    { "shouldn't" : "should not" },
    { "should've" : "should have" },
    { "wouldn't" : "would not" },
    { "would've" : "would have" },
    { "can't" : "cannot" },
    { "aren't" : "are not" },
    { "wasn't" : "was not" },
    { "weren't" : "were not" },
    { "hasn't" : "has not" },
    { "hadn't" : "had not" },
    { "there's" : "there is"},
    { "here's" : "here is" },
    { "won't" : "will not" },
    { "he's" : "he is" },
    { "he'll" : "he will" },
    { "he'd" : "he would" },
    { "she's" : "she is" },
    { "she'll" : "she will" },
    { "she'd" : "she would" },
    { "they'll" : "they will" },
    { "they'd" : "they would" },
    { "they're" : "they are" },
    { "i'm" : "I am" },
    { "i'll" : "I will" },
    { "i've" : "I have" },
    { "i'd" : "I would" },

    // British

    { 'behaviourism' : 'behaviorism'}, 
    { 'behaviourist' : 'behaviorist'}, 
    { 'behavioural' : 'behavioral'},
    { 'learnt' : 'learned' },

    // Phrasal verbs

    {'break up': 'separate'},
    {'breaks up': 'separates'},
    {'broke up':'separated'},
    {'breaking up':'separating'},

    {'back up': 'support'},
    {'backs up': 'supports'},
    {'backed up': 'supported'},
    {'backing up': 'supported'},

    {'come from':'originate from,have its source in'},
    {'comes from':'originates from,has its source in'},
    {'came from':'originated from,had its source in'},
    {'coming from':'originating from,having its source in'},

    {'look after': 'take care of'},
    {'looks after': 'takes care of'},
    {'looked after': 'took care of'},
    {'looking after': 'takeing care of'},
    
    {'carry on': 'continue'},
    {'carries on': 'continues'},
    {'carried on': 'continued'},
    {'carrying on': 'continuing'},

    {'call off': 'cancel'}, 
    {'calls off': 'cancels'}, 
    {'called off': 'canceled'},
    {'calling off': 'canceling'}, 
 
    {'go over': 'discuss'},
    {'goes over': 'discusses'},
    {'went over': 'discussed'},
    {'going over': 'discussing'},

    {'give in': 'surrender'},
    {'gives in': 'surrenders'},
    {'gave in': 'surrendered'},
    {'giving in': 'surrendering'},

    {'pick up': 'lift, raise'},
    {'picks up': 'lifts, raises'},
    {'picked up': 'lift, raised'},
    {'picking up': 'lifting, raising'},
    
    {'turn down': 'refuse'},
    {'turns down': 'refuses'},
    {'turned down': 'refused'},
    {'turning down': 'refusing'},

    {'turn up': 'appear'},
    {'turns up': 'appears'},
    {'turned up': 'appeared'},
    {'turning up': 'appearing'},

    {'count on': 'rely on'},
    {'counts on': 'relies on'},
    {'counted on': 'relied on'},
    {'counting on': 'relying on'},

    {'put on': 'switch on'},
    {'puts on': 'switches on'},
    {'putting on': 'switching on'},

    
    {'get together': 'meet, gather'},
    {'gets together': 'meets, gathers'},
    {'got together': 'met, gathered'},
    {'getting together': 'meeting, gathering'},

    {'come up against': 'encounter'},
    {'comes up against': 'encounters'},
    {'came up against': 'encountered'},
    {'coming up against': 'encountering'},

    {'put up with': 'tolerate, tolerated'},
    {'puts up with': 'tolerates'},
    {'put up with': 'tolerated'},
    {'putting up with': 'tolerating'},

    {'get away with': 'escape the consequences of'},
    {'gets away with': 'escapes the consequences of'},
    {'got away with': 'escaped the consequences of'},
    {'getting away with': 'escaping the consequences of'},

    {'get over': 'recover from'},
    {'gets over': 'recovers from'},
    {'got over': 'recovered from'},
    {'getting over': 'recovering from'},


    {'get on': 'succeed'},
    {'gets on': 'succeeds'},
    {'got on': 'succeeded'},
    {'getting on': 'succeeding'},

    {'get by': 'manage'},
    {'gets by': 'manages'},
    {'got by': 'managed'},
    {'getting by': 'managing'},
    
    {'get at': 'manage to react'},
    {'gets at': 'manages to react'},
    {'got at': 'managed to react'},
    {'getting at': 'managing to react'},

    {'make for': 'move towards'},
    {'makes for': 'moves towards'},
    {'making for': 'moving towards'},
    {'made for': 'moved towards'},

    {'turn down': 'refuse'},
    {'turns down': 'refuses'},
    {'turned down': 'refused'},
    {'turning down': 'refusing'},

    {'run out of': 'no longer have'},
    {'runs out of': 'no longer has'},
    {'ran out of': 'no longer had'},
    {'running out of': 'no longer having'},

    {'make up': 'invent'},
    {'makes up': 'invents'},
    {'made up': 'invented'},
    {'making up': 'inventing'},


    {'put up': 'raise, increase'},
    {'puts up': 'raises, increases'},
    {'putting up': 'raising, increasing'},





]

export default replace;