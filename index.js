
'use strict';


var express=require('express');
var bodyParser = require('body-parser');



var readline = require('readline');  // Ill use this for reading from console window

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var calendar=google.calendar('v3');

var REDIRECT_URL='http://localhost';
var CLIENT_ID = '329941363904-omeq5bktiollrrdlckb1umh4tidkhga6.apps.googleusercontent.com';
var CLIENT_SECRET='1gsXS_5O-ugt5TKlKEjFTy27';


 var moment = require('moment');
 moment().format();



var app=express();

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(9600,function(){

console.log('express server running on 9600');

});



var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

console.log('Please visit the following url and get your token');

console.log(url);


let code="insert code tht users gets from google here";

rl.question('enter code here',(code1)=>{

code=code1;

oauth2Client.getToken(code, (err, tokens)=> {
  // Now tokens contains an access_token and an optional refresh_token. Save them.
  if(!err) {
    oauth2Client.setCredentials(tokens);

      //now safe to call calendar api :)








app.get('/events',function(req,res){


if(!req.query.startdate){


console.log('no start date specified');


console.log('api endpoint to get all events');


calendar.events.list({userId: 'me', auth: oauth2Client,calendarId:"primary"},(err,result)=>{

if(err) {
    console.log(err);
res.send(err);
}



if(result.items.length===0){
    console.log('no event exist');
    res.send('there is no event');
}


// console.log(result.items);
res.send(result);
});




}


else if (req.query.startdate) {

  console.log(req.body);


  
// console.log('now returns events in this specific range');

console.log('req startdate' + req.query.startdate);
console.log('req enddate ' + req.query.enddate);

let startdate= new Date(req.query.startdate);
let startdate_iniso=startdate.toISOString();
let startdate_moment= moment(startdate_iniso);


let enddate= new Date(req.query.enddate);

let enddate_iniso=enddate.toISOString();

let enddate_moment = moment(enddate_iniso);



console.log('start date in iso format is :');
console.log(startdate_iniso);


console.log('end date in iso format is :');
console.log(enddate_iniso);

calendar.events.list({userId:'me',auth:oauth2Client,calendarId:"primary",timeMax:enddate_iniso},(err,results)=>{

if(err){

  console.log(err);

}

else {

  console.log('events that start max by a specific date');
// console.log(results);




  var  newresults =  results.items.filter((item)=>{


    console.log('ending constraint for events is ' + enddate_moment.format());
    console.log('event actual end time : ' +  moment(item.end.dateTime).format());

    
    console.log('starting constraint for events is ' +startdate_moment.format());

    console.log('event actual starting time is' + moment(item.start.dateTime).format());


//
    
    


if  (moment(item.end.dateTime).isSameOrBefore(enddate_moment) && moment(item.start.dateTime).isSameOrAfter(startdate_moment)){

  return true;

}

}); 


var newresult_pretty = newresults.map((item)=>{

  return {
    description:item.description,
    summary:item.summary,
    start:item.start.dateTime,
    end:item.end.dateTime
  }
});

 console.log(newresult_pretty);
 console.log('count :' + newresult_pretty.length);

res.send(newresult_pretty);


}


}); 







}  




})

 }

  else{
      console.log(err);
  }

});

});



   



      






