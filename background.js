window.urlHash = {}         //urlHAsh
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  window.urlHash[request.url] = request.count
});

//chrome.browserAction.onClicked.addListener(function (tab) {
//  chrome.tabs.create({url: 'tab_popup.html'})
//});
var cur_hdm=[],last_hdm=[],hour_p=[],hour_t=[],day_p=[],day_t=[],month_p=[],month_t=[],productive_categories=[];
var d=new Date();
var last=d.getMinutes();
last_hdm[0]=d.getHours();last_hdm[1]=d.getDate();last_hdm[2]=d.getMonth();
function getCurrentTime(){
    cur_hdm[0]=d.getHours();cur_hdm[1]=d.getDate();cur_hdm[2]=d.getMonth()+1;
    chrome.storage.sync.get(['last_time','hour_t','hour_p','day_t','day_p','month_p','month_t','poductive_categories'],function(data)
        {
            last_hdm=data.last_time;
            hour_p=data.hour_p;
            hour_t=data.hour_t;
            day_p=data.day_p;
            day_t=data.day_t;
            month_p=data.month_p;
            month_t=data.month_t;
            productive_categories=data.poductive_categories;
        }
    );
    chrome.storage.sync.set({"last_time":cur_hdm});
    
}



var request = new XMLHttpRequest();
request.open('Get','https://uclassify.com/browse/uClassify/Topics/ClassifyUrl/?readKey=Gww5dOtcNIYq',true);
request.onload = function(){
    console.log(request.responseText);
    // Tag extractor function should be called here.
};
