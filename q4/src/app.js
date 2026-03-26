// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;


/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {
    try{ //try starts here 
        const profile=JSONparse(jsonText);
        if (typeof profile.userName !=="string") //checks if the userName is a string it not then it returns null, it does not execute anything inserted by the user at it could be a malicous code
            return null;
        if(!Array.isArray(profile.notifications)) //check is the notificaitons is arrray if it not then it return null but does not executre/process it, again because it could be a malicious code
            return null;
        const allStrings = profile.notifications.every(function(n){ //checks if all the elements in the notifications array is strings if not then returns null.
            return typeof n == "string";})
            if(!allStrings)
                return null;
            currentProfile = profile;
            renderProfile(profile);
        }
        catch(e){ return null;} //catch, if there is an error it returns null which makes it safely fail
       
    }



// --------------------------



function renderProfile(profile) {

    listEl.innerHTML =""; //This will clear the list
    profile.forEach(msg => {  
        const li = document.createElement("li"); //this wpuld create list element for each notification
        li.textContent = msg; // it will set the textConent of list element to notifiation message as it does not processed is as HTML which makes it safe, it would not matter what the malicious attacker inputs it would not execute it as code
        listEl.appendChild(li); //this appends the list element to the orginal list 
    })
}

/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    const session ={ //creats a session object with username and role from current profile- does not include the notifications as those could have malicious code
        userName: currentProfile.userName,
        role: currentProfile.role
    };
    localStorage.setItem("profile", JSON.stringify(session));

    alert("Session saved");
}


function loadSession(){
        const stored = localStorage.getItem("profile"); //cecks for the sessions stored in local storage
        if (!stored)
            return null;
        const obj = JSON.parse(stored);
        if (typeof obj.userName !=="string") //checks if the userName is string if not then reutnr null, it secures it as no malicious code would be executred
            return null;
        if (typeof obj.role !=="string") //checks if the user input is string if not then reutnr null, it secures it as no malicious code would be executred
            return null;
        return obj;
}    