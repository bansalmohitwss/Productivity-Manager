var responseObject;

function extractObjectFromXMLString(string)
{
    ///console.log("Object Extractor Ran ");
    var obj = {};
    var find = "className=";
    var curr = 0;
    for(var i = 0; i < string.length; i++)
    {
       // console.log(i,string[i]);
        if(string[i]==find[curr])
        {
            curr++;
        }
        else
        {
            curr = 0;
            continue;
        }
        //console.log(curr);
        if(curr == find.length)
        {
            var key = "";
            var j = i + 1;
            j++;
            while(string[j]!='"')
            {
                key += string[j++];
            }
            j+=5;
            var value = "";
            
            while(string[j]!='"')
            {
                value += string[j++];
            }
            obj[key] = value;
            //console.log(key + " : " + value);
            curr = 0;
            continue;
        }

    }
    find = "statusCode";
    var curr = 0;
    for(var i = 0; i < string.length; i++)
    {
        //console.log(i,string[i]);
        if(string[i]==find[curr])
        {
            curr++;
        }
        else
        {
            curr = 0;
            continue;
        }
        //console.log(curr);
        if(curr == find.length)
        {
            var key = "";
            var j = i + 3;
            
            while(string[j]!='"')
            {
                key += string[j++];
            }
            //console.log(key);
            if(key!='2000')
            {
                responseObject = undefined;
                return;
            }
        }

    }
    responseObject = obj;
    //console.log(responseObject);
}