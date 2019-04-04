import { Firebase } from "../build/firebase.js"
import { Main } from "../build/main.js"
export {Technology}
class Technology{
    constructor(){
    }
 editpost(event){
     document.getElementById("postbtn").style.display = "none";
    opentechmodal();
    var currentitem = event.target.offsetParent.id;
    var currentitemobj = {};
    console.log(event.target.offsetParent.id);
    window.firebase.database().ref("technology/"+currentitem).on("value", function(snapshot){
        console.log(snapshot.val());
        currentitemobj = snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })

    document.getElementById("techposttitle").value = currentitemobj.postTitle;
    document.getElementById("techdesc").value = currentitemobj.description;
 }
 editingpost(){
    title = document.getElementById("techposttitle").value;
    description = document.getElementById("techdesc").value;
    file = document.getElementById("files").files[0];
    postedBy = currentuser;
    postedDate = getCurrentDate();
    var uploadTask = storageRef.child('technology/' + file.name).put(file);
    uploadTask.then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            imagepath = url ;
            var obj = {
                postTitle :title,
                description :description,
                imagepath :url,
                imageName : file.name,
                postedBy :postedBy,
                postedDate : postedDate,
                category : "technology"  
            }
            window.firebase.database().ref('technology/'+title).update(obj);
        })
        // window.gettechnologydata("technology");
    document.getElementById("successmsg").innerText = 'Edited successfully';
    setTimeout(() => { document.getElementById("successmsg").style.display = 'none'; }, 4000);
 }
}

const obj = new Technology();
const mainobj = new Main();
const firebaseobj = new Firebase();
const techobj = new Technology();
var techmodal;
var techpostArray ;
var imagepath ;
var currentuser = sessionStorage.getItem("user");
var length ;
var title,description,file,postedBy,postedDate;
