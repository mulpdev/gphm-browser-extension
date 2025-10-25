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

function extractOnlyElementText(ele) {
    // Because textContent processes all printable child nodes...
    eletext = null;
    for (const child of ele.childNodes) {
        //console.log(child.textContent.trim())
        if (child.nodeType == Node.TEXT_NODE) {
            //console.log(child.textContent.trim())
            eletext = child.textContent;
            break;
        }
    } 
    return eletext;
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

export { clickAndGetElement, clickDropdownByOptionIndex, clickDropdownByOptionValue, downloadJson, extractOnlyElementText, pullGPHMColorFromClassName, tableToArray, trToArray, UrlToDOM, heightToMetric, weightToMetric};
