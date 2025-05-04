const BIO = ['Link', 'Name', 'Number', 'Nationality', 'Role', 'Team', 'Position', 'Age', 'Height', 'Weight', 'Hand'];
const RATINGS = ['Overall', 'Skating', 'Passing', 'PuckHandling', 'Shooting', 'Defence', 'Physical', 'Spirit', 'Endurance', 'Faceoffs'];
const TRAITS = ['Ego', 'Dirty', 'Leadership', 'BigGames', 'Ambition', 'Greed', 'Persona', 'Culture', 'Winner'];
const PROFILE = ['Persona', 'Culture', 'Winner'];
const SEASONSTATS = ['Reputation', 'Confidence', 'Health', 'League', 'GP', 'G', 'A', 'PTS', 'PIM', 'PER'];
const TRADE = [ 'Status', 'TradeValue', 'Salary', 'Years', 'Clause', 'Happiness'];
const CUSTOM = ['STATLINE', 'HYPERLINK'];
const ATTRIBS = [].concat(BIO, RATINGS, TRAITS, SEASONSTATS, CUSTOM);

let ALL_ATTRIBS_OBJ = {};
for (A of ATTRIBS) {
    ALL_ATTRIBS_OBJ[A] = A;
}

const DB_FPO_ATTRIBS = [];
//DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Name);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.HYPERLINK);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Age);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Nationality);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Height);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Weight);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Hand);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Role);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Overall);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Confidence);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Health);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Name);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Age);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Height);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Weight);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Skating);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Passing);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.PuckHandling);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Shooting);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Defence);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Physical);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Spirit);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Endurance);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Faceoffs);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Name);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Age);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Overall);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Reputation);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Status);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.TradeValue);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Salary);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Years);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Clause);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Happiness);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Name);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Age);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Ego);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Dirty);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Leadership);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.BigGames);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Ambition);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Greed);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Persona);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Culture);
DB_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Winner);

const FA_FPO_ATTRIBS = [];
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Link);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Name);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Position);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Age);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Height);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Weight);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Hand);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Overall);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Skating);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Passing);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.PuckHandling);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Shooting);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Defence);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Physical);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Spirit);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Endurance);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Faceoffs);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Ego);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Dirty);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Leadership);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.BigGames);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Ambition);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Greed);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Persona);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Culture);
FA_FPO_ATTRIBS.push(ALL_ATTRIBS_OBJ.Winner);
FA_FPO_ATTRIBS.push('STATLINE');

/*
NOTE1: calls document.getElementsByClassName() so comma seperated string of each className

NOTE2: calls queryselector*(), so dot seperated string of classNames 

NOTE3: querySelector() only returns FIRST subelement, querySelectorAll() returns all
*/

// This function must be called in a visible page, such as a browserAction popup
// or a content script. Calling it in a background page has no effect!

function TESTER(text, html) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        //event.stopImmediatePropagation(); // if event exists??

        console.log("TESTER RUNNING");
        modified = "LOL TEST";

        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain",  modified);
    }
    document.addEventListener("copy", oncopy, true);
    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
    console.log("TESTER COMPLETE!");
}

function copySelection(text, html) {
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

function copyScoutingProfile(text, html) {
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

const OUTPUT_FORMAT = {
    "DB":0,
    "FA_DRAFT":1,
}
function copyOpenPopupDB(text, html) {
    copyOpenPopup(text, html, OUTPUT_FORMAT.DB);
}
function copyOpenPopupFA(text, html) {
    copyOpenPopup(text, html, OUTPUT_FORMAT.FA_DRAFT);
}
function copyOpenPopup(text, html, outputFormat) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        //event.stopImmediatePropagation(); // if event exists??

        fakePlayerObj = parseOpenPopupHtml();
        if (fakePlayerObj === null) {
            return;
        }

        let modified = null;
        if (outputFormat === 0) {
            modified = parseFakePlayerObjectToOutput(fakePlayerObj, DB_FPO_ATTRIBS, 'UNK?', '\t');
        }
        else {
            modified = parseFakePlayerObjectToOutput(fakePlayerObj, FA_FPO_ATTRIBS, 'UNK?', '\t');
        }
        
        if (modified !== null) {
            // Overwrite the clipboard content.
            event.preventDefault();
            event.clipboardData.setData("text/plain",  modified);
            console.log("Clipboard Data: " + modified);
        }
    }
    document.addEventListener("copy", oncopy, true);
    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
    console.log("COMPLETE!");
}

function parseOpenPopupHtml() {
    popupClassName = "f-dropdown content player-dropdown open";
    return parsePopupHtml(popupClassName, 0);
}

function parsePopupHtml(popupClassName, popupClassIndex) {
    elements = document.getElementsByClassName(popupClassName)
    popup = elements[popupClassIndex];
    if (popup === undefined) {
        console.error("open (clicked on) player popup NOT detected");
        return null;
    }

    fakePlayerObj = createFakePlayerObject()

    /* Top Section: Name, Number (from Jersey image), Nationality, Role, Team */
    tmp = popup.querySelector('.heading-two-piece__first');
    fakePlayerObj.Name = tmp.textContent;
    fakePlayerObj.Name += ' ';

    tmp = popup.querySelector('.heading-two-piece__sur');
    fakePlayerObj.Name += tmp.textContent;

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

    /* Season and link */
    seasonHeading = popup.querySelector('.player-dropdown__seasoninfo');
    h3 = seasonHeading.getElementsByTagName('h3')
    h3 = h3[0];
    spl = h3.textContent.trim().split(',');
    fakePlayerObj.League = spl[0];

    stats = popup.querySelector('.summary.table-display');
    tdList = stats.getElementsByTagName('td');
    thList = stats.getElementsByTagName('th');

    for (let i = 0; i < tdList.length; i++) {
        let k = thList[i].textContent.trim();
        let v = tdList[i].textContent.trim();
        fakePlayerObj[k] = v;
    }
    
    let statline = fakePlayerObj.G + '/' + fakePlayerObj.A + '/' + fakePlayerObj.PTS + ", " + fakePlayerObj.PIM + ", " + fakePlayerObj.League;
    fakePlayerObj['STATLINE'] = statline;

    links = popup.querySelector('.player-dropdown__buttons');
    playerPageAnchor = links.getElementsByTagName('a')[0];
    anchorLink = playerPageAnchor.href;
    fakePlayerObj.Link = anchorLink;
    fakePlayerObj.HYPERLINK = `=HYPERLINK("${anchorLink}", "#${fakePlayerObj.Number} ${fakePlayerObj.Name}")`;

    return fakePlayerObj;
}

/* HELPER funcs */
function createFakePlayerObject() {
    let fakePlayerObj = { };
    
    for (A of ATTRIBS) {
        fakePlayerObj[A] = '\t';
    }

    return fakePlayerObj;
}

function parseFakePlayerObjectToOutput(fakePlayerObj, attribs, DEFAULT_VAL, SEP) {
    ret = '';
    for (A of attribs) {
        val = DEFAULT_VAL;
        if (A in fakePlayerObj){
            let tmp = fakePlayerObj[A].toString();
            if (tmp !== '\t') {
                val = tmp;
            }
        }
        ret += val;
        ret += SEP;
    }
    return ret;
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
    //console.log(feet + "'" + inches + '"  =  ' + ret);
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
    //console.log(lbs + '  =  ' + ret);
    return ret;
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