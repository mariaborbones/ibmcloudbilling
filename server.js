var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    request = require('request'),
    rp = require('request-promise'),
    querystring = require('querystring');


var port = process.env.PORT || 8080;
var bxurl ="";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    var oneof = false;
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if (req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if (oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});


//1. Aunthentication and getting oauth token
app.post("/bx/oauth", function(req, res) {


    bxurl = 'https://api.' + req.body.region + '.bluemix.net';
    var url = bxurl+'/v2/info';
    var authcred = {};
    authcred.name = req.body.username;
    authcred.pass = req.body.password;


    var optionsEndpoint = {
        url: url,
        method: 'GET'
    };



    //Obtención del endpoint de autorización de bluemix
    request.get(optionsEndpoint, function(error, response, body) {
        if (error) {
            console.log(error);
        }
        var bodyJSON = JSON.parse(body);
        console.log(bodyJSON.authorization_endpoint);

        //Recogemos el endpoint necesario para obtener el token
        var oauth_tokenurl = bodyJSON.authorization_endpoint + "/oauth/token";

        //----------- params para el request ---------------
        var form = {
            "username": authcred.name,
            "password": authcred.pass,
            "scope": "",
            "grant_type": "password"
        }
        var formData = querystring.stringify(form);

        //Variables petición Token
        var optionsToken = {
            url: oauth_tokenurl,
            method: 'POST',
            headers: {
                "Accept-Encoding": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic Y2Y6"
            },
            body: formData
        }


        //obtención del token
        request.post(optionsToken, function(error, response, body) {
            if (error) {
                console.log(error);
            }
            var bodyJSON = JSON.parse(body);
            console.log(bodyJSON);
            res.end(body);

        })


    })
});

/******* USUARIOS IBM *******/
/*** Obtencion del token por medio de pascode - usuarios IBM *****/



//auntenticación y obtención del token oauth
app.post("/bx/oauthpasscode", function(req, res) {
    console.log('Entro en get oauth endpoint');

    bxurl = 'https://api.' + req.body.region + '.bluemix.net';
    var url = bxurl+'/v2/info';
    var authcred = {};
    authcred.passcode = req.body.passcode;

    //Variables petición Endpoint
    var optionsEndpoint = {
        url: url,
        method: 'GET'
    };



request.get(optionsEndpoint, function(error, response, body) {
    if (error) {
        console.log(error);
    }
    var bodyJSON = JSON.parse(body);
    console.log(bodyJSON.authorization_endpoint);

    //Recogemos el endpoint necesario para obtener el token
    var oauth_tokenurl = bodyJSON.authorization_endpoint + "/oauth/token";

    //----------- params para el request ---------------
    var form = {
        "passcode": authcred.passcode,
        "scope": "",
        "grant_type": "password"
    }
    var formData = querystring.stringify(form);

    //Variables petición Token
    var optionsToken = {
        url: oauth_tokenurl,
        method: 'POST',
        headers: {
            "Accept-Encoding": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic Y2Y6"
        },
        body: formData
    }


    //obtención del token
    request.post(optionsToken, function(error, response, body) {
        if (error) {
            console.log(error);
        }
        var bodyJSON = JSON.parse(body);
        console.log(bodyJSON);
        res.end(body);

    })


})
});
/*********** END USUARIOS IBM ****************/

app.post("/bx/organizations", function(req, res) {

  var token = req.body.token;

  //Variables petición Token
  var optionsOrg = {
      url: bxurl+'/v2/organizations',
      method: 'GET',
      headers: {
          "Authorization": "bearer "+token
      }
  }


  //obtención del token
  request.get(optionsOrg, function(error, response, body) {
      if (error) {
          console.log(error);

      }
      var bodyJSON = JSON.parse(body);
      console.log(bodyJSON);
      res.end(body);

  })



});

app.post("/bx/services", function(req, res) {

  var token = req.body.token;

  //Variables petición Token
  var optionsOrg = {
      url: bxurl+'/v2/services',
      method: 'GET',
      headers: {
          "Authorization": "bearer "+token
      }
  }


  //obtención del token
  request.get(optionsOrg, function(error, response, body) {
      if (error) {
          console.log(error);
      }
      var bodyJSON = JSON.parse(body);
      console.log(bodyJSON);
      res.end(body);

  })



});

app.post("/bx/billing", function(req, res) {

  var token = req.body.token;
  var region = req.body.region;
  var regionID = req.body.regionID;
  var orgUID = req.body.orgUID;

  var billingurl = "https://rated-usage."+regionID+".bluemix.net/v2/metering/organizations/"+region+":"+orgUID+"/usage/2017-07";

  //Variables petición Token
  var optionsOrg = {
      url: billingurl,
      method: 'GET',
      headers: {
          "Authorization": "bearer "+token
      }
  }


  //obtención del token
  rp.get(optionsOrg).then(function (body){

    var bodyJSON = JSON.parse(body);
    console.log(bodyJSON);
    res.end(body);


  }).catch(function(err){

    console.log("ERROR" + err);
    res.status(500)
    res.send( {error: err });

  });



});

app.post("/bx/billingtest", function(req, res) {

  var token = req.body.token;
  var region = req.body.region;
  var regionID = req.body.regionID;
  var orgUID = req.body.orgUID;
  var year = req.body.year;
  var month = req.body.month;

  var billingurl = "https://rated-usage."+regionID+".bluemix.net/v2/metering/organizations/"+region+":"+orgUID+"/usage/"+year+"-"+month;

  //Variables petición Token
  var optionsOrg = {
      url: billingurl,
      method: 'GET',
      headers: {
          "Authorization": "bearer "+token
      }
  }


  //obtención del billing
  rp.get(optionsOrg).then(function (body){

    var bodyJSON = JSON.parse(body);
    console.log(JSON.stringify(bodyJSON));

    res.end(body);



  }).catch(function(err){

    console.log("ERROR" + err);
    res.status(500)
    res.send( {error: (err) });

  });






});


app.post("/bx/spaces", function(req, res) {

  var token = req.body.token;
  var spaceID = req.body.spaceID;

  //Variables petición Token
  var optionsOrg = {
      url: bxurl+'/v2/spaces/'+spaceID,
      method: 'GET',
      headers: {
          "Authorization": "bearer "+token
      }
  }


  //obtención del token
  request.get(optionsOrg, function(error, response, body) {
      if (error) {
          console.log(error);
      }
      var bodyJSON = JSON.parse(body);
      console.log(bodyJSON);
      res.end(body);

  })



});








app.listen(port);
console.log("Listening on port ", port);
