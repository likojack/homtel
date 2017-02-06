var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var myTable = document.getElementById('myTable').createCaption();
var text = window.location.hash.substr(1);
myTable.innerHTML = "<b>"+text+"</b>";

function nextRoom() {
	//TODO: write requirement to database.
	
	window.location.href = 'washing_requirement.html'+'#'+"washing";
}
