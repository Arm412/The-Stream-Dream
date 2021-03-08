require('dotenv').config({path: '../.env'});
const request = require('request');
const querystring = require('querystring');

// Redirect user to the Twitch User Authorization endpoint page
exports.authorizeLogin = async (req, res) => {
  console.log("Login with Twitch");
  const query = querystring.stringify({
    'client_id': process.env.CLIENT_ID,
    'response_type': 'code',
    'redirect_uri': process.env.REDIRECT_URI,
    'scope': 'user:read:email'
  });
  res.redirect(process.env.AUTHORIZE_USER_ENDPOINT + '?' + query);
}
