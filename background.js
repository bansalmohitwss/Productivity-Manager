var prev_tag=1,cur_tag;

<<<<<<< HEAD
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
=======
>>>>>>> c1c9371f3a647d83b3bf083f785d8ce0517d16a9

chrome.windows.onFocusChanged.addListener(function() 
{
  //console.log(document.documentElement.innerHTML)
  chrome.tabs.query({currentWindow:true, active: true}, function(tabs){
    console.log("before return of chrome.tabs");
    if(tabs[0]==null){htmlPage=null;return;}
    console.log(tabs[0]+"in chrome.tabs.query");
    htmlPage=tabs[0].url;
    console.log(tabs[0].url);
    window.urlHash[tabs[0].url] = d.getTime();
    this.getCurrentTime();
    //console.log(cur_hdm[0]+'day'+cur_hdm[1]+'month'+cur_hdm[2]);
    
    //console.log(d.getTime())
  });
  console.log(htmlPage);
  if(htmlPage===null||htmlPage==="")return;
  //if(found_inURLhash)else
  var request = new XMLHttpRequest();
  console.log(htmlPage);
  request.open('GET',htmlPage,true);
  request.onload = function(){
      htmlPage = request.responseText;
      
      //console.log(htmlPage);
      htmlPage = search(htmlPage);
      //console.log(htmlPage);
      
     if(htmlPage.length>50)
      {
          var request2 = new XMLHttpRequest();
           request2.open('GET','https://api.uclassify.com/v1/uClassify/Topics/classify/?readKey=dWoGfPmtw20A&url=https://www.youtube.com/watch?v=jqp0lqrfQwQ',true);
           request2.onload = function(){
           var responseObject = JSON.parse(request2.responseText);
           console.log(responseObject);
           };
           request2.send();
           cur_tag=checkStatus();
      }
      else
      {
          // if number of tokens are less than 50 what to do
        console.log("less than 50");
      }
      
      //console.log(htmlPage);
  };
  request.send();
  //else end here
  cur=d.getMinutes();
  var ht=hour_t.pop(),hp=hour_p.pop(),dt=day_t.pop(),dp=day_p.pop(),mt=month_t.pop(),mp=month_p.pop();
  if(last_hdm[2]!=cur_hdm[2]){                  //diff month
    mt+=(60-last);
    month_t.push(mt);
    if(prev_tag==1){
        mt+=(60-last);
    }
    month_t.push(mp);
    if(month_t.length<=12){            //for last 12 days
        month_t.shift();
        month_p.shift();
    }
    month_t.push(cur);
    month_p.push(0);
    if(prev_tag==1){
        month_p[11]=cur;
    }
  }
  else{                                         //same month
    if(cur-last>=0)
    mt+=(-last+cur);
    else{
        mt+=cur-last+60;
    }
    month_t.push(mt);
    if(prev_tag==1){
        mp+=(cur-last);
    }
    month_p.push(mp);               

  }
  if(last_hdm[1]!=cur_hdm[1]){                  //diff day
    dt+=(60-last);
    day_t.push(dt);
    if(prev_tag==1){
        dp+=(60-last);
    }
    day_t.push(dp);
    if(day_t.length<=7){            //for last 7 days
        day_t.shift();
        day_p.shift();
    }
    day_t.push(cur);
    day_p.push(0);
    if(prev_tag==1){
        day_p[6]=cur;
    }
  }
  else{                                         //same day
    
    if(cur-last>=0)
    dt+=(-last+cur);
    else{
        dt+=cur-last+60;
    }
    day_t.push(dt);
    if(prev_tag==1){
        dp+=(cur-last);
    }
    day_p.push(hp);
  }
  if(last_hdm[0]!=cur_hdm[0]){                  //diff hour
    ht+=(-last+59);
    hour_t.push(ht);
    if(prev_tag==1){
        hp+=(60-last);
    }
    hour_p.push(hp);
    if(hour_t.length<=12){
        hour_t.shift();
        hour_p.shift();
    }
    hour_t.push(cur);
    hour_p.push(0);
    if(prev_tag==1){
        hour_p[11]=cur;
    }
  }
  else{                                         //same hour
    ht+=(-last+cur);
    hour_t.push(ht);
    if(prev_tag==1){
        hp+=(cur-last);
    }
    hour_p.push(hp);
  }
    if(last[0]==cur[0]&&last[1]==cur[1]&&last[2]==cur[2]){
        
        ht+=(-last+cur);
        hour_t.push(ht);
        dt+=(-last+cur);
        day_t.push(dt);
        mt+=(-last+cur);
        month_t.push(mt);
        if(prev_tag==1){
            hp+=(cur-last);
            dp+=(cur-last);
            mp+=(cur-last);
        }
        hour_p.push(hp);
        day_p.push(hp);
        month_p.push(hp);
    }
    else if(last[0]!=cur[0]&&last[1]==cur[1]&&last[2]==cur[2]){
        var ht=hour_t.pop(),hp=hour_p.pop(),dt=day_t.pop(),dp=day_p.pop(),mt=month_t.pop(),mp=month_p.pop();
        ht+=(-last+59);
        hour_t.push(ht);
        dt+=(-last+59);
        day_t.push(dt);
        mt+=(-last+59);
        month_t.push(mt);

        for(var i=last[0]+1;i<cur[0];i++){
            if(ht.length>=12){
                ht.shift();
                hp.shift();
            }
            ht.push(60);
            hp.push(0);
        }
        if(ht.length>=12){
            ht.shift();
            hp.shift();
        }
        ht.push(cur);
        hp.push(0);
        if(prev_tag==1){
            
            dp+=(cur-last)*1000/60;
            mp+=(cur-last)*1000/60;
        }
        
        day_p.push(hp);
        month_p.push(hp);
    }
    last=cur;
    prev_tag=cur_tag;
});
