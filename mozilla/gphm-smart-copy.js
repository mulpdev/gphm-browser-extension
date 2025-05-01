const BIO = ['Name', 'Number', 'Nationality', 'Role', 'Team', 'Position', 'Age', 'Height', 'Weight', 'Hand']
const RATINGS = ['Overall', 'Skating', 'Passing', 'PuckHandling', 'Shooting', 'Defence', 'Physical', 'Spirit', 'Endurance', 'Faceoffs'];
const TRAITS = ['Ego', 'Dirty', 'Leadership', 'BigGames', 'Ambition', 'Greed', 'Persona', 'Culture', 'Winner'];
const PROFILE = ['Persona', 'Culture', 'Winner']

/*
NOTE1: calls document.getElementsByClassName() so comma seperated string of each className

NOTE2: calls queryselector*(), so dot seperated string of classNames 

NOTE3: querySelector() only returns FIRST subelement, querySelectorAll() returns all
*/

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

function copyPopupDB(text, html) {
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
    UNK = '?' + SEP
    // DB
    ret  = fakemap.Name + SEP
    ret += fakemap.Age + SEP  
    ret += fakemap.Nationality + SEP
    ret += fakemap.Height + SEP  
    ret += fakemap.Weight + SEP  
    ret += fakemap.Hand + SEP  
    ret += fakemap.Role + SEP
    ret += fakemap.Overall  + SEP
    ret += UNK.repeat(6) // J - N
    ret += fakemap.Skating + SEP  
    ret += fakemap.Passing + SEP  
    ret += fakemap.Puckhandling  + SEP
    ret += fakemap.Shooting + SEP
    ret += fakemap.Defense + SEP  
    ret += fakemap.Physical + SEP  
    ret += fakemap.Spirit + SEP  
    ret += fakemap.Endurance + SEP  
    ret += fakemap.Faceoffs + SEP
    ret += UNK.repeat(12) // W - AI
    ret += fakemap.Ego + SEP 
    ret += fakemap.Dirty + SEP 
    ret += fakemap.Leadership + SEP 
    ret += fakemap.BigGames + SEP 
    ret += fakemap.Ambition + SEP 
    ret += fakemap.Greed + SEP
    ret += UNK // Personality
    ret += UNK // Culture
    ret += UNK // WI
    console.log(ret);
    return ret
}

