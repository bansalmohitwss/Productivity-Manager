var slider,output;
var productive_categories,notification_threshold,productive_site_list,unproductive_site_list;

function getStorageElements()
{
    console.log("ran");
    chrome.storage.sync.get(["poductive_categories","notification_threshold","productive_site_list","unproductive_site_list"], function (data)
        {
            if(data.productive_site_list==undefined)
            {
                chrome.storage.sync.set(
                    {
                        "poductive_categories" : [],
                        "notification_threshold": 50,
                        "productive_site_list" : [],
                        "unproductive_site_list" : [],
                        "last_time":[-1,-1,-1],
                        "hour_t":[0],
                        "hour_p":[0],
                        "day_p":[0],
                        "day_t":[0],
                        "month_p":[0],
                        "month_t":[0]
                    }
                );
                productive_categories = [];
                notification_threshold= 50;
                productive_site_list  = [];
                unproductive_site_list = [];
                this.displayElements();
                return;
            }
            console.log("ran2");
            productive_categories =data.poductive_categories;
            notification_threshold= data.notification_threshold;
            productive_site_list  = data.productive_site_list;
            unproductive_site_list = data.unproductive_site_list;
            console.log(productive_categories);
            this.displayElements();
        }
    );
}

function addToTable(table,text)
{
    var node = document.createElement("LI");                 // Create a <li> node
    node.setAttribute("id",text);
    var textnode = document.createTextNode(text);         // Create a text node
    node.appendChild(textnode);
    table.appendChild(node);
}

function displayElements()
{
    
    productive_site_list.forEach(
        function (site)
        {
            addToTable(table,site);
        }
    );
    unproductive_site_list.forEach(
        function (site)
        {
            addToTable(untable,site);
        }
    );

    productive_categories.forEach(function(id){
        document.getElementById(id).checked = true;
        console.log(id);
    });
    slider.value = notification_threshold;
    output.innerHTML = "Value : " + slider.value;
}


function validate(url)
{
    return true;
};

window.onload = function()
{
    
    
    slider = document.getElementById("myRange");
    output = document.getElementById("f");
    output.innerHTML = slider.value; // Display the default slider value
    productiveTextbox = this.document.getElementById("productive-textbox");
    productiveAddButton = this.document.getElementById("productive-add-button");
    productiveRemoveButton = this.document.getElementById("productive-add-remove");
    table = this.document.getElementById("productive-table");
    unproductiveTextbox = this.document.getElementById("unproductive-textbox");
    unproductiveAddButton = this.document.getElementById("unproductive-add-button");
    unproductiveRemoveButton = this.document.getElementById("unproductive-add-remove");
    untable = this.document.getElementById("unproductive-table");
    submit_button = document.getElementById("submit");
    reset_button = document.getElementById("reset");
    erase_button = document.getElementById("erase");

    slider.oninput = function() {
      output.innerHTML = "Value : " + this.value;
      notification_threshold = this.value;
    };
    this.getStorageElements();
    productiveAddButton.onclick = function()
    {
        var site = productiveTextbox.value;
        productiveTextbox.value = "";
        if(validate(site))
        {
            addToTable(table,site);
            productive_site_list.push(site);
            console.log(productive_site_list);
        }
    };
    productiveRemoveButton.onclick = function()
    {
        var site = productiveTextbox.value;
        productiveTextbox.value = "";
        if(validate(site))
        {
            var node = document.getElementById(site);                 // Create a <li> node
            table.removeChild(node);
            indx = productive_site_list.indexOf(site);
            if(indx!=-1)
            {
                productive_site_list.splice(indx,1);
            }
            console.log(productive_site_list);
        }
    };
   
    
    unproductiveAddButton.onclick = function()
    {
        var site = unproductiveTextbox.value;
        unproductiveTextbox.value = "";
        if(validate(site))
        {
            addToTable(untable,site);
            unproductive_site_list.push(site);
            console.log(unproductive_site_list);
        }
    };
    unproductiveRemoveButton.onclick = function()
    {
        var site = unproductiveTextbox.value;
        unproductiveTextbox.value = "";
        if(validate(site))
        {
            var node = document.getElementById(site);                 // Create a <li> node
            untable.removeChild(node);
        }
        indx = unproductive_site_list.indexOf(site);
        if(indx!=-1)
        {
            unproductive_site_list.splice(indx,1);
        }
        console.log(unproductive_site_list);
    };
    submit_button.onclick =function()
    {
        console.log("saving...");
        arr = ["Arts","Business","Computers","Health","Science","Sports"];
        productive_categories = [];
        arr.forEach(
            function (id)
            {
                if(document.getElementById(id).checked)
                {
                    productive_categories.push(id);
                    console.log("Adding "+id);
                }
                
            }
        );
        chrome.storage.sync.set({
            "poductive_categories" : productive_categories,
            "notification_threshold": notification_threshold,
            "productive_site_list" : productive_site_list,
            "unproductive_site_list" : unproductive_site_list,
            'setup_done' : true,
        });
        window.location.reload();
    };
    reset_button.onclick = function()
    {
        console.log("Resetting...")
        window.location.reload();
    };
    erase_button.onclick = function()
    {
        console.log("erasing all data");
        chrome.storage.sync.clear();
        chrome.storage.local.clear();
        window.location.reload();
    }
} ;

// Update the current slider value (each time you drag the slider handle)
