// retrieve all cookies
var getCookies = function(){
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i=0; i<pairs.length; i++){
        var pair = pairs[i].split("=");
        cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
}

// extract url parameters
function getJsonFromUrl(url) {
    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

// set user token
function setUserToken(token, daysToExpire) {
    const d = new Date();
    d.setTime(d.getTime() + (daysToExpire*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie =  "user=" + token + ";" + expires + ";path=/;";
}

// Sign-out
document.getElementById("sign-out").onclick = () => {
    document.cookie =  "user=" + getCookies()["user"] + ";path=/;Max-Age=0;";
    window.location = "signup.html";
};

// Handle POST requests
async function postThis(dataToBePosted, model, route) {
    let wasItASuccess = false;
    let errorMessage = "";
    let token = "";
    var headers = { "Content-Type": "application/json" };
    await fetch(`http://localhost:8000/api/${model}/${route}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(dataToBePosted)
    })
    .then(async res => {
        if(res.ok) return await res.json();

        // an error occurred
        const err = await res.json();
        errorMessage = err.message;
        wasItASuccess = false;
    }).then(data =>  {
        if(data){
            wasItASuccess = true;
            if(data.token) token = data.token;
        }
    });

    return { "wasItASuccess": wasItASuccess, "errorMessage": errorMessage, "token": token };
}

// Handle GET requests
async function getThis(model, route) {
    let wasItASuccess = false;
    let errorMessage = "";
    let returnedData = {}
    var headers = {};
    if(route == "userBookings" || route == "me"){
        headers = { 'Authorization': ("Bearer " + getCookies()["user"]) };
    }
    await fetch(`http://localhost:8000/api/${model}/${route}/`, {
        method: 'GET',
        headers,
    })
    .then(async res => {
        if(res.ok) return await res.json();

        // an error occurred
        const err = await res.json();
        errorMessage = err.message;
        wasItASuccess = false;
    }).then(data =>  {
        if(data){
            wasItASuccess = true;
            returnedData = data
        }
    });

    return { "wasItASuccess": wasItASuccess, "errorMessage": errorMessage, "data": returnedData };
}

// Handle DELETE requests
async function deleteThis(model, route, id) {
    let wasItASuccess = false;
    let errorMessage = "";
    let returnedData = {}
    var headers = { 'Authorization': ("Bearer " + getCookies()["user"]) };
    await fetch(`http://localhost:8000/api/${model}/${route}/${id}`, {
        method: 'DELETE',
        headers,
    })
    .then(async res => {
        if(res.ok) return await res.json();

        // an error occurred
        const err = await res.json();
        errorMessage = err.message;
        wasItASuccess = false;
    }).then(data =>  {
        if(data){
            wasItASuccess = true;
            returnedData = data
        }
    });

    return { "wasItASuccess": wasItASuccess, "errorMessage": errorMessage, "data": returnedData };
}