//let TRAITS = [ "Arrogant", "Cocky", "Responsible", "Friendly", "Compassionate", "Agitator", "Tough", "Respectful", "Gentle", "Anonymous", "Modest", "Respected", "Role model", "True Leader", "Egocentric", "Childish", "Impressive", "Motivator", "Commander", "Nervous", "Anxious", "Stable", "Determined", "Heroic", "Lazy", "Half-hearted", "Half hearted", "Enthusiastic", "Purposeful", "Ambitious", "Easy-going", "Easy", "Eager", "Reasonable", "Hard to please", "Greedy", "Humble", "Compliant", "Reasonable", "Hard to please" ]
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
    console.log('copyToClipboard2()');
    function oncopy(event) {
        console.log('copyToClipboard2() in event');
        document.removeEventListener("copy", oncopy, true);
        console.log('removed event listener');
        // Hide the event from the page to prevent tampering.
        //event.stopImmediatePropagation(); // what is event??
        console.log('stopped propgation');
        

        modified = ''

        // get name
        notes = document.getElementsByClassName('panel scouting-report-container__notes');
        note = notes[0];
        paras = note.querySelectorAll('p');
        p = paras[1];
        t = p.textContent;
        spl = t.split(' is');
        name = spl[0];
        spl = name.split(' brings');
        name = spl[0]
        modified += name.trim() + ', ';

        
        
        
        // get scouting data
        srcontainers = document.getElementsByClassName('scouting-report-container');
        console.log(srcontainers);
        srcontainer = srcontainers[0];
        console.log(srcontainer);
        
        // columns
        cols = srcontainer.getElementsByClassName('column');
        console.log(cols)
        left = cols[0];
        console.log(left)
        right = cols[1];
        console.log(right)

        // left col
        ldivs = left.querySelectorAll('div');
        console.log('left stuff')
        console.log(ldivs)
        console.log(ldivs[0])
        //console.log(ldivs.slice(0,1))
        
        personality_type = ldivs[0]; // skip
        console.log("skip personality type");

        personality_spectrum = ldivs[1];
        console.log(personality_spectrum)
        dli_all = personality_spectrum.querySelectorAll('.data-list__item');
        console.log(dli_all);
        for (i = 0; i < dli_all.length; i++)
        {
            dli = dli_all[i]
            console.log(dli);
            em = dli.querySelector('em')
            console.log(em);
            sibling = em.nextSibling;
            modified += sibling.textContent.trim() + ', ';
        }
        
        team_culture = ldivs[2]
        console.log(team_culture)
        dli_all = personality_spectrum.querySelectorAll('.data-list__item');
        for (i = 0; i < dli_all.length; i++)
        {
            tmpstr = ''
            em = dli.querySelector('em')
            console.log(em);
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

        // right col
        advice_lists_all = right.querySelectorAll('.advice-list');
        console.log('advice list');
        console.log(advice_lists_all);
        
        for (i = 0; i < advice_lists_all.length; i++)
        {
            liked = advice_lists_all[i];
            likedstr = ''
            li_all = liked.querySelectorAll('li')
            console.log(li_all)
            for (j = 0; j < li_all.length; j++)
            {
                li = li_all[j];
                name = li.textContent;
                console.log(name);
                name = name.substring(0, name.length-3)
                modified += name + ", "
                console.log(modified);
                
                //a = li.querySelector('a')
                //rel = a.rel;
                //modified += "&" + rel + ", "
            }
        }
        
        
            
        modified = modified.replaceAll(",", "\t");
        console.log(modified);
        
        // Overwrite the clipboard content.
        event.preventDefault();
        console.log("copy: event prevent default");
        event.clipboardData.setData("text/plain",  modified);
        console.log("copy to clipboard event");

    }
    document.addEventListener("copy", oncopy, true);
    console.log("reset onCopy event");
    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
    console.log("COMPLETE!");
}

function copyToClipboard3(text, html) {
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
        console.log("copy to clipboard event");

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

function TESTER(text, html) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);

        modified = parseOpenPopupHtml(0);

        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain",  modified);
        console.log("Clipboard Data: " + modified);

    }
    document.addEventListener("copy", oncopy, true);
    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
    console.log("COMPLETE!");
}

function createFakePlayerObject() {
    let fakeobj = { };
    for (B of BIO) {
        fakeobj[B] = '\t';
    }
    for (R of RATINGS) {
        fakeobj[R] = '\t';
    }
    for (T of TRAITS) {
        fakeobj[T] = '\t';
    }
    return fakeobj;
}

function heightToMetric(feet, inches) {
    CM_TO_INCH = 2.54;

    iFeet = parseInt(feet);
    iInches = parseInt(inches);
    totalInches = iInches + (12 * iFeet);
    totalInches += 1 // Account for GPHM off by one error when calculating height in inches
    conversion = CM_TO_INCH * totalInches;
    conversion = Math.round(conversion);
    ret = conversion.toString() + " cm";
    //ret = conversion;
    console.log(feet + "'" + inches + '"  =  ' + ret);
    return ret;
}

function weightToMetric(lbs) {
    G_TO_LBS = 453.592;

    iLbs = parseInt(lbs);
    conversion = G_TO_LBS * iLbs;
    conversion = conversion/1000;
    conversion = Math.round(conversion);
    ret = conversion.toString() + " kg";
    //ret = conversion;
    console.log(lbs + '  =  ' + ret);
    return ret;
}

