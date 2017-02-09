var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var myTable = document.getElementById('myTable').createCaption();
myTable.innerHTML = "<b>"+"Ironing"+"</b>";
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];
var washing = query[2];//"!" means not required
var ironing = query[3];//"!" means not required

function upload() {
  firebase.database().ref('job_sheets/'+propertyCode+'/'+ 'ironing').set({
    ironing_requirement: document.getElementById('ironing_requirement').value
  });
}

function nextRoom() {
	window.location.href = 'final.html?'+propertyCode+"&"+"final"; 
}
