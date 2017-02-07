var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var myTable = document.getElementById('myTable').createCaption();
myTable.innerHTML = "<b>"+"Laundry"+"</b>";
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];
var washing = query[2];//"%" means not required
var ironing = query[3];//"%" means not required

function upload() {
  firebase.database().ref('job_sheets/'+propertyCode+'/'+ 'laundry').set({
    sink: document.getElementById("sink").value,
    surface: document.getElementById("surface").value,
    extra_iterm: document.getElementById('extra_iterm').value,
    extra_requirements: document.getElementById('extra_requirements').value
  });
}

function nextRoom() {	
	window.location.href = 'dusting_requirement.html?'+propertyCode+"&"+'dusting'+"&"+washing+"&"+ironing;
}
