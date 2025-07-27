// The downside of immutable strings is no replaceAt() type function be default, so here's the Prototype
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

/*
NOTE1: calls document.getElementsByClassName() so comma seperated string of each className

NOTE2: calls queryselector*(), so dot seperated string of classNames 

NOTE3: querySelector() only returns FIRST subelement, querySelectorAll() returns all
*/

const BIO = ['HYPERLINK', 'Name', 'Number', 'Nationality', 'Role', 'Team', 'Position', 'Age', 'Height', 'Weight', 'Hand', 'Overall'];
// Overall in BIO
const RATINGS = ['Skating', 'Passing', 'PuckHandling', 'Shooting', 'Defence', 'Physical', 'Spirit', 'Endurance', 'Faceoffs'];
const GOALIE_RATINGS = ['Reflexes', 'Positioning', 'PuckControl', 'PuckHandling', 'Athletic', 'Endurance', 'Spirit'];
const TRAITS = ['Ego', 'Dirty', 'Leadership', 'BigGames', 'Ambition', 'Greed', 'Persona', 'Culture', 'Winner'];
const PROFILE = ['Persona', 'Culture', 'Winner'];
const SEASONSTATS = ['Reputation', 'Confidence', 'Health', 'League'];
const SEASONSTATS_SKATER = ['GP', 'G', 'A', 'PTS', 'PIM', 'PER'];
const SEASONSTATS_GOALIE = ['GP', 'GAA', 'SO', 'SV%', 'PER'];
const TRADE = [ 'Status', 'TradeValue', 'Salary', 'Years', 'Clause', 'Happiness'];
const CUSTOM = ['STATLINE', 'SPREADSHEET_LINK'];
const ATTRIBS = [].concat(BIO, RATINGS, TRAITS, SEASONSTATS, CUSTOM);
const OUTPUT_DELIM_RATINGS_MARKER = 'QWERTY';

let ALL_ATTRIBS_OBJ = {};
for (A of ATTRIBS) {
    ALL_ATTRIBS_OBJ[A] = A;
}

