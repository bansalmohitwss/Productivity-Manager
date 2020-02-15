chrome.storage.sync.get(['setup_done'],
    function(data)
    {
        if(data.setup_done==undefined||data.setup_done==false)
        {
            window.open("setting.html","_blank");
        }
        console.log(data);
    }
);
console.log("popup")
$(document).ready(function(){
    console.log("check1")
    $('#home').click(function(){
        console.log("home clicked");
            
        //chrome.tabs.create({url: 'home.html'});
            
    
    });
    $('#setting').click(function(){
        chrome.tabs.create({url: 'setting.html'});
            
    });
  });

  window.onload = function()
  {

  };
 
