var cur_hdm=[],last_hdm=[],hour_p=[],hour_t=[],day_p=[],day_t=[],month_p=[],month_t=[],productive_categories=[],productive_site_list=[],unproductive_site_list=[];
var d=new Date();
var last=d.getMinutes();
last_hdm[0]=d.getHours();last_hdm[1]=d.getDate();last_hdm[2]=d.getMonth();
function getCurrentTime(){
    cur_hdm[0]=d.getHours();cur_hdm[1]=d.getDate();cur_hdm[2]=d.getMonth()+1;
    chrome.storage.sync.get(['last_time','hour_t','hour_p','day_t','day_p','month_p','month_t','productive_site_list','unproductive_site_list'],function(data)
        {
            last_hdm=data.last_time;
            hour_p=data.hour_p;
            hour_t=data.hour_t;
            day_p=data.day_p;
            day_t=data.day_t;
            month_p=data.month_p;
            month_t=data.month_t;
            productive_site_list = data.productive_site_list;
            unproductive_site_list = data.unproductive_site_list;
        }
    );
    chrome.storage.sync.set({"last_time":cur_hdm});
    
}

chrome.storage.sync.get(['poductive_categories'], function(data)
    {

        productive_categories=data.poductive_categories;
    }
);
//Receive from url get
var htmlPage='';
// Response from api (object)
//var responseObject;

function search(str)
{
     var arr=str.split('');
     //console.log(arr);
     var ans='';
    for(var i=0;i<str.length;i++)
    {
        if(arr[i]==='<' && arr[i+1]==='p' && arr[i+2]==='>')
        {
            i = i+3;
            while(i<str.length)
            {
                if(arr[i]==='<' && arr[i+1]==='/' && arr[i+2]==='p' && arr[i+3]==='>')
                break;
                else if(arr[i]==='<')
                {
                    while(i<str.length)
                    {
                        if(arr[i]==='<' && arr[i+1]==='/')
                        {
                            while(i<str.length)
                            {
                                if(arr[i]==='>')
                                break;
                                i++;
                            }
                            i++;
                            break;
                        }
                        i++;
                    }
                    continue;
                }
                ans = ans + arr[i];
                //console.log(ans);
                i++;
            }
            ans=ans+' ';
            i=i+3;
        }
        else if(arr[i]==='<'&&arr[i+1]==='t'&&arr[i+2]==='i'&&arr[i+3]==='t'&&arr[i+4]==='l'&&arr[i+5]==='e'&&arr[i+6]==='>')
        {
            i = i+7;
            while(i<str.length)
            {
                if(arr[i]==='<'&&arr[i+1]==='/'&&arr[i+2]==='t'&&arr[i+3]==='i'&&arr[i+4]==='t'&&arr[i+5]==='l'&&arr[i+6]==='e'&&arr[i+7]==='>')
                break;
                else if(arr[i]==='<')
                {
                    while(i<str.length)
                    {
                        if(arr[i]==='<' && arr[i+1]==='/')
                        {
                            while(i<str.length)
                            {
                                if(arr[i]==='>')
                                break;
                                i++;
                            }
                            i++;
                            break;
                        }
                        i++;
                    }
                    continue;
                }
                ans = ans + arr[i];
                //console.log(ans);
                i++;
            }
            ans=ans+' ';
            i=i+7;
        }
        str='';
    }
    return arr.join('');
}

//console.log(search('<title>Hello<a>sdkjf</a> Brother</title>'));

function removeAllHtmlTag(str)
{
    var regex = /(<([^>]+)>)/ig; 
    return str.replace(regex, ""); 
}

function removeSpace(str)
{
    var z = str.replace(/\s\s+/g, ' ');
    return z;
}


function apiRequest(htmlPage)
{
    console.log('Inside Api Request Method : '+htmlPage);
    var request = new XMLHttpRequest();
    request.open('GET',htmlPage,false);
    request.onload = function(){
      var modifiedResponse = search(request.responseText);

      var request2 = new XMLHttpRequest();
      request2.open('GET','https://uclassify.com/browse/uClassify/Topics/ClassifyU'+'rl/?readKey=dWoGfPmtw20A&url='+htmlPage,false);
      request2.onload = function(){
        extractObjectFromXMLString(request2.responseText);
         
      };

       request2.send();
       //cur_tag=checkStatus();
    };
    request.send();
    return 0;
}


/*
  1 for productive
  0 for non productive 
  -1 ask user
*/


function checkStatus()
{
    if(responseObject === undefined)
    return -1;
    var tot=0;
    var i;
    console.log(productive_categories);
    console.log(responseObject);
    //console.log('productive_cate : '+productive_categories);


    for(i=0;i<productive_categories.length;i++)
    {
        if(productive_categories[i] in responseObject){
            console.log(productive_categories[i],responseObject[productive_categories[i]]);
            tot += Number(responseObject[productive_categories[i]]);
        }
    }
    
    console.log("tot: "+tot)
    if(tot>=0.55)
    return 1;
    if(tot<0.45)
    return 0;
    return -1;
}


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  