const DB_FPO_ATTRIBS = [
    ALL_ATTRIBS_OBJ.Name,
    //ALL_ATTRIBS_OBJ.HYPERLINK,
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
    ALL_ATTRIBS_OBJ.Name,
    ALL_ATTRIBS_OBJ.HYPERLINK,
    ALL_ATTRIBS_OBJ.Position,
    ALL_ATTRIBS_OBJ.Age,
    ALL_ATTRIBS_OBJ.Height,
    ALL_ATTRIBS_OBJ.Weight,
    ALL_ATTRIBS_OBJ.Hand,
    ALL_ATTRIBS_OBJ.Overall,
    OUTPUT_DELIM_RATINGS_MARKER,
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

const ID_COPY_SCOUTING_PROFILE = "gphm-scouting-profile";
const ID_COPY_POPUP_FA = "gphm-open-popup-fadraft";
const ID_COPY_POPUP_DB = "gphm-open-popup-db";
const ID_WALK_SEASON = "gphm-smart-copy-league-season";

const OUTPUT_FORMAT = {
    "DB":0,
    "FA_DRAFT":1,
}

/*
Handler Functions
*/
function copyToClipboardHandler(menuItemId) {
    // params used to be (text, html) but weren't actually used
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();
        let modified = '';
        
        /* CODE HERE */
        
        if (menuItemId === ID_COPY_SCOUTING_PROFILE) {
            modified = htmlParserScoutingProfile();
        }
        else {
            let popupClassName = "f-dropdown content player-dropdown open";
            let fakePlayerObj = htmlParserPopup(popupClassName, 0);
            if (fakePlayerObj === null) {
                return;
            }

            if (menuItemId === ID_COPY_POPUP_FA) {
                modified = formatFakePlayerObject(fakePlayerObj, FA_FPO_ATTRIBS, 'UNK?', '\t');
            }
            else if (menuItemId === ID_COPY_POPUP_DB) {
                modified = formatFakePlayerObject(fakePlayerObj, DB_FPO_ATTRIBS, 'UNK?', '\t');
            }
        }

        /* END CODE HERE */
        
        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain",  modified);
        console.log(modified);
    }
    document.addEventListener("copy", oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
}

function assistantReportHandler(menuItemId) {
    console.log("in assistantReportHandler()");
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();
        let modified = '';
        /* CODE HERE */

        modified = htmlParserAssistantReport();            

        /* END CODE HERE */
        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain",  modified);
    }
    document.addEventListener("copy", oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
    
}

function createJsonHandler(menuItemId) {
    console.log("in walkToJsonRoot()");
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        event.stopImmediatePropagation();
        let modified = '';
        /* CODE HERE */

        if (menuItemId === ID_WALK_SEASON) {
            console.log("in createJsonHandler");
            modified = htmlParserLeagueSchedule();            
        }

        /* END CODE HERE */
        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain",  modified);
    }
    document.addEventListener("copy", oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
}

/*
htmlParser Functions
*/

function htmlParserScoutingProfile() {
    let fakeScoutingProfileObj = {};

    // get name
    let notes = document.getElementsByClassName('panel scouting-report-container__notes');
    let note = notes[0];
    let paras = note.querySelectorAll('p');
    let p = paras[0];
    let tmpdate = p.textContent;
    tmpdate = tmpdate.split('Created ');
    console.log(tmpdate);
    //tmpdate = tmpdate.split(' ');
    //tmpdate = tmpdate.slice(1);
    fakeScoutingProfileObj['Date'] = tmpdate.join(' ');
    
    p = paras[1];
    let t = p.textContent;
    let spl = t.split(' is');
    let name = spl[0];
    
    let words = ['brings', 'blends', 'tries', 'leads']
    for (let word of words) {
        if (name.indexOf(word) !== -1){
            spl = name.split(' ' + word);
            name = spl[0]
            break;
        }
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
        let M = htmlParserGphmMeter(dli);
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
        let M = htmlParserGphmMeter(dli);
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
    let SEP = '@ '
    let modified = '';
    modified += fakeScoutingProfileObj.Date + SEP;
    modified += fakeScoutingProfileObj.Name + SEP;

    // Teammate Likes/Dislikes
    for (let i = 0; i < fakeScoutingProfileObj.Likes.length; i++) {
        modified += fakeScoutingProfileObj.Likes[i] + SEP;
    }

    for (let i = 0; i < fakeScoutingProfileObj.Dislikes.length; i++) {
        modified += fakeScoutingProfileObj.Dislikes[i] + SEP;
    }
    
    // Player Specific
    modified += fakeScoutingProfileObj.Dominant + SEP;
    modified += fakeScoutingProfileObj.Influenced + SEP;
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

    console.log(modified);
    modified = modified.replaceAll(SEP, "\t");
    return modified;
}

function htmlParserPopup(popupClassName, popupClassIndex) {
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
        splA = tmpH.split("'");
        feet = splA[0].trim();

        splB = splA[1].split('"');
        inches = splB[0].trim();

        fakePlayerObj.Height = heightToMetric(feet, inches);
    }
    else {
        fakePlayerObj.Height = tmpH.trim();
    }

    tmpW = spl[3].trim().toLowerCase();
    if (tmpW.includes("kg")) {
        splC = tmpW.split(' ');
        fakePlayerObj.Weight = weightToMetric(splC[0]);
    }
    else {
        fakePlayerObj.Weight = tmpW.trim();
    }
   
    fakePlayerObj.Hand = spl[4].trim();

    /* Ratings and Traits which must be clicked open */

    // Click and update handle to popup on new Document DOM

    let clickme = popup.querySelector('.player-dropdown__toggler, .top-ratings');
    popup = clickAndGetElement(clickme, [[popupClassName, popupClassIndex]]);

    clickme = popup.querySelector('.player-dropdown__toggler, .all-traits');
    popup = clickAndGetElement(clickme, [[popupClassName, popupClassIndex]]);

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
    
    if (fakePlayerObj.Position.toLowerCase() === 'goalie') {
        let statline = fakePlayerObj.GAA + '/' + fakePlayerObj.SO + '/' + fakePlayerObj['SV%'] + ', ' + fakePlayerObj.League;
        fakePlayerObj['STATLINE'] = statline;

    }
    else {
        let statline = fakePlayerObj.G + '/' + fakePlayerObj.A + '/' + fakePlayerObj.PTS + ", " + fakePlayerObj.PIM + ", " + fakePlayerObj.League;
        fakePlayerObj['STATLINE'] = statline;
    }

    links = popup.querySelector('.player-dropdown__buttons');
    playerPageAnchor = links.getElementsByTagName('a')[0];
    anchorLink = playerPageAnchor.href;
    fakePlayerObj.HYPERLINK = anchorLink;
    fakePlayerObj.SPREADSHEET_LINK = `=HYPERLINK("${anchorLink}", "#${fakePlayerObj.Number} ${fakePlayerObj.Name}")`;

    return fakePlayerObj;
}

function htmlParserAssistantReport() {
    console.log("in htmlParserAssistantReport");

    let action_button = document.getElementById("show-tacticReport");
    clickAndGetElement(action_button, [["tabs-schedule", 0]])
   
    let TeamOverview = htmlParserAssistantTeamOverview();
    
    //document.getElementById('personlist').value=Person_ID;
    let report_selection = document.getElementById("gameanalysis-playerselect");
    clickDropdownByOptionValue(report_selection, "gameanalysis-chemistrycontainer")
    
    let Chemistry = htmlParserAssistantChemistry();


}

function htmlParserAssistantChemistry() {
    let tacticReport = document.getElementById("gameanalysis-chemistrycontainer");
    cols = tacticReport.querySelectorAll('.column, .medium-6');
    let left_col = cols[0];
    let right_col = cols[1];
    left_panels = left_col.querySelectorAll(".panel");

    let Chemistry = {}

    for (let i = 0; i < left_panels.length; i++) {
        let panel = left_panels[i];
        let h3 = panel.querySelector('h3');
        let h3text = h3.textContent.trim()
        let lis = panel.querySelectorAll('li');
        for (let j = 0; j < lis.length-3; j++) {
            let li = lis[j];
            let em = li.querySelector('em');
            let a = li.querySelector('a');

            let k = h3text + "_" + em.textContent.trim();
            k = k.replaceAll(" ", "_");
            Chemistry[k] = a.textContent.trim();
        }
        for (let j = lis.length-3; j < lis.length-1; j++) {
            let li = lis[j];
            let em = li.querySelector('em');
            
            // Because textContent processes child nodes...
            litext = null;
            console.log(li);
            for (const child of li.childNodes) {
                if (child.nodeType == Node.TEXT_NODE) {
                    console.log(child.textContent.trim())

                    if (child.textContent.trim() === "") {
                        continue;
                    }
                    litext = child.textContent.trim();
                    break;
                }
            } 
            let k = h3text + "_" + em.textContent.trim(); 
            k = k.replaceAll(" ", "_");
            Chemistry[k] = litext.trim();
        }
        
        let li = lis[lis.length-1];
        let em = li.querySelector('em');
        let span = li.querySelector('span');
        Chemistry[em.textContent.trim()] = span.textContent.trim();
    }

    console.log(Chemistry);
    return Chemistry;
}

function htmlParserAssistantTeamOverview() {
    // actually the whole modal for assistant reports despite name
    let tacticReport = document.getElementById("tacticReport");

    cols = tacticReport.querySelectorAll('.column, .medium-6');
    let left_col = cols[0];
    let right_col = cols[1];
    left_panels = left_col.querySelectorAll(".panel");
    
    
    let TeamOverview = {};
    let h3 = left_panels[0].querySelector('h3');
    let em = left_panels[0].querySelector('em');
    TeamOverview[h3.textContent.trim()] = em.textContent.trim()
    
    let positive_remarks = left_panels[1].querySelectorAll('li');
    for (let i = 0; i < positive_remarks.length; i++) {
        let li = positive_remarks[i];
        let k = 'postive_' + i.toString();
        TeamOverview[k] = li.textContent.trim()
    }
   
    let negative_remarks = left_panels[2].querySelectorAll('li');
    for (let i = 0; i < negative_remarks.length; i++) {
        let li = negative_remarks[i];
        let k = 'negative_' + i.toString();
        TeamOverview[k] = li.textContent.trim()
    }

    right_panels = right_col.querySelectorAll(".panel");
    let epanel = right_panels[0];
    let elis = epanel.querySelectorAll('li')
    for (let j = 1; j < elis.length; j++) {
        eli = elis[j]
        let eem = eli.querySelector('em');
        let espan = eli.querySelector('span');
        TeamOverview[eem.textContent.trim()] = espan.textContent.trim();
    }


    for (let i = 1; i < right_panels.length; i++) {
        let panel = right_panels[i];
        let lis = panel.querySelectorAll('li');
        for (let j = 1; j < lis.length; j++) {
            li = lis[j];
            let em = li.querySelector('em');
       
            // Because textContent processes child nodes...
            litext = null;
            for (const child of li.childNodes) {
                if (child.nodeType == Node.TEXT_NODE) {
                    litext = child.textContent;
                    break;
                }
            } 
        
            TeamOverview[em.textContent.trim()] = litext.trim()
        }
    }
    //console.log(TeamOverview)
    return TeamOverview;
}

function htmlParserLeagueSchedule() {
    console.log("in htmlParserLeagueSchedule");
    let element = document.getElementById("tabs-schedule");
    clickAndGetElement(element, [["tabs-schedule", 0]]) // ignore return

    let contentDiv = document.getElementById('content');

    // Get all the Home/Away/Link 
    let seasonResults = [];
    for (let i = 7; i < 87; i++) {
        let dayIdSel = `div [id='day-${i}']`; 
        let dayDiv = contentDiv.querySelector(dayIdSel);
        let dayGames = htmlParserDayDiv(dayDiv);
        console.log("Day" + i.toString());
        for (let j = 0; j < dayGames.length; j++) {
            console.log(`Game ${j} of ${dayGames.length} ${dayGames[j].Away} AT ${dayGames[j].Home}`) 
            let url = dayGames[j].Link;
            let dom = UrlToDOM(url);
            let results = htmlParserGamePage(dom, url);
            seasonResults.push(results);
        }
    }
    let data = JSON.stringify(seasonResults);
    console.log(data);
    downloadJson('data.json', data);
}

function htmlParserGphmMeter(dli) {
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

function htmlParserGamePage(dom, url) {
    console.log("in htmlParserGamePage");
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

    // Three Stars
    let tableEle = panels[0].querySelector('table');
    let threeStarsData = [];

    let tbody = tableEle.querySelector('tbody');
    let rows = tbody.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        console.log(row.children[0]);
        let star = row.children[0].textContent.trim().match(/star/g).length;
        let player_link = row.children[1].href//.querySelector('a').href;
        let team_link = row.children[2].querySelector('a').href;
        let points = row.children[3].textContent.trim();

        threeStarsData.push([star, player_link, team_link, points]); 
    }

    console.log(threeStarsData);


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
            let shots_columns = rows[j].querySelectorAll('td');

            sbp[ha]['Name'] = shots_columns[0].querySelector('a').title;
            sbp[ha][`${stat}`] = [];
            sbp[ha][`${stat}`].push(parseInt(shots_columns[1].textContent.trim()));
            sbp[ha][`${stat}`].push(parseInt(shots_columns[2].textContent.trim()));
            sbp[ha][`${stat}`].push(parseInt(shots_columns[3].textContent.trim()));

            if (shots_columns.length ===  5) {
                sbp[ha][`${stat}`].push(parseInt(shots_columns[4].textContent.trim()));
            }
            else if (shots_columns.length ===  6) {
                sbp[ha][`${stat}`].push(parseInt(shots_columns[4].textContent.trim()));
                sbp[ha][`${stat}`].push(parseInt(shots_columns[5].textContent.trim()));
            }
            else if (shots_columns.length ===  7) {
                sbp[ha][`${stat}`].push(parseInt(shots_columns[4].textContent.trim()));
                sbp[ha][`${stat}`].push(parseInt(shots_columns[5].textContent.trim()));
                sbp[ha][`${stat}`].push(parseInt(shots_columns[6].textContent.trim()));
            }
            else {
                console.error("shots.length === " + shots_columns.length);
            }
        }
    }
    sbp['HYPERLINK'] = url;

    sbp['Winner'] = 'Home';
    sbp['Loser'] = 'Away';
    if (sbp.Away.G.at(-1) > sbp.Home.G.at(-1)) {
        sbp['Winner'] = 'Away';
        sbp['Loser'] = 'Home';
    }
    
    return sbp;
}

