
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
// moment().format();



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



app.get('/events/date/:startdate/:enddate',function(req,res){


//  call calendar.events.list api with start and end date params



});




app.get('/events',function(req,res){


if(!req.query.startdate){


console.log('no start date specified');



}


else{

  console.log(req.body);


  
// console.log('now returns events in this specific range');

console.log('req startdate' + req.query.startdate);
console.log('req enddate ' + req.query.enddate);




}



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


})







   



   
  }

  else{
      console.log(err);
  }

});

});



   



      






