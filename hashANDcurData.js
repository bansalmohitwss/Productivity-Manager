urlHash = {}         //urlHAsh
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //
    urlHash[request.url]  //findTag(request.url)

});

//chrome.browserAction.onClicked.addListener(function (tab) {
//  chrome.tabs.create({url: 'tab_popup.html'})
//});