function htmlParserDayDiv(dayDiv) {
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

/*
Helper Functions
*/
function createFakePlayerObject() {
    let fakePlayerObj = { };
    
    for (A of ATTRIBS) {
        fakePlayerObj[A] = '\t';
    }

    return fakePlayerObj;
}

function formatFakePlayerObject(fakePlayerObj, attribs, DEFAULT_VAL, SEP) {
    ret = '';

    var position_ratings = RATINGS;
    let is_goalie = false;
    if (fakePlayerObj.Position.toLowerCase() === 'goalie') {
        position_ratings = GOALIE_RATINGS;
        is_goalie = true;
    }

    let ratings_str = "";
    for (R of position_ratings) {
        val = DEFAULT_VAL;
        if (R in fakePlayerObj) {
            let tmp = fakePlayerObj[R].toString();
            if (tmp !== SEP) {
                val = tmp;
            }
        }
        ratings_str += val;
        ratings_str += SEP;
    }

    if (is_goalie) {
        // Padding because goalies have less ratings
        ratings_str += '-';
        ratings_str += SEP;
        ratings_str += '-';
        ratings_str += SEP;
    }
    
    for (A of attribs) {
        val = DEFAULT_VAL;
        if (A === OUTPUT_DELIM_RATINGS_MARKER) {
           ret += ratings_str 
           continue;
        }
        else if (A in fakePlayerObj) {
            let tmp = fakePlayerObj[A].toString();
            if (tmp !== SEP) {
                val = tmp;
            }
        }
        ret += val;
        ret += SEP;
    }

    return ret;
}

function clickDropdownByOptionIndex(dropdown, optionidx) {
    dropdown.selectedIndex = optionidx;
    const event = new Event('change');
    dropdown.dispatchEvent(event);
}

function clickDropdownByOptionValue(dropdown, optionvalue) {
    dropdown.value = optionvalue;
    const event = new Event('change');
    dropdown.dispatchEvent(event);
}

function clickAndGetElement(clickEle, classname_and_idx) {
    clickEle.click();

    let ele = document;
    for (const ci of classname_and_idx) {
        let classname = ci[0];
        let idx = ci[1];

        let elements = ele.getElementsByClassName(classname);
        ele = elements[idx];
    }
    return ele;
}

function tableToArray(tableEle) {
    return ret;
}

function trToArray(trEle) {
    let ret = [];

    for (let i = 0; i < trEle.children.length; i++) {
        let child = trEle.children[i];
        ret.push(child.textContent.trim());
    }
    return ret;
}

function UrlToDOM(url)
{
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    parser=new DOMParser();
    return parser.parseFromString(xmlhttp.responseText,"text/html");      
}

function downloadJson(filename, text) {
// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
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

/***************************************
BACKUP
****************************************/

function testerHandler(text, html) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);
        // Hide the event from the page to prevent tampering.
        //event.stopImmediatePropagation(); // if event exists??
        let modified = '';
        
        /* CODE HERE */
        console.log("TESTER RUNNING");
        modified = "LOL TEST";

        modified = htmlParserGamePage(document, 'TEST');

        /* END CODE HERE */

        // Overwrite the clipboard content.
        event.preventDefault();
        event.clipboardData.setData("text/plain",  modified);
    }
    document.addEventListener("copy", oncopy, true);
    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand("copy");
    console.log("TESTER COMPLETE!");
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

function copySelection(text, html) {
// This function must be called in a visible page, such as a browserAction popup
// or a content script. Calling it in a background page has no effect!
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
