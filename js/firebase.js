var config = {
    apiKey: "AIzaSyCZabxXANcODhMxiOlzJYPywo2EnffqKnY",
    authDomain: "acheronwebsitedemo.firebaseapp.com",
    databaseURL: "https://acheronwebsitedemo.firebaseio.com",
    projectId: "acheronwebsitedemo",
    storageBucket: "acheronwebsitedemo.appspot.com",
    messagingSenderId: "1074694088051"
};
firebase.initializeApp(config);
database = firebase.database();
storageRef = firebase.storage().ref();
var regemail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
var currentuser = sessionStorage.getItem("user");
var idArray = [];
var displayname ;
checksession();
// getcurrentUser();

function loginfunction() {
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pass").value;
    firebase.auth().signInWithEmailAndPassword(username, password)
        .then(function () {
            sessionStorage.setItem("user", username.split("@",1));
            document.getElementById("logmodal").style.display = "none";
            document.getElementById("currentuser").style.display="inline"
            document.getElementById("currentuser").innerText = currentuser;
            checksession();
            document.getElementById("successmsg").innerText = 'Successfully Logged In !!!';
                setTimeout(() => { document.getElementById("successmsg").style.display = 'none'; }, 4000);
        })
        .catch(function (error) {
            var loginerror = document.getElementById("loginerrormsg")
            loginerror.textContent = error.message;
            loginerror.style.color = "red";
            console.log(error.code);
            console.log(error.message);
        });
}

function logoutfunction() {
    sessionStorage.removeItem("user");
    checksession();
}

function checksession() {
    var loggedin = sessionStorage.getItem("user");
    if (loggedin) {
        document.getElementById("loginbtn").style.display = "none";
        document.getElementById("logout").style.display = "block";
        document.getElementById("currentuser").textContent = loggedin;
        document.getElementById("newpost").style.display = "inline";
        document.getElementsByClassName("icon").style.display = "inline";
    } else {
        document.getElementById("loginbtn").style.display = "block";
        document.getElementById("logout").style.display = "none";
        document.getElementById("currentuser").style.display = "none";
        document.getElementById("newpost").style.display = "none";
    }
}

function signup() {
    var username = document.getElementById("name").value;
    var password = document.getElementById("userpass").value;
    var confirmpassword = document.getElementById("confirmpass").value;
    displayname = document.getElementById("displayname").value;
    if (password.length != confirmpassword.length || confirmpassword == "" || !(confirmpassword == password)) {
        document.getElementById("registererrormsg").textContent = "enter valid confirm password"
    }else if(displayname == ""){
        document.getElementById("registererrormsg").textContent = "enter valid display name"
    } else {
        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(function (data) {
                console.log(data);
                document.getElementById("registermodal").style.display = "none";
                document.getElementById("successmsg").innerText = 'Successfully registered. Login now !!';
                setTimeout(() => { document.getElementById("successmsg").style.display = 'none'; }, 4000);
            })
            .catch(function (error) {
                document.getElementById("registererrormsg").textContent = error.message;
            });
    }


}

// function getcurrentUser(){
//     firebase.auth().onAuthStateChanged(function(user) {
//         currentuser = user.email ;
//       });
//     return currentuser;
// }

function gettechnologydata(category){
    firebase.database().ref(category).on("value", gotData)
 }
 function gotData(data) {
    postArray = data.val();
    if (idArray.length <= 0) {
        Object.keys(postArray).forEach(function (item, index) {
            var div = document.createElement('div');
            div.className = 'card';
            div.id = postArray[item].postid;
            idArray.push(div.id);
            div.innerHTML = "<div class='card-image'><img src = " + postArray[item].imagepath + " class='.card-img-top'></div>"+
                            "<div class='card-content'><div class='"+postArray[item].category+"-author'><div>"+postArray[item].postedBy+"</div><div class='date'>"+postArray[item].postedDate+"</div><span onclick='editpost(event)' class='icon'><i class='fas fa-edit'></i></span></div>"+
                            "<div class='posttitle'><h4>"+postArray[item].postTitle+"</h4></div>"+
                            "<div class='desc'>"+postArray[item].description+"</div></div>"
            document.getElementById("flex-container").append(div);
        });
    }else if(!(idArray.includes(name))){
        var div = document.createElement('div');
        div.className = 'card';
        div.id = postid;
        div.innerHTML = "<div class='card-image'><img src = " + imagepath + " class='.card-img-top'></div>"+
                            "<div class='card-content'><div class='technology-author'><div>"+postedBy+"</div><div class='date'>"+postedDate+"</div><span onclick='editpost(event)' class='icon'><i class='fas fa-edit'></i></span></div>"+
                            "<div class='posttitle'><h4>"+title+"</h4></div>"+
                            "<div class='desc'>"+description+"</div></div>"
            document.getElementById("flex-container").append(div);
        idArray.push(div.id);
    }
}

