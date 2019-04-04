import { Main } from "../build/main.js";
export { Firebase };
var headercomponent =  document.getElementsByTagName("header-component")[0];
var contentcomponent =  document.getElementsByTagName("content-component")[0];
class Firebase{
    constructor(){
    }
    loginfunction(username,password) {
        console.log(username);
        console.log(password);
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(function () {
               currentuser = sessionStorage.setItem("user",username);
               headercomponent.shadowRoot.querySelector('#logmodal').style.display = "none";
               headercomponent.shadowRoot.querySelector('#currentuser').innerText = sessionStorage.getItem("user");
                firebaseobj.checksession();
                document.getElementById("successmsg").innerText = 'Successfully Logged In !!!';
                    setTimeout(() => { document.getElementById("successmsg").style.display = 'none'; }, 4000);
            })
            .catch(function (error) {
                headercomponent.shadowRoot.querySelector('#loginerrormsg').innerText = error.message;
                console.log(error.code);
                console.log(error.message);
            });
        }

    logoutfunction() {
        firebase.auth().signOut().then(function() {
            sessionStorage.removeItem("user");
            firebaseobj.checksession();
        }, function(error) {
            headercomponent.shadowRoot.querySelector('#loginerrormsg').innerText = error.message;
        });
    }
    
    checksession() {
        var loggedin = sessionStorage.getItem("user");
        var logoutbtn = headercomponent.shadowRoot.querySelector('#logout')
        var loginbtn = headercomponent.shadowRoot.querySelector('#loginbtn')
        // if (loggedin) { return true;} else {return false;}
        if(loggedin){
            logoutbtn.innerText = "LOG OUT"
            logoutbtn.style.display = "block";
            loginbtn.style.display = "none";
        }else{
            loginbtn.innerText = "LOG IN /SIGN UP";
            loginbtn.style.display = "block";
            logoutbtn.style.display = "none";
            headercomponent.shadowRoot.querySelector('#currentuser').style.display = "none";
        }
    }
    
    signup() {
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
    
    gettechnologydata(category){
        firebase.database().ref(category).on("value", gotData)
     }
     gotData(data) {
        // postArray = data.val();
        // if (idArray.length <= 0) {
        //     Object.keys(postArray).forEach(function (item, index) {
        //         console.log(postArray[item]);
        //         document.getElementById("flex-container").append("<user-card post-id='"+postArray[item].postTitle+"'></user-card>");
        //     });
        // }else if(!(idArray.includes(name))){
        //         document.getElementById("flex-container").append("<user-card post-id='"+name+"'></user-card>");
        // }
    }
    getCategoryList(){
        var catList;
            database.ref("category/").on("value", function(snapshot){
            console.log(snapshot.val());
            catList = snapshot.val();
      })
      return catList;
    }
     writeTechPostData(title, desc,url,imageName,cat,postedBy,postedDate){
        firebase.database().ref(cat+'/'+title).set({
        postTitle :title,
        description :desc,
        imageName : imageName,
        imagepath :url,
        postedBy :postedBy,
        postedDate : postedDate,
        category : cat
      });
      
      window.location.href = 'http://localhost:9080/'+cat+'.html?#'; 
 }
}  
var firebaseobj = new Firebase();
// firebaseobj.checksession();
const config = {
    apiKey: "AIzaSyCZabxXANcODhMxiOlzJYPywo2EnffqKnY",
    authDomain: "acheronwebsitedemo.firebaseapp.com",
    databaseURL: "https://acheronwebsitedemo.firebaseio.com",
    projectId: "acheronwebsitedemo",
    storageBucket: "acheronwebsitedemo.appspot.com",
    messagingSenderId: "1074694088051"
};
    firebase.initializeApp(config);
    export const database = firebase.database();
    export const storageRef = firebase.storage().ref();
        var regemail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var currentuser = sessionStorage.getItem("user");
    var idArray = [];
    var displayname ;
    const mainobj = new Main();


