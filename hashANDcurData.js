urlHash = {}         //urlHAsh

function findTag(url)
{
    console.log("url hash : ",urlHash);
    if(url in productive_site_list)
        return 1;
    if(url in unproductive_site_list)
        return 0;
    if(url in urlHash)
        return urlHash[url];
    htmlPage = url;
    apiRequest(htmlPage);
    var status = checkStatus();
    if(status==-1)
        return -1;
    urlHash[url] = status;
    return status;
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //
    //urlHash[request.url]  //findTag(request.url)

});

//chrome.browserAction.onClicked.addListener(function (tab) {
//  chrome.tabs.create({url: 'tab_popup.html'})
//});

