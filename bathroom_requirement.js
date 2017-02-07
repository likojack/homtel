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

if (ptNum <= numBath) { //record the current bathroom requirement
	myTable.innerHTML = "<b>"+ptRoom+" "+ptNum+"</b>";
}

function upload() {
	firebase.database().ref('job_sheets/'+propertyCode+'/'+ptRoom+'_'+ptNum).set({
		dirty_towels: document.getElementById("dirty_towels").value,
		dry: document.getElementById("dry").value,
		wipe: document.getElementById("wipe").value,
		drain: document.getElementById("drain").value,
		rack: document.getElementById("rack").value,
		basin: document.getElementById("basin").value,
		surface: document.getElementById("surface").value,
		bathtub: document.getElementById("bathtub").value,
		replace: document.getElementById("replace").value,
		bin: document.getElementById("bin").value,
		toilet_paper: document.getElementById("toilet_paper").value,
		clean_towels: document.getElementById("clean_towels").value,
		clean_washers: document.getElementById("clean_washers").value,
		clean_bathmat: document.getElementById("clean_bathmat").value,
		brush_toilet: document.getElementById("brush_toilet").value,
		extra_iterm: document.getElementById('extra_iterm').value,
		extra_requirements: document.getElementById('extra_requirements').value

	});
}

function nextRoom() {
	if (ptNum < numBath) { //record the current bathroom requirement
		location.href = 'bathroom_requirement.html?'+propertyCode+"&"+numBed+"&"+numBath+"&"+ptRoom + "&" + (parseInt(ptNum) + 1);
	} else {
		location.href = 'kitchen_requirement.html?'+propertyCode+"&"+'kitchen';
	}
	
}
