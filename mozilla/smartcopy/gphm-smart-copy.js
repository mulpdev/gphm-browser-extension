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

function copyToClipboard2(text, html) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();

        modified = ''

        // get scouting data
        srdiv = document.getElementById('scoutingReports');
        //console.log(srdiv);
        mc_all = srdiv.querySelectorAll('.modal-content');
        //console.log(mc_all);
        mc = mc_all[0]
        h3 = mc.querySelector('h3');
        modified += h3.textContent.substring(19) + ', ';
        
        mc = mc_all[1]
        //console.log(mc);
        src = mc.querySelector('.scouting-report-container')
        //console.log('src: ' + src.textContent);
        notesdiv = src.querySelector('.scouting-report-container__notes');
        //console.log('notesdiv: ' + notesdiv.textContent);
        
        row = mc.querySelector('.row');
        //console.log(row);
        col_all = row.querySelectorAll('.column')
        //console.log(col_all);
        left = col_all[0];
        //console.log(left);
        dli_all = left.querySelectorAll('.data-list__item')
        //console.log(dli_all);
        for (i = 0; i < dli_all.length; i++)
        {
            dli = dli_all[i]
            //console.log(dli);
            // 0-3
            if (i < 4) {
                
                em = dli.querySelector('em')
                //console.log(em);
                sibling = em.nextSibling;
                modified += sibling.textContent.trim() + ', ';
            }
            else {
                // 4-7
                tmpstr = ''
                em = dli.querySelector('em')
                //console.log(em);
                sibling = em.nextSibling;
                tmpstr += sibling.textContent.trim() + '|';
                progress = dli.querySelector('.progress')
                
                color = pullGPHMColorFromClassName(progress);
                if (color !== null) {
                    tmpstr += color + '|';
                }
                span = progress.querySelector('span')
                tmpstr += span.style.width.trim() + ', ';
                modified += tmpstr;
            }
        }
        
        right = col_all[1];
        advice_lists_all = right.querySelectorAll('.advice-list');
        console.log(advice_lists_all);
        
        for (i = 0; i < advice_lists_all.length; i++)
        {
            liked = advice_lists_all[0];
            likedstr = ''
            li_all = liked.querySelectorAll('li')
            for (j = 0; j < li_all.length; j++)
            {
                li = li_all[j];
                name = li.textContent;
                name = name.substring(0, name.length-3)
                modified += name + ", "
                
                //a = li.querySelector('a')
                //rel = a.rel;
                //modified += "&" + rel + ", "
            }
        }
        
        modified = modified.replaceAll(",", "\t");
        console.log(modified);
        
        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain",  modified);
    }
    document.addEventListener("copy", oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
}

function pullGPHMColorFromClassName(ele) {
    findme = ['success', 'ok', 'alert', 'warning'];
    ret = 'ok';
    cn_arr = ele.className.split(' ');
    for (cn of cn_arr) {
        if (findme.includes(cn)) { ret = cn; break; }
    }
    return ret;
}

