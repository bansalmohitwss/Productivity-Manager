

function setUpAlarms()
{
    chrome.alarms.clearAll();
    chrome.alarms.create("Productivity Check",{
        "delayInMinutes" : 1,
        "periodInMinutes" : 1
    });
    chrome.alarms.create("PeriodicProductivityCalculation",{
        "delayInMinutes" : 1,
        "periodInMinutes" : 1
    });
}


function handle(alarms)
{
    console.log("alarm handler");
    console.log(alarms);
    if(alarms.name=="Productivity Check")
    {
        console.log("Productivity Alarm happened");
        var day_p,notification_threshold,day_t;
        chrome.storage.sync.get(['day_p',"notification_threshold","day_t"],function(data)
        {
           day_p = data.day_p;
           day_t = data.day_t;
           notification_threshold = data.notification_threshold;
        });
        productivity = day_p/day_t;
        if(productivity<notification_threshold)
        {
            window.alert("Low Productivity : " + day_p);
        }
    }
    if(alarms.name=="PeriodicProductivityCalculation")
    {
        chrome.tabs.query({currentWindow:true, active: true}, function(tabs){
            console.log("before return of chrome.tabs");
            console.log(tabs);
            if(tabs[0]==null){htmlPage=null;return;}
            console.log(tabs[0]+"in chrome.tabs.query");
            htmlPage=tabs[0].url;
            console.log(tabs[0].url);
            this.afterGetURL();
            //console.log(cur_hdm[0]+'day'+cur_hdm[1]+'month'+cur_hdm[2]);
            
            //console.log(d.getTime())
          });
        // chrome.tabs.get(activeInfo.tabId, function (tab){
        //     console.log("before return of chrome.tabs");
        //     if(tab.url==null){htmlPage=null;return;}
        //     console.log(tab+"in chrome.tabs.query");
        //     htmlPage=tab.url;
        //     console.log(tab.url);
        //     this.afterGetURL();
        // });

    }
};


chrome.alarms.onAlarm.addListener(handle);
setUpAlarms();
chrome.alarms.getAll(
    function (data)
    {
        console.log(data);
    }
);

