

// This function must be called in a visible page, such as a browserAction popup
// or a content script. Calling it in a background page has no effect!
function copyPopupDraft(text, html) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();

        //var copied = event.clipboardData.getData("text/plain");
        const selection = document.getSelection();
        //const selRange = selection.getRangeAt(0);
        var copied = selection.toString()
        lines = copied.split('\n');
        var modified = strPopupDraft(lines);
        //var modified = parseValuesOnly(lines);
        
        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain",  modified);
    }
    document.addEventListener("copy", oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
}



function strPopupDraft(lines) {
    fakemap = parsePopupAll(lines)
    // CurrDraft
    ret  = fakemap.Name + SEP + fakemap.Position + SEP + fakemap.Age + SEP + fakemap.Height + SEP + fakemap.Weight + SEP + fakemap.Hand + SEP + fakemap.Overall + SEP
    ret += fakemap.Skating + SEP + fakemap.Passing + SEP + fakemap.Puckhandling + SEP + fakemap.Shooting + SEP + fakemap.Defense + SEP + fakemap.Physical + SEP + fakemap.Spirit + SEP + fakemap.Endurance + SEP + fakemap.Faceoffs + SEP
    ret += fakemap.Ego + SEP + fakemap.Dirty + SEP + fakemap.Leadership + SEP + fakemap.BigGames + SEP + fakemap.Ambition + SEP + fakemap.Greed + SEP
    ret += fakemap.Stats + SEP
    console.log(ret);
    return ret
};

function copyPopupAll(text, html) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();

        const selection = document.getSelection();
        var copied = selection.toString()
        lines = copied.split('\n');
        var modified = strPopupAll(lines);

        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain",  modified);
    }
    document.addEventListener("copy", oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
}

function strPopupAll(lines) {
    fakemap = parsePopupAll(lines)
    // DB
    ret  = fakemap.Name + SEP + fakemap.Age + SEP + fakemap.Height + SEP + fakemap.Weight + SEP + fakemap.Hand + SEP + fakemap.Nationality + SEP + fakemap.Overall + SEP;
    ret += SEP.repeat(6)
    ret += fakemap.Skating + SEP + fakemap.Passing + SEP + fakemap.Puckhandling + SEP + fakemap.Shooting + SEP + fakemap.Defense + SEP + fakemap.Physical + SEP + fakemap.Spirit + SEP + fakemap.Endurance + SEP + fakemap.Faceoffs + SEP
    ret += SEP.repeat(12)
    ret += fakemap.Role + SEP + fakemap.Ego + SEP + fakemap.Dirty + SEP + fakemap.Leadership + SEP + fakemap.BigGames + SEP + fakemap.Ambition + SEP + fakemap.Greed + SEP
    console.log(ret);
    return ret
}

let TRAITS = [ "Arrogant", "Cocky", "Responsible", "Friendly", "Compassionate", "Agitator", "Tough", "Respectful", "Gentle", "Anonymous", "Modest", "Respected", "Role model", "True Leader", "Egocentric", "Childish", "Impressive", "Motivator", "Commander", "Nervous", "Anxious", "Stable", "Determined", "Heroic", "Lazy", "Half-hearted", "Half hearted", "Enthusiastic", "Purposeful", "Ambitious", "Easy-going", "Easy", "Eager", "Reasonable", "Hard to please", "Greedy", "Humble", "Compliant", "Reasonable", "Hard to please" ]
let POS = ['Forward', 'Defender', 'Center']
let SEP = '\t';

function parsePopupAll(lines) {
    console.log(lines);
    fakemap = {
    'Name': '\t', 
    'Nationality': '\t', 
    'Role': '\t', 
    'Position': '\t', 
    'Age': '\t', 
    'Height': '\t', 
    'Weight': '\t', 
    'Hand': '\t', 
    'Overall': '\t', 
    'Skating': '\t', 
    'Passing': '\t', 
    'Puckhandling': '\t', 
    'Shooting': '\t', 
    'Defense': '\t', 
    'Physical': '\t', 
    'Spirit': '\t', 
    'Endurance': '\t', 
    'Faceoffs': '\t',  
    'Ego': '\t', 
    'Dirty': '\t', 
    'Leadership': '\t', 
    'BigGames': '\t', 
    'Ambition': '\t', 
    'Greed': '\t',
    'Stats': '\t'
    }

    var ovrIdx = lines.indexOf('Overall')
    try {
        idx = 8 - ovrIdx
        
        if (idx == 0) {
        // name, nationality
        names = lines[0].split(' ');
        fakemap.Name = names[0] + ' ' + names[1];
        console.log(names);
        if (names.length > 4) {fakemap.Name += ' ' + names[2]} 
        fakemap.Nationality = names[names.length-1]
        
        // role
        fakemap.Role = lines[2].trim()

        // position, age, height, weight
        lines[5] = lines[5].replace('·', '');
        lines[5] = lines[5].replace('·', '');
        tmp = lines[5].replace('·', '').split(' ');
        fakemap.Position = tmp[0].trim()
        fakemap.Age = tmp[2].trim() + tmp[3].trim()
        fakemap.Height = tmp[5].trim() 
        fakemap.Weight = tmp[7].trim() + tmp[8].trim()
        fakemap.Hand = tmp[10].trim()
        }

        fakemap.Overall = lines[9-idx].trim()
        fakemap.Skating = lines[11-idx].trim()
        fakemap.Passing = lines[13-idx].trim()
        fakemap.Puckhandling = lines[15-idx].trim()
        fakemap.Shooting = lines[17-idx].trim()
        fakemap.Defense = lines[19-idx].trim()
        fakemap.Physical = lines[21-idx].trim()
        fakemap.Spirit = lines[23-idx].trim()
        fakemap.Endurance = lines[25-idx].trim()
        fakemap.Faceoffs = lines[27-idx].trim()

        let i=0;
        traits = []
        traitsIdx = 26 - idx;
        for (i = 0; i < 6; i++) {
            if ((traitsIdx + i) < lines.length) {
                let e = lines[32+i-idx].trim();
                for (T of TRAITS) {
                    if (e.toLowerCase().startsWith(T.toLowerCase())) {
                        //traits.push(T);
                        //break;
                        if (i === 0) {fakemap.Ego = T }
                        else if (i === 1) {fakemap.Dirty = T }
                        else if (i === 2) {fakemap.Leadership = T }
                        else if (i === 3) {fakemap.BigGames = T }
                        else if (i === 4) {fakemap.Ambition = T }
                        else if (i === 5) {fakemap.Greed = T }
                    }
                }
            }
        }

        league = lines[40-idx].split(',').slice(0, 1)
        seasonstats = lines[43-idx].split('\t');
        console.log(seasonstats)
        fakemap.Stats = seasonstats[1].trim() + 'G/' + seasonstats[2].trim() + 'A/' + seasonstats[3].trim() + "P " + league 
    }
    catch (TypeError) {}

    console.log(fakemap)
    return fakemap
};
function parseValuesOnly(elements) {
    ret = "";
    let i = -1;
    for (e of elements) {
        i += 1;

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
            liked = advice_lists_all[i];
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

