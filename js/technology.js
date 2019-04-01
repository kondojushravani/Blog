var techmodal;
var techpostArray ;
var imagepath ;
var currentuser = sessionStorage.getItem("user");
var length ;
var title,description,file,postedBy,postedDate;
window.gettechnologydata("technology");
window.checksession();

function opentechmodal() {
    techmodal = document.getElementById("technologymodal");
    techmodal.style.display = "block";
}
function closetechmodal() {
    techmodal.style.display = "none";
}
function posttech() {
    title = document.getElementById("techposttitle").value;
    description = document.getElementById("techdesc").value;
    file = document.getElementById("files").files[0];
    postedBy = currentuser;
    postedDate = getCurrentDate();
    var uploadTask = storageRef.child('technology/' + file.name).put(file);
    uploadTask.then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            imagepath = url ;
            window.firebase.database().ref("technology/").on("value", function(snapshot){
                length = snapshot.val().length;
                console.log(length);
            })
            writeTechPostData(length,title, description,url,postedBy,postedDate);
        })
    document.getElementById("successmsg").innerText = 'Posted successfully';
    setTimeout(() => { document.getElementById("successmsg").style.display = 'none'; }, 4000);
}
 function writeTechPostData(length,title, desc,url,postedBy,postedDate){
    firebase.database().ref('technology/'+"tech"+(length+1)).set({
        postid : "tech"+(length+1),
        postTitle :title,
        description :desc,
        imagepath :url,
        postedBy :postedBy,
        postedDate : postedDate,
        category : "technology"
      });
      window.gettechnologydata("technology");
      closetechmodal();
 }

 function editpost(event){
     document.getElementById("login").style.display = "none";
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
 function editingpost(){
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
                postedBy :postedBy,
                postedDate : postedDate,
                category : "technology"  
            }
            window.firebase.database().ref('technology/'+title).update(obj);
        })
        window.gettechnologydata("technology");
    document.getElementById("successmsg").innerText = 'Edited successfully';
    setTimeout(() => { document.getElementById("successmsg").style.display = 'none'; }, 4000);
 }