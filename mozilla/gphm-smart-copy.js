// The downside of immutable strings is no replaceAt() type function be default, so here's the Prototype
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


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

const DB_FPO_ATTRIBS = [
    //ALL_ATTRIBS_OBJ.Name,
    ALL_ATTRIBS_OBJ.HYPERLINK,
    ALL_ATTRIBS_OBJ.Age,
    ALL_ATTRIBS_OBJ.Nationality,
    ALL_ATTRIBS_OBJ.Height,
    ALL_ATTRIBS_OBJ.Weight,
    ALL_ATTRIBS_OBJ.Hand,
    ALL_ATTRIBS_OBJ.Role,
    ALL_ATTRIBS_OBJ.Overall,
    ALL_ATTRIBS_OBJ.Confidence,
    ALL_ATTRIBS_OBJ.Health,
    ALL_ATTRIBS_OBJ.Name,
    ALL_ATTRIBS_OBJ.Age,
    ALL_ATTRIBS_OBJ.Height,
    ALL_ATTRIBS_OBJ.Weight,
    ALL_ATTRIBS_OBJ.Skating,
    ALL_ATTRIBS_OBJ.Passing,
    ALL_ATTRIBS_OBJ.PuckHandling,
    ALL_ATTRIBS_OBJ.Shooting,
    ALL_ATTRIBS_OBJ.Defence,
    ALL_ATTRIBS_OBJ.Physical,
    ALL_ATTRIBS_OBJ.Spirit,
    ALL_ATTRIBS_OBJ.Endurance,
    ALL_ATTRIBS_OBJ.Faceoffs,
    ALL_ATTRIBS_OBJ.Name,
    ALL_ATTRIBS_OBJ.Age,
    ALL_ATTRIBS_OBJ.Overall,
    ALL_ATTRIBS_OBJ.Reputation,
    ALL_ATTRIBS_OBJ.Status,
    ALL_ATTRIBS_OBJ.TradeValue,
    ALL_ATTRIBS_OBJ.Salary,
    ALL_ATTRIBS_OBJ.Years,
    ALL_ATTRIBS_OBJ.Clause,
    ALL_ATTRIBS_OBJ.Happiness,
    ALL_ATTRIBS_OBJ.Name,
    ALL_ATTRIBS_OBJ.Age,
    ALL_ATTRIBS_OBJ.Ego,
    ALL_ATTRIBS_OBJ.Dirty,
    ALL_ATTRIBS_OBJ.Leadership,
    ALL_ATTRIBS_OBJ.BigGames,
    ALL_ATTRIBS_OBJ.Ambition,
    ALL_ATTRIBS_OBJ.Greed,
    ALL_ATTRIBS_OBJ.Persona,
    ALL_ATTRIBS_OBJ.Culture,
    ALL_ATTRIBS_OBJ.Winner 
];
const FA_FPO_ATTRIBS = [
    ALL_ATTRIBS_OBJ.Link,
    ALL_ATTRIBS_OBJ.Name,
    ALL_ATTRIBS_OBJ.Position,
    ALL_ATTRIBS_OBJ.Age,
    ALL_ATTRIBS_OBJ.Height,
    ALL_ATTRIBS_OBJ.Weight,
    ALL_ATTRIBS_OBJ.Hand,
    ALL_ATTRIBS_OBJ.Overall,
    ALL_ATTRIBS_OBJ.Skating,
    ALL_ATTRIBS_OBJ.Passing,
    ALL_ATTRIBS_OBJ.PuckHandling,
    ALL_ATTRIBS_OBJ.Shooting,
    ALL_ATTRIBS_OBJ.Defence,
    ALL_ATTRIBS_OBJ.Physical,
    ALL_ATTRIBS_OBJ.Spirit,
    ALL_ATTRIBS_OBJ.Endurance,
    ALL_ATTRIBS_OBJ.Faceoffs,
    ALL_ATTRIBS_OBJ.Ego,
    ALL_ATTRIBS_OBJ.Dirty,
    ALL_ATTRIBS_OBJ.Leadership,
    ALL_ATTRIBS_OBJ.BigGames,
    ALL_ATTRIBS_OBJ.Ambition,
    ALL_ATTRIBS_OBJ.Greed,
    ALL_ATTRIBS_OBJ.Persona,
    ALL_ATTRIBS_OBJ.Culture,
    ALL_ATTRIBS_OBJ.Winner,
    ALL_ATTRIBS_OBJ.STATLINE,
];

/*
NOTE1: calls document.getElementsByClassName() so comma seperated string of each className

NOTE2: calls queryselector*(), so dot seperated string of classNames 

NOTE3: querySelector() only returns FIRST subelement, querySelectorAll() returns all
*/

