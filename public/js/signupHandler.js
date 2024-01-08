// check if user is already in
window.addEventListener("DOMContentLoaded", function() {
    const allCookies = getCookies();
    if(allCookies["user"]){
        window.location = "index.html";
    }
});

// on sign-up
async function signup() {
    // getting the form inputs
    const inputs = ["name", "username", "email", "password"];
    const userData = {};
    for(let i=0; i < inputs.length; i++){
        inputValue = document.getElementById(inputs[i]).value
        userData[inputs[i]] = inputValue;
    }
    
    // push user's data to the database
    var userHasRegister = await postThis(userData, "user", "signup");

    const errorMsg = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");
    if(userHasRegister["wasItASuccess"]) {
        successMessage.classList.remove("hidden");
        errorMsg.classList.add("hidden");
        successMessage.innerText = "You have joined us successfully";
        setUserToken(userHasRegister["token"], 10);
        window.location = "index.html";
    } else {
        errorMsg.classList.remove("hidden");
        errorMsg.classList.add("block");
        errorMsg.innerText = userHasRegister["errorMessage"];
    }
}