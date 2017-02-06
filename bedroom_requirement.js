var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var myTable = document.getElementById('myTable').createCaption();
var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];
var numBed = query[1];
var numBath = query[2];
var ptRoom = query[3];
var ptNum = query[4];

if (ptNum <= numBed) { //record the current bedroom requirement
	myTable.innerHTML = "<b>"+ptRoom+" "+ptNum+"</b>";
}
else {
	location.href = 'bathroom_requirement.html?'+propertyCode+"&"+numBed+"&"+numBath+"&"+ptRoom + "&" + 1;
}

function upload() {
	firebase.database().ref('property/'+propertyCode+'/'+ptRoom+ptNum).set({
		strip_protector: document.getElementById('sProtector').value
	});
}


function nextRoom() {
	if (ptNum <= numBed) { //record the current bedroom requirement

		location.href = 'bedroom_requirement.html?'+propertyCode+"&"+numBed+"&"+numBath+"&"+ptRoom + "&" + (parseInt(ptNum) + 1);
	}	
}
