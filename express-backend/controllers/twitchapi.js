const result = require('dotenv').config();
const request = require('request');

let AT = '';

const requestToken = (url, callback) => {

    const options = {
        url: process.env.GET_TOKEN,
        json:true,
        body:{
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'client_credentials'
        }
    };

    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log('Status: ' + res.statusCode);
        console.log(body);

        callback(res);
    });
};

const setNewToken = () => {
    console.log("URL: " + process.env.GET_TOKEN);
    requestToken(process.env.GET_TOKEN, (res) => {
        AT = res.body.access_token;
    });
};

const getToken = () => {
    console.log("Access Token: " + AT);
}

const getTopGames = (url, accessToken, callback) => {
    const gameOptions = {
        url: url,
        method: 'GET',
        headers: {
            'client-ID': process.env.CLIENT_ID,
            'Authorization': 'Bearer ' + accessToken
        }
    };

    request.get(gameOptions, (err, res, body) => {
        if(err) {
            console.log(err);
        }
        console.log('Status: ' + res.statusCode);
        console.log(JSON.parse(body));
    });
}