var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

var propertyCode_remembered = window.location.search.substring(1);

if (propertyCode_remembered != ""){
	var dbRefJobSheet = firebase.database().ref().child('job_sheets').child(propertyCode_remembered);
	dbRefJobSheet.on('value', function (snapshot){
		var property = snapshot.val();
		var listRoom = Object.keys(property);
		var numRoom = Object.keys(property).length;
		for (i = 0; i < numRoom; i++) {
			var button = document.createElement("button");
			document.createElement("br");
			button.innerHTML = listRoom[i];
			button.onclick = (function (roomType, propertyCode) { //jump to room job sheet page
				//roomType.slice(0,-2) is to ignore the index of a room
				if (roomType.slice(0,-2) == "bedroom" || roomType.slice(0,-2) == "bathroom") {
					location.href = roomType.slice(0,-2)+"_job_sheet.html?" + propertyCode_remembered + "&" + roomType;
				}
				else{
					location.href = roomType+"_job_sheet.html?" + propertyCode_remembered + "&" + roomType;	
				}
			}).bind(null, listRoom[i], propertyCode_remembered);
			document.body.appendChild(button);

			var line_break = document.createElement("br");
			document.body.appendChild(line_break);
		}
	});
}

function search() {
	//read data from jobsheet database to get the property configuration
	const propertyCode = document.getElementById("propertyCode");
	var dbRefJobSheet = firebase.database().ref().child('job_sheets').child(propertyCode.value);
	dbRefJobSheet.on('value', function (snapshot){
		var property = snapshot.val();
		var listRoom = Object.keys(property);
		var numRoom = Object.keys(property).length;
		for (i = 0; i < numRoom; i++) {
			var button = document.createElement("button");
			button.innerHTML = listRoom[i];
			button.onclick = (function (roomType, propertyCode) { //jump to room job sheet page
				//roomType.slice(0,-2) is to ignore the index of a room
				if (roomType.slice(0,-2) == "bedroom" || roomType.slice(0,-2) == "bathroom") {
					location.href = roomType.slice(0,-2)+"_job_sheet.html?" + propertyCode + "&" + roomType;
				}
				else{
					location.href = roomType+"_job_sheet.html?" + propertyCode + "&" + roomType;	
				}
			}).bind(null, listRoom[i], propertyCode.value);
			document.body.appendChild(button);

			var line_break = document.createElement("br");
			document.body.appendChild(line_break);

		}
	});

}