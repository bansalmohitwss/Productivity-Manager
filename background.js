var prev_tag=1,cur_tag;

function updateData(){                     
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
    
    last=cur;
    prev_tag=cur_tag;

    chrome.storage.sync.set(
        {
            "hour_t":hour_t,
            "hour_p":hour_p,
            "day_p":day_p,
            "day_t":day_t,
            "month_p":month_p,
            "month_t":month_t
        }
    );
}

function afterGetURL(){
  console.log('after getCureent url')
    this.getCurrentTime();
    console.log(htmlPage);
    if(htmlPage===null||htmlPage==="")return;
    //if(found_inURLhash)else
    //cur_tag=findTag(htmlPage)
        
    
    //console.log("check Status : "+checkStatus());
    //else end here
    cur_tag = findTag(htmlPage);
    console.log("check Status : "+cur_tag);
    cur=d.getMinutes();
    
    
    if(cur_tag == -1 && !(htmlPage in productive_site_list) && !(htmlPage in unproductive_site_list)){
      var x;
      while(1){
        x = prompt('Not able to predict category of webpage.\nEnter category for this webpage.\n1.Productive\n2.Non-Productive');
        if(x==1 || x==2)
        break;
      }
      
      if(x==1){
        productive_site_list.push(htmlPage);
        console.log(productive_site_list);
        cur_tag=1;
      }else{
        unproductive_site_list.push(htmlPage);
        console.log(unproductive_site_list);
        cur_tag=0;
      }

      chrome.storage.sync.set({
        "productive_site_list": productive_site_list,
        "unproductive_site_list": unproductive_site_list
      });

    }
    

    if(cur_tag==0)
      chrome.browserAction.setIcon({
        path : "images/cp_icon.png"
    });
      else
      chrome.browserAction.setIcon({
        path : "images/p_icon-19.png"
    });
      //console.log(cur_hdm[0]+'day'+cur_hdm[1]+'month'+cur_hdm[2]);
    
    //console.log(d.getTime())
    updateData();
}

chrome.tabs.onActivated.addListener(function(activeInfo) 
{
  //console.log(document.documentElement.innerHTML)
  chrome.tabs.get(activeInfo.tabId, function (tab){
    console.log("before return of chrome.tabs");
    if(tab.url==null){htmlPage=null;return;}
    console.log(tab+"in chrome.tabs.query");
    htmlPage=tab.url;
    console.log(tab.url);
    this.afterGetURL();
  });
  


});
