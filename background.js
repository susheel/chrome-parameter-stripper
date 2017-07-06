var utm_re = new RegExp('([\?\&]utm_(source|medium|term|campaign|content|cid|reader)=[^&#]+)', 'ig');
var other_re = new RegExp('([\?\&](imm_mid|cmp)=[^&#]+)', 'ig');

function strip_url(url) {
    var queryStringIndex = url.indexOf('?');
    var queryString = url.substr(queryStringIndex);

    var stripped = queryString.replace(utm_re, '');
    var stripped = stripped.replace(other_re, '');

    if (stripped[0] === '&') {
        stripped = '?' + stripped.substr(1);
    }
    strippedURL = url.substr(0, queryStringIndex) + stripped;

    return strippedURL;
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var url = details.url;

    stripped = strip_url(url);

    if (stripped != url) {
        return {redirectUrl: stripped};
    }
},
{urls: ['https://*/*?*', 'http://*/*?*'], types: ['main_frame']}, ['blocking']);