// This function must be called in a visible page, such as a browserAction popup
// or a content script. Calling it in a background page has no effect!
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

function parseGphmMeter(dli) {
    let em = dli.querySelector('em');
    let sibling = em.nextSibling;
    let progress = dli.querySelector('.progress')
    let span = progress.querySelector('span')
    
    let key = em.textContent.trim();
    key = key.replaceAll(' ', '_');
    key = key.toLowerCase();
    key = key.replaceAt(0, key[0].toUpperCase());
    
    let idx = key.indexOf("_");
    if ( idx !== -1) {
        key = key.replaceAt(idx+1, key[idx+1].toUpperCase());
    }

    let val = sibling.textContent.trim();
    let color = pullGPHMColorFromClassName(progress);
    let width = span.style.width.trim();

   return {'Key':key, 'Value':val, 'Color':color, 'Width':width}; 
}

function copyScoutingProfile(text, html) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        //event.stopImmediatePropagation(); // what is event??

        let fakeScoutingProfileObj = {};

        // get name
        let notes = document.getElementsByClassName('panel scouting-report-container__notes');
        let note = notes[0];
        let paras = note.querySelectorAll('p');
        let p = paras[1];
        let t = p.textContent;
        let spl = t.split(' is');
        let name = spl[0];
        
        if (name.indexOf('brings') !== -1){
            spl = name.split(' brings');
            name = spl[0]
        }
        else if (name.indexOf('blends') !== -1){
            spl = name.split(' blends');
            name = spl[0]
        }
        fakeScoutingProfileObj['Name'] = name.trim();
        
        // get scouting data
        let srcontainers = document.getElementsByClassName('scouting-report-container');
        srcontainer = srcontainers[0];
        
        let cols = srcontainer.getElementsByClassName('column');
        let left = cols[0];
        let right = cols[1];

        // left col
        //let ldivs = left.querySelectorAll('div');
        let lpanels = left.querySelectorAll('.panel');
        
        let personality_type = lpanels[0];
        let pt_spans = personality_type.querySelectorAll('span');
        fakeScoutingProfileObj['Dominant'] = pt_spans[0].title;
        fakeScoutingProfileObj['Influenced'] = pt_spans[1].title;

        let personality_spectrum = lpanels[1];
        let dli_all = personality_spectrum.querySelectorAll('.data-list__item');
        let ps_category = ['Competitor', 'Inspirer', 'Peacemaker', 'Tactician'];
        for (i = 0; i < dli_all.length; i++)
        {
            let dli = dli_all[i];
            let M = parseGphmMeter(dli);
            fakeScoutingProfileObj[M.Key] = {};
            fakeScoutingProfileObj[M.Key]['Value'] = M.Value;
            fakeScoutingProfileObj[M.Key]['Color'] = M.Color;
            fakeScoutingProfileObj[M.Key]['Width'] = M.Width;
            
        }
        
        let team_culture_panel = lpanels[2];
        dli_all = team_culture_panel.querySelectorAll('li')
        let tc_category = ['Culture_Influence', 'Culture_Impact', 'Teamwork_Impact', 'Winner_Instinct'];
        let tc_subcat = ['Value', 'Progress', 'Width'];
        let tc_keys = [];
        for (i = 0; i < dli_all.length; i++) {
            let dli = dli_all[i];
            let M = parseGphmMeter(dli);
            fakeScoutingProfileObj[M.Key] = {};
            fakeScoutingProfileObj[M.Key]['Value'] = M.Value;
            fakeScoutingProfileObj[M.Key]['Color'] = M.Color;
            fakeScoutingProfileObj[M.Key]['Width'] = M.Width;
        }
        
        // right col
        let advice_lists_all = right.querySelectorAll('.advice-list');
        let category = ['Likes', 'Dislikes']
        fakeScoutingProfileObj['Likes'] = ['', '', '', '', '', '', ''];
        fakeScoutingProfileObj['Dislikes'] = ['', '', '', '', '', '', ''];
        
        for (i = 0; i < advice_lists_all.length; i++)
        {
            let cat = category[i];
            let liked = advice_lists_all[i];
            let likedstr = ''
            let li_all = liked.querySelectorAll('li')
            for (j = 0; j < li_all.length; j++)
            {
                let li = li_all[j];
                let name = li.textContent;
                name = name.substring(0, name.length-4) // Remove position in parens
                //modified += name + ", "
                fakeScoutingProfileObj[cat][j] = name;
            }
        }
        
        // Make string
        console.log(fakeScoutingProfileObj);
        
        let SEP = ', '
        let modified = '';

        modified += fakeScoutingProfileObj.Name + SEP;
        modified += fakeScoutingProfileObj.Competitor.Value + SEP;
        modified += fakeScoutingProfileObj.Inspirer.Value + SEP;
        modified += fakeScoutingProfileObj.Peacemaker.Value + SEP;
        modified += fakeScoutingProfileObj.Tactician.Value + SEP;

        let TC = ['Culture_Influence', 'Culture_Impact', 'Teamwork_Impact', 'Winner_Instinct'];
        for (let i = 0; i < TC.length; i++) {
            let tmps = '';
            tmps += fakeScoutingProfileObj[TC[i]].Value; 
            //tmps += "|";
            //tmps += fakeScoutingProfileObj[TC[i]].Color;
            //tmps += "|";
            //tmps += fakeScoutingProfileObj[TC[i]].Width;
            modified += tmps + SEP
        }
        
        for (let i = 0; i < fakeScoutingProfileObj.Likes.length; i++) {
            modified += fakeScoutingProfileObj.Likes[i] + SEP;
        }

        for (let i = 0; i < fakeScoutingProfileObj.Dislikes.length; i++) {
            modified += fakeScoutingProfileObj.Dislikes[i] + SEP;
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

// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

/* ============================================================================================= */
 function clickElementAndReturnNewDOM2(clickEle, newEleClassName, newEleIndex) {
    clickEle.click();
    
    elements = document.getElementsByClassName(newEleClassName);
    ret = null;
    if (elements.length > 1) {
        ret = elements[newEleIndex];
    }
    else {
        ret = elements;
    }
    return ret;
 }
 function getSourceAsDOM(url)
 {
     xmlhttp=new XMLHttpRequest();
     xmlhttp.open("GET",url,false);
     xmlhttp.send();
     parser=new DOMParser();
     return parser.parseFromString(xmlhttp.responseText,"text/html");      
 }

function calcBalazsRatio(selfTeam, oppTeam) {
    let tmp = [];
    if ((selfTeam.G.at(-1) < oppTeam.G.at(-1)) && (selfTeam.S.at(-1) > oppTeam.S.at(-1)) ) {

        let ratio = ( (1 + oppTeam.G.at(-1)) / (1 + selfTeam.G.at(-1)) )
        tmp.push(ratio);

        for (let i = 0; i < selfTeam.S.length-1; i++) {
            let selfS = selfTeam.S.at(i);
            let selfO = oppTeam.S.at(i);
            let term = 0.0
            
            if (selfO !== 0) {
                term = selfS/selfO;
            }
            tmp.push(term);
            ratio += term;

        }
        tmp.push(ratio);
        return ratio//.toFixed(1);
    }
    else {
        return -999;
    }
} 

function TESTER(text, html) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        //event.stopImmediatePropagation(); // if event exists??

        console.log("TESTER RUNNING");
        leagueSchedule();
        //parseGameURL('https://gameplanhockey.com/game?gpid=332160-A')
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

function leagueSchedule() {
    let element = document.getElementById("tabs-schedule");
    clickElementAndReturnNewDOM2(element, "tabs-schedule", null)

    let contentDiv = document.getElementById('content');

    // Get all the Home/Away/Link 
    let schedule = []
    for (let i = 7; i < 87; i++) {
        dayIdSel = `div [id='day-${i}']`; 
        dayDiv = contentDiv.querySelector(dayIdSel);
        let games = parseDayDivHTML(dayDiv);
        schedule.push(games);
    }

    // Find Balazs ratio winner
    var max_ratio = -1;
    var max_ratio_games = [];
    var ratio_games = [];

    for (let day = 0; day < schedule.length; day++) {
        for (played of schedule[day]) {
            let link = played.Link;
            let results = parseGameURL(link);
            let key = results.Loser;

            if (link === 'https://gameplanhockey.com/game?gpid=332160-A') {
                console.log('==================');
            }
            
            if ((results.Home.BalazsRatio > -1) || (results.Away.BalazsRatio > -1)){
                console.log("Day"+(day+7) + " " + link + "  /  " + results.Home.Name + " (" + results.Home.Result + ") " + homeBR + "  /  " + results.Away.Name + " (" + results.Away.Result + ") " + awayBR + " [" + results.Loser + " | " + results[key].BalazsRatio + "]");
            }

            let currRatio = results[key].BalazsRatio;
            //console.log("Loser: " + results[key].Name + ", currRatio: " + results[key].BalazsRatio);

            if (currRatio > max_ratio) {
                console.log("UPDATE from: " + max_ratio + " to: " + results[key].BalazsRatio);
                max_ratio_games = [];
                max_ratio_games.push(results);
                max_ratio = currRatio;
            }
            else if (currRatio === max_ratio) {
                console.log("SAME ratio: " + results[key].BalazsRatio + " ... appending results");
                max_ratio_games.push(results);
            }
            else {
                
                ;
                //console.log("max_ratio: " + max_ratio + " > " + currRatio + " (" + (max_ratio > currRatio) + ")");
            }
            
            if ((results.Home.BalazsRatio > -1) || (results.Away.BalazsRatio > -1)) {
                ratio_games.push(results);
            }
        }
    }
    console.log("--------------------------------");
    console.log("Max Balazs Ratio: " + max_ratio);
    console.log("Max Balazs Ratio Games: ");
    for (tmp of max_ratio_games) {
        let s = '';
        let l = tmp.Loser;
        console.log(tmp[l].Name + ' ' + tmp.HYPERLINK);
    }
   
    mega_log = '';
    for (tmp of ratio_games) {
        mega_log += `${tmp.HYPERLINK}, ${tmp.Home.BalazsRatio}, ${tmp.Away.BalazsRatio}\n'`;
    }
    console.log(mega_log);

    let data = JSON.stringify(tmp);

    console.log(data);
    download('data.json', data);
}
function parseDayDivHTML(dayDiv) {
    let ret = [];

    let rows = dayDiv.querySelectorAll('tr');
    for (row of rows) {
        if (row.querySelectorAll('th').length > 0) {
            continue;
        }
        let tmp = {};
        let tds = row.querySelectorAll('td');
        
        tmp['Home'] = tds[0].querySelector('a').title;
        tmp['Away'] = tds[1].querySelector('a').title;
        tmp['Link'] = tds[3].querySelector('a').href;
        ret.push(tmp)
    }
    return ret;
}

function parseGameURL(url) {
    let dom = getSourceAsDOM(url);

    let boxscoreDiv = dom.getElementById('boxscore');

    let cols = boxscoreDiv.querySelectorAll('.column');
    let leftcol = cols[0];
    let rightcol = cols[1];

    let panels = rightcol.querySelectorAll('.panel');
    
    // Shots by period
    let sbp = {
        Home: {},
        Away: {}
    }
   
    // Right Col has 4 sections

    // Period Summary and Shots by Period
    periodSummary = panels[1].querySelector('.summary.period.table-display');
    shotsByPeriod = panels[2].querySelector('.summary.period.table-display');
    let tableByPeriods = [periodSummary, shotsByPeriod];
   
    const STAT = ['G', 'S']
    for (let i = 0; i < tableByPeriods.length; i++) {
        let table = tableByPeriods[i];
        let stat = STAT[i];
        rows = table.querySelectorAll('tr');
        const TEAMS = ['SKIPME', 'Home', 'Away'];

        for (let j = 1; j < rows.length; j++) {
            let ha = TEAMS[j]
            let shots = rows[j].querySelectorAll('td');

            sbp[ha]['Name'] = shots[0].querySelector('a').title;
            sbp[ha][`${stat}`] = [];
            sbp[ha][`${stat}`].push(parseInt(shots[1].textContent.trim()));
            sbp[ha][`${stat}`].push(parseInt(shots[2].textContent.trim()));
            sbp[ha][`${stat}`].push(parseInt(shots[3].textContent.trim()));

            if (shots.length ===  5) {
                sbp[ha][`${stat}`].push(parseInt(shots[4].textContent.trim()));
            }
            else if (shots.length ===  6) {
                sbp[ha][`${stat}`].push(parseInt(shots[4].textContent.trim()));
                sbp[ha][`${stat}`].push(parseInt(shots[5].textContent.trim()));
            }
            else if (shots.length ===  7) {
                sbp[ha][`${stat}`].push(parseInt(shots[4].textContent.trim()));
                sbp[ha][`${stat}`].push(parseInt(shots[5].textContent.trim()));
                sbp[ha][`${stat}`].push(parseInt(shots[6].textContent.trim()));
            }
            else {
                console.error("shots.length === " + shots.length);
            }
        }
    }
    sbp['HYPERLINK'] = url;

    homeBR = calcBalazsRatio(sbp['Home'], sbp['Away']); 
    sbp['Home']['BalazsRatio'] = homeBR;

    awayBR = calcBalazsRatio(sbp['Away'], sbp['Home']);
    sbp['Away']['BalazsRatio'] = awayBR;
    
    sbp['Winner'] = 'Home';
    sbp['Loser'] = 'Away';
    if (sbp.Away.G.at(-1) > sbp.Home.G.at(-1)) {
        sbp['Winner'] = 'Away';
        sbp['Loser'] = 'Home';
    }
    let ha = sbp.Winner;
    sbp[ha]['Result'] = 'W';
    ha = sbp.Loser;
    sbp[ha]['Result'] = 'L';
    
    //console.log(url + "  /  " + sbp.Home.Name + " (" + sbp.Home.Result + ") " + homeBR + "  /  " + sbp.Away.Name + " (" + sbp.Away.Result + ") " + awayBR);
    return sbp;
}