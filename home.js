var ctx = document.getElementById('canvas').getContext('2d');
var x = [1,2,3,4,5,6];
var y = [1,2,3,4,5,6];

// var hour_p, hour_t, day_p, day_t, month_p, month_t;

// chrome.storage.sync.get(['hour_t','hour_p','day_t','day_p','month_p','month_t'],function(data)
//         {
//             hour_p=data.hour_p;
//             hour_t=data.hour_t;
//             day_p=data.day_p;
//             day_t=data.day_t;
//             month_p=data.month_p;
//             month_t=data.month_t;
//         }
//     );

//document.getElementById('cp').innerHTML = "Overall Productivity : ";// + day_p[day_p.length-1]/day_t[day_t.length-1]*100;

window.onload = function hours(){
    //x = [];
    //y = [];
    //for(var i=0;i<this.hour_t.length;i++){
       // this.x.push(i+1);
     //   this.y.push(this.hour_p[i]/this.hour_t[i]*100);
    //}
    if(window.chart)
    window.chart.destroy();
    draw(x,y,'Hours');
};

document.getElementById("hour").addEventListener("click", function(){
    x = [1,2,3,4,5,6];
    y = [1,2,3,4,5,6];
    //for(var i=0;i<this.hour_t.length;i++){
      // this.x.push(i+1);
       //this.y.push(this.hour_p[i]/this.hour_t[i]*100);
    //}
    if(window.chart)
    window.chart.destroy();
    draw(x,y,'Hours');
});
document.getElementById("day").addEventListener("click", function(){
    x = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    y = [20,100,204,30,45,50,61,50];
    // x = [];
    // y = [];
    // for(var i=0;i<this.day_t.length;i++){
    //    this.x.push(i+1);
    //    this.y.push(this.day_p[i]/this.day_t[i]*100);
    // }
    if(window.chart)
    window.chart.destroy();
    draw(x,y,'Days');
});
document.getElementById("month").addEventListener("click", function(){
    x = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'];
    y = [1000, 2000, 2500, 1200, 1600, 1900, 1200, 1240, 670, 700, 800, 900 ];
    // x = [];
    // y = [];
    // for(var i=0;i<this.month_t.length;i++){
    //    this.x.push(i+1);
    //    this.y.push(this.month_p[i]/this.month_t[i]*100);
    // }
    if(window.chart)
    window.chart.destroy();
    draw(x,y,'Months');
});
function draw(x,y,tr){
    window.chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: x,
            datasets: [{
                label: 'My First dataset',
                
                backgroundColor: 'rgb(00, 00, 55)',
                borderColor: 'rgb(0,0,0)',
                data: y
            }],
            //xAxisID: 'Days'
        },

        // Configuration options go here
        options: {
            responsive:true,

            scales : {
                xAxes: [{
                        display : true,
                        scaleLabel : {
                        display:true,
                        labelString : tr
                        },
                }],
                yAxes: [{
                        display : true,
                        scaleLabel : {
                        display:true,
                        labelString : 'Productivity'
                        },
                }]
            },

        }
});
}