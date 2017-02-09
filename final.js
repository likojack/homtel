var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var myTable = document.getElementById('myTable').createCaption();
myTable.innerHTML = "<b>"+"Finishing"+"</b>";
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];


function upload() {
  firebase.database().ref('job_sheets/'+propertyCode+'/'+ 'final').set({
    extra_area: document.getElementById("extra_area").value,
    check_utility: document.getElementById("check_utility").value,
    photo_report: document.getElementById('photo_report').value
  });
}

function nextRoom() {
	window.location.href = 'thankyou.html?'+propertyCode; 

}
