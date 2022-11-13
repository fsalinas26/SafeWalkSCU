//import axios from "axios"
const axios = require("axios");
const url =  "http://ec2-35-93-97-206.us-west-2.compute.amazonaws.com/API/";
const config = require('./config.json')
var token="";
function get_walkers() {
    return new Promise((resolve, reject) => {
        apiRequest("walkerAPI.php").then((data) => {
            resolve(data);
        }).catch((err) => {
            resolve(err);
        })
    })
}

function request_walker() {
    return new Promise((resolve, reject) => {
        apiRequest("walkRequestAPI.php").then((data) => {
            resolve(data);
        }).catch((err) => {
            resolve(err);
        })
    })
}
function getSafetyRating(loc){
    var retData = new Promise((resolve,reject)=>{
        apiRequest("https://api.iq.inrix.com/blocks/v3").then((data)=>{
            resolve(data);
        }).catch((err)=>{
            resolve(err);
        })
    })
}
function addRequest(name,requestInfo,loc){
    return new Promise((resolve, reject) => {
        apiRequest("POSTadd.php",
            {"requestType":"0",
                "name":name,
                "requestInfo":requestInfo,
                "currentLocation":"("+loc.lat+","+loc.lng+")"},
        "POST").then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log(err);
            resolve(err);
        })
    })
}
	
function apiRequest(params, body, method) {
    return new Promise((resolve, reject) => {
        axios({
            method: method ? method : "GET",
            url: url + params,
            data: JSON.stringify(body),
            responseType: "json",
            proxy: false
        }).then((res) => {
            return resolve(res.data);
        }).catch(((err) => {
            return reject(err);
        }));

    });
}

function get_token()
{
    if(token!="")return token;
    const params = `appToken?appId=${config.appId}&hashToken=${config.hashToken}`;
    return new Promise((resolve, reject) => {
        axios.get(`https://api.iq.inrix.com/auth/v1/`+params).then(res=>{
            resolve(res.data.result.token);
        })
    })
}


function blocks(latitude,longitude,radius)
{
    const params = `appToken?appId=${config.appId}&hashToken=${config.hashToken}`;
    return new Promise((resolve, reject) => {
        
        axios.get(`https://api.iq.inrix.com/blocks/v3/?point=`+latitude+"%7C"+longitude+"&radius="+radius,{
            headers:{
                "Authorization":"Bearer " + config.token

            }
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err)
        })
    })
}
async function wait(pointsAr)
{
    var arr = [0,0,0,0];
    pointsAr.map(async function(pointAr){
        const res = await blocks(pointAr.lat,pointAr.lng,"20");
        var density = 0;
        console.log(pointAr.lat)
        console.log(pointAr.lng)
        console.log(res)
        res.result.map(rBlock=>{
            density+= rBlock.segments.length* rBlock.probability/100.0;
        })
        arr.push()
        pointAr["densityScore"] = density;
        console.log(density)
    })
    //console.log(pointsAr);
    
}


module.exports = {
    get_walkers: get_walkers,
    request_walker:request_walker,
    addRequest:addRequest,
    get_token:get_token,
    blocks:blocks,
    wait:wait
}

