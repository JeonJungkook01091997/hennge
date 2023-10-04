const axios = require('axios');
const base64 = require('base-64');
const utf8 = require('utf8');

const { totp } = require('otplib');


const reqJSON = 
{
    github_url: "https://gist.github.com/JeonJungkook01091997/a2dfbe0c5384741de7b44e2275fd98c6",
    contact_email: "jyotsanariti@gmail.com", 
    solution_language: "python"
}
const stringData = JSON.stringify(reqJSON);

const URL = "https://api.challenge.hennge.com/challenges/003";
const sharedSecret = reqJSON.contact_email + "HENNGECHALLENGE003";


totp.options = { digits: 10, algorithm: "sha512", epoch:0 }

const myTotp = totp.generate(sharedSecret);
const isValid = totp.check(myTotp, sharedSecret);

console.log("Token Info:", {myTotp, isValid});




const authStringUTF = reqJSON.contact_email + ":" + myTotp;
const bytes = utf8.encode(authStringUTF);
const encoded = base64.encode(bytes);



const createReq = async () =>
{

    try 
    {

        // set the headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic " + encoded
            }
        };

        console.log("Making req", {URL, reqJSON, config});

        const res = await axios.post(URL, stringData, config);
        console.log(res.data);
    }
    catch (err)
    {
        console.error(err.response.data);
    }
};

createReq();