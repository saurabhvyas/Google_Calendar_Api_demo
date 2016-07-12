
'use strict';


var express=require('express');


var readline = require('readline');  // Ill use this for reading from console window

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var calendar=google.calendar('v3');

var REDIRECT_URL='http://localhost';
var CLIENT_ID = '329941363904-omeq5bktiollrrdlckb1umh4tidkhga6.apps.googleusercontent.com';
var CLIENT_SECRET='1gsXS_5O-ugt5TKlKEjFTy27';




var app=express();

app.listen(9600,function(){

console.log('express server running on 9600');

});

app.get('/events',function(req,res){

console.log('api endpoint to get all events');





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



   
  }

  else{
      console.log(err);
  }

});



   calendar.events.list({userId: 'me', auth: oauth2Client,calendarId:"primary"},(err,res)=>{

if(err) {

    console.log(err);

}


else{

console.log(res.items);

}





      });






