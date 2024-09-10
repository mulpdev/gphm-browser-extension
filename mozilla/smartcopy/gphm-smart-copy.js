// This function must be called in a visible page, such as a browserAction popup
// or a content script. Calling it in a background page has no effect!
function copyToClipboard(text, html) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();


        //var copied = event.clipboardData.getData("text/plain");
        const selection = document.getSelection();
        //const selRange = selection.getRangeAt(0);
        var copied = selection.toString()
        var modified = parseValuesOnly(copied)
        



        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain",  modified);
    }
    document.addEventListener("copy", oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
}

/*
 * Overall
    93
Reflexes
    96
Positioning
    96
PuckControl
    92
PuckHandling
    93
Athletic
    91
Endurance
    89
Spirit
89

Show only top ratings
All traits

    CompassionateI will help you
    AgitatorI´ll get under your skin
    ModestDoesn´t speak much
    AnxiousWhat if we lose?
    EnthusiasticLove for the game
    HumbleWon't ask for much
    */
let TRAITS = [ "Arrogant", "Cocky", "Responsible", "Friendly", "Compassionate", "Agitator", "Tough", "Respectful", "Gentle", "Anonymous", "Modest", "Respected", "Role model", "True Leader", "Egocentric", "Childish", "Impressive", "Motivator", "Commander", "Nervous", "Anxious", "Stable", "Determined", "Heroic", "Lazy", "Half-hearted", "Half hearted", "Enthusiastic", "Purposeful", "Ambitious", "Easy-going", "Easy", "Eager", "Reasonable", "Hard to please", "Greedy", "Humble", "Compliant", "Reasonable", "Hard to please" ]
function parseValuesOnly(copied) {
    SEP = '\t'
    ret = ""
    elements = copied.split('\n')
    for (e of elements) {
        e = e.trim()
        if (e == "") { continue; }

        var x = Number(e);
        if (isNaN(x)) {
            for (T of TRAITS) {
                if (e.toLowerCase().startsWith(T.toLowerCase())) {
                    ret += T + SEP;
                    console.log("TRAIT: " + T);
                    break;
                }
            }
        }
        else {
            ret += e + SEP;
            console.log("NUMBER: " + e);
        }
    }
    return ret.trim();
}