function parseOpenPopupHtml(popupClassIndex) {

    popupClassName = "f-dropdown content player-dropdown open";
    elements = document.getElementsByClassName(popupClassName)
    popup = elements[popupClassIndex];


    fakePlayerObj = createFakePlayerObject()

    /* Top Section: Name, Number (from Jersey image), Nationality, Role, Team */
    tmp = popup.querySelector('.heading-two-piece__first');
    fakePlayerObj.Name = tmp.textContent;
    fakePlayerObj.Name += ' ';

    tmp = popup.querySelector('.heading-two-piece__sur');
    fakePlayerObj.Name += tmp.textContent;
    console.log(fakePlayerObj.Name);

    tmp = popup.querySelector('.team-jersey__playernumber');
    fakePlayerObj.Number = tmp.textContent;

    tmp = popup.querySelector('.nationality-string');
    fakePlayerObj.Nationality = tmp.textContent;

    tmp = popup.querySelector('.player-dropdown__teaminfo');
    tmps = tmp.textContent;
    tmps = tmps.trim();
    spl = tmps.split('\n');
    fakePlayerObj.Role = spl[0];
    fakePlayerObj.Team = spl[1].replace(/^\s+|\s+$/gm,''); // Replace all whitespace from both sides until actual text is hit

    /* Black bar: Position, Age, Height, Weight, Hand */
    blackBar = popup.querySelector('.smallbold-block');
    blackBar_txt = blackBar.textContent.trim();
    spl = blackBar_txt.split('·') // hovering period symbol
    console.log(spl);
    fakePlayerObj.Position = spl[0].trim();
    fakePlayerObj.Age = spl[1].trim();

    tmpH = spl[2].trim().toLowerCase();

    if (tmpH.includes("cm")) {
        fakePlayerObj.Height = tmpH.trim();
    }
    else {
        splA = tmpH.split("'");
        feet = splA[0].trim();

        splB = splA[1].split('"');
        inches = splB[0].trim();

        fakePlayerObj.Height = heightToMetric(feet, inches);
    }

    tmpW = spl[3].trim().toLowerCase();
    if (tmpW.includes("kg")) {
        fakePlayerObj.Weight = tmpW.trim();
    }
    else {
        splC = tmpW.split(' ');
        fakePlayerObj.Weight = weightToMetric(splC[0]);
    }
   
    fakePlayerObj.Hand = spl[4].trim();

    /* Ratings and Traits which must be clicked open */

    // Click and update handle to popup on new Document DOM
    popup = clickElementAndReturnNewDOM(popup, '.player-dropdown__toggler, .top-ratings', popupClassName, popupClassIndex); // Seperate ".Thing1.Thing2" with comma"
    popup = clickElementAndReturnNewDOM(popup, '.player-dropdown__toggler, .all-traits', popupClassName, popupClassIndex); // Seperate ".Thing1.Thing2" with comma"

    // then get newly UNhidden all-ratings section
    ratingsList = popup.querySelector('.player-dropdown__ratings.rating-list.all-ratings'); // className starts with . and all spaced converted to .
    ratingTitleItems = ratingsList.querySelectorAll('.rating-list__titleitem');
    ratingDataItems = ratingsList.querySelectorAll('.rating-list__dataitem');

    for (let i = 0; i < ratingTitleItems.length; i++) {
        let rti = ratingTitleItems[i];
        rti_txt = rti.textContent.trim();
        
        let rdi = ratingDataItems[i];
        rdi_txt = rdi.textContent.trim();

        fakePlayerObj[rti_txt] = rdi_txt;
    }
    
    // then get newly UNhidden all-ratings section
    traitsList = popup.querySelector('.player-dropdown__traits.profile.all-traits.list-display'); // className starts with . and all spaced converted to .
    traitItems = traitsList.querySelectorAll('.list-display__item');

    for (let i = 0; i < traitItems.length; i++) {
        tli = traitItems[i];
        // need just the text in the meter item
        meter = tli.querySelector('.medium-meter.grade-meter.grade-meter--small');
        meter_txt = meter.textContent.trim();
        
        // There is no convienent heading, so pull from the master order from Profile Page
        let key = TRAITS[i];
        fakePlayerObj[key] = meter_txt;
    }
    
    console.log(fakePlayerObj);
    return fakePlayerObj;
}

/*
Click the button the reveal and return the new DOM
  - Hidden display elements are not visible to querySelector()
  - Results of previous querySelector() calls are snapshots in time, so we need to update DOM var
  */
 function clickElementAndReturnNewDOM(currentDom, clickClassname, popupClassName, newDomIndex) {
    clickme = currentDom.querySelector(clickClassname);
    clickme.click();
    
    elements = document.getElementsByClassName(popupClassName);
    return elements[newDomIndex];
 }