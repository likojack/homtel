var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var myTable = document.getElementById('myTable').createCaption();
myTable.innerHTML = "<b>"+"Belcony"+"</b>";
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];

function upload() {
  firebase.database().ref('job_sheets/'+propertyCode+'/'+ 'belcony').set({
    sweep: document.getElementById("sweep").value,
    bbq: document.getElementById("bbq").value,
    cobweb: document.getElementById("cobweb").value,
    wipe: document.getElementById("wipe").value,
    extra_iterm: document.getElementById('extra_iterm').value,
    extra_requirements: document.getElementById('extra_requirements').value
  });
}

function nextRoom() {
	window.location.href = 'washing_requirement.html?'+propertyCode+"&"+"washing";
}
