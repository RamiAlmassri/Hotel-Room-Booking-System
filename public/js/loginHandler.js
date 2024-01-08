// check if user is already in
window.addEventListener("DOMContentLoaded", function() {
    const allCookies = getCookies();
    if(allCookies["user"]){
        window.location = "index.html";
    }
});

// on login
async function login() {
    // getting the form inputs
    const inputs = ["email", "password"];
    const userData = {};
    for(let i=0; i < inputs.length; i++){
        inputValue = document.getElementById(inputs[i]).value;
        userData[inputs[i]] = inputValue;
    }
    
    // check if user exists
    var userExists = await postThis(userData, "user", "login");

    const errorMsg = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");
    if(userExists["wasItASuccess"]) {
        successMessage.classList.remove("hidden");
        errorMsg.classList.add("hidden");
        successMessage.innerText = "You have entered successfully";
        setUserToken(userExists["token"], 10);
        window.location = "index.html";
    } else {
        errorMsg.classList.remove("hidden");
        errorMsg.classList.add("block");
        errorMsg.innerText = userExists["errorMessage"];
    }
}