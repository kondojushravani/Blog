var modal;
var regmodal;
// When the user scrolls down 50px from the top of the document, resize the header's font size
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//     document.getElementById("header").style.backgroundColor = "#ffffff";
//   } else {
//     document.getElementById("header").style.backgroundColor = "#ffffff";
//   }
// }
//open modal on click of login
function openmodal() {
    modal = document.getElementById("logmodal");
    modal.style.display = "block";
}
//closing modal when user click outside modal
// window.onclick = function (event) {
//     if (event.target == modal || event.target == regmodal) {
//         event.target.style.display = "none";
//     }
// }
//close modal on click of close button
function closeloginmodal() {
    modal.style.display = "none";
}

function closeregistermodal() {
    regmodal.style.display = "none";
}

function openregistermodal() {
    modal = document.getElementById("logmodal");
    modal.style.display = "none";
    regmodal = document.getElementById("registermodal");
    regmodal.style.display = "block";
}
function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}
