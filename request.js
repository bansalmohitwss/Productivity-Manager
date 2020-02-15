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
      request2.open('GET','https://uclassify.com/browse/uClassify/Topics/ClassifyU'+'rl/?readKey=Gww5dOtcNIYq&url='+htmlPage,false);
      request2.onload = function(){
        extractObjectFromXMLString(request2.responseText);
         
      };

       request2.send();
       //cur_tag=checkStatus();
    };
    request.send();
    return 0;
}
// return -1
function checkStatus()
{
    if(responseObject === undefined)
    return -1;
    var tot=0;
    var i;

    for(i=0;i<poductive.length;i++)
    {
        
    }
}