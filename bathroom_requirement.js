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

//count how many images has been uploaded
var img_counter = 0;
var img_reference = [];


if (ptNum <= numBath) { //record the current bathroom requirement
	myTable.innerHTML = "<b>"+ptRoom+" "+ptNum+"</b>";
}
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function displayFile(event) {
	//only read one image at once, because it is read from camera
	var file = event.target.files;
	var reader = new FileReader();
	reader.onload = function() {
		if (img_counter == 0) { // display the first iamge
			var img = document.getElementById("imgOne");
			var imgPopup = document.getElementById("imgPopupOne");
			img_reference[img_counter] = reader.result; 
			img.src = reader.result;
			imgPopup.src=reader.result;
			console.log(img_reference.length);
		}
		else if (img_counter == 1) { // display the second iamge
			var img = document.getElementById("imgTwo");
			var imgPopup = document.getElementById("imgPopupTwo");
			img_reference[img_counter] = reader.result; 
			img.src = reader.result;
			imgPopup.src=reader.result;
			console.log(img_reference.length);
		}
		else if (img_counter == 2){ // display the third image
			var img = document.getElementById("imgThree");
			var imgPopup = document.getElementById("imgPopupThree");
			img_reference[img_counter] = reader.result; 
			img.src = reader.result;
			imgPopup.src=reader.result;
			console.log(img_reference.length);
		}
		img_counter = img_counter + 1;
	}
	reader.readAsDataURL(file[0]);

}

function discardImage() {
	//reset image counter, image referecne and clear the content of img tags
	img_counter = 0;
	img_reference = [];
	console.log(img_reference.length);
	document.getElementById("imgOne").src = "";
	document.getElementById("imgTwo").src = "";
	document.getElementById("imgThree").src = "";
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
		location.href = 'bathroom_requirement.html?'+propertyCode+"&"+numBed+"&"+numBath+"&"+ptRoom + "&" + (parseInt(ptNum) + 1) +"&"+washing+"&"+ironing;
	} else {
		location.href = 'kitchen_requirement.html?'+propertyCode+"&"+'kitchen'+"&"+washing+"&"+ironing;
	}
	
}
