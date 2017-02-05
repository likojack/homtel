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

if (ptNum <= numBed) { //record the current bedroom requirement
	myTable.innerHTML = "<b>"+ptRoom+" "+ptNum+"</b>";
}
else {
	location.href = 'bathroom_requirement.html'+'#'+numBed+numBath+'bathroom' + 1;
}
function upload() {
	const sProtector = document.getElementById('sProtector');
	const propertyCode="asd111";
	firebase.database().ref('property/'+propertyCode+'/'+ptRoom+ptNum).set({
		strip_protector: sProtector.value
	});
}


function nextRoom() {
	if (ptNum <= numBed) { //record the current bedroom requirement
		location.href = 'bedroom_requirement.html'+'#'+numBed+numBath+ptRoom + (parseInt(ptNum) + 1);
	}	
}
