var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var myTable = document.getElementById('myTable').createCaption();
myTable.innerHTML = "<b>"+"Vacuuming"+"</b>";
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];

function upload() {
  firebase.database().ref('job_sheets/'+propertyCode+'/'+ 'vacuuming').set({
    carpet: document.getElementById("carpet").value,
    corners: document.getElementById("corners").value,
    vents: document.getElementById("vents").value,
    fly_screens: document.getElementById("fly_screens").value,
    extra_iterm: document.getElementById('extra_iterm').value,
    extra_requirements: document.getElementById('extra_requirements').value
  });
}

function nextRoom() {
	window.location.href = 'belcony_requirement.html?'+propertyCode+"&"+'belcony';
}
