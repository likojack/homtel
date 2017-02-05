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
// if text.substr()
var numBed = text.slice(0,1);
var numBath = text.slice(1,2);
var ptRoom = text.slice(2,-1);
var ptNum = text.slice(-1);
console.log(ptNum);
if (ptNum <= numBath) { //record the current bedroom requirement
	myTable.innerHTML = "<b>"+ptRoom+" "+ptNum+"</b>";
}
if (ptNum > numBath) {
	location.href = 'kitchen_requirement.html'+'#'+'kitchen';
}

function nextRoom() {
	if (ptNum <= numBath) { //record the current bedroom requirement
		//TODO: write requirement to database.
		location.href = 'bathroom_requirement.html'+'#'+ numBed + numBath + ptRoom + (parseInt(ptNum) + 1);
	}
	
}
