require('dotenv').config({path: '../.env'});
const request = require('request');

let AT = process.env.ACCESS_TOKEN;

const requestToken = (url) => {
    return new Promise((resolve, reject) => {
        // Set API options
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
    
            if (res.statusCode == 200) {
                resolve(res.body.access_token);
            } else {
                reject(res.statusCode);
            }
        });
    });
};

const getTopTwitchGames = (accessToken) => {
    return new Promise ((resolve, reject) => {
        const gameOptions = {
            url: process.env.GET_GAMES,
            method: 'GET',
            headers: {
                'Client-ID': process.env.CLIENT_ID,
                'Authorization': 'Bearer ' + accessToken
            }
        };
        console.log("Calling Twitch Games API.")
        request.get(gameOptions, (err, res, body) => {
            if(err) {
                reject(err);
            } else {
                if (res.statusCode != 200) {
                    console.log('Status: ' + res.statusCode);
                    reject(body);
                }
                console.log('Success');
                resolve(body);
            }
        });
    });
}

// Request Top game data from the Twitch API
exports.getTopGames = async (req, res) => {
    let AT = process.env.ACCESS_TOKEN || '';
    console.log(process.env.GET_TOKEN);
    if (AT === '') {
        console.log("Getting token");
        await requestToken(process.env.GET_TOKEN).then((res) => {
            console.log("In Resolved Promise");
            AT = res;
        }).catch((code)=> {
            console.log("Failed with return code: " + code);
        });
    }

    // Get top games on twitch currently
    await getTopTwitchGames(AT).then( (message) => {
        console.log("In Resolve");
        res.json(message);
    }).catch((message) => {
        console.log("Rejected Promise: " + message);
        res.send("Error: " + message);
    });
}