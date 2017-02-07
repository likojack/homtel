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
var washing = query[5];//"%" means not required
var ironing = query[6];//"%" means not required

if (ptNum <= numBed) { //record the current bedroom requirement
	myTable.innerHTML = "<b>"+ptRoom+" "+ptNum+"</b>";
}


function upload() {
	firebase.database().ref('job_sheets/'+propertyCode+'/'+ptRoom+'_'+ptNum).set({
		strip_protector: document.getElementById('strip_protector').value,
		strip_fitted_sheet: document.getElementById('strip_fitted_sheet').value,
		strip_flat_sheet: document.getElementById('strip_flat_sheet').value,
		strip_quilt_cover: document.getElementById('strip_quilt_cover').value,
		strip_pillowcases: document.getElementById('strip_pillowcases').value,
		make_pillowcases: document.getElementById('make_pillowcases').value,
		make_fitted_sheet: document.getElementById('make_fitted_sheet').value,
		make_flat_sheet: document.getElementById('make_flat_sheet').value,
		make_quilt_cover: document.getElementById('make_quilt_cover').value,
		make_other_beddings: document.getElementById('make_other_beddings').value,
		extra_iterm: document.getElementById('extra_iterm').value,
		extra_requirements: document.getElementById('extra_requirements').value
	});
}


function nextRoom() {
	console.log (ptNum);
	if (ptNum < numBed) { //record the current bedroom requirement
		location.href = 'bedroom_requirement.html?'+propertyCode+"&"+numBed+"&"+numBath+"&"+ptRoom + "&" + (parseInt(ptNum) + 1) +"&"+washing+"&"+ironing;
	} else {//next one is bathroom
		location.href = 'bathroom_requirement.html?'+propertyCode+"&"+numBed+"&"+numBath+"&"+ "bathroom" + "&" + 1 +"&"+washing+"&"+ironing;
	}	
}
