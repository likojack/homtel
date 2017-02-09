var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
firebase.initializeApp(config);

var query = window.location.search.substring(1).split("&");
var propertyCode_remembered = query[0];
var propertyCode = query[1];
var num_done = query[2];
var roomType_done = query[3];
var doneList = [];
document.getElementById("property_code").innerHTML = propertyCode;

if (propertyCode_remembered != ""){//coming back from a room
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
					location.href = roomType.slice(0,-2)+"_job_sheet.html?" + propertyCode_remembered + "&" + roomType+"&"+ num_done;
				}
				else{
					location.href = roomType+"_job_sheet.html?" + propertyCode_remembered + "&" + roomType+"&"+ num_done;	
				}
			}).bind(null, listRoom[i], propertyCode_remembered);
			document.body.appendChild(button);

			if (listRoom[i] == roomType_done) {//if just done this room, mark out this room
				var p = document.createElement("lable");
				p.innerHTML = "*";
				document.body.appendChild(p);
			}

			var line_break = document.createElement("br");
			document.body.appendChild(line_break);
		}
	});
} else {// coming from main page
	var dbRefJobSheet = firebase.database().ref().child('job_sheets').child(propertyCode);
	dbRefJobSheet.on('value', function (snapshot){
		var property = snapshot.val();
		var listRoom = Object.keys(property);
		// var room_counter = ""; 
		// for i in listROom:
		// 	room_counter = room_counter + listRoom[i] + "=0";
		var numRoom = Object.keys(property).length;
		for (i = 0; i < numRoom; i++) {
			var button = document.createElement("button");
			button.innerHTML = listRoom[i];
			button.onclick = (function (roomType, propertyCode) { //jump to room job sheet page
				//roomType.slice(0,-2) is to ignore the index of a room
				if (roomType.slice(0,-2) == "bedroom" || roomType.slice(0,-2) == "bathroom") {
					location.href = roomType.slice(0,-2)+"_job_sheet.html?" + propertyCode + "&" + roomType +"&"+ num_done;
					//roomType.slice(0,-2)+"_job_sheet.html?" + propertyCode + "&"" +roomType +"&"++				}
				else{
					location.href = roomType+"_job_sheet.html?" + propertyCode + "&" + roomType+"&"+ num_done;	
				}
			}).bind(null, listRoom[i], propertyCode);
			document.body.appendChild(button);

			var line_break = document.createElement("br");
			document.body.appendChild(line_break);
		}
	});
}

function finish() {
	var dbRefJobSheet = firebase.database().ref().child('job_sheets').child(propertyCode);
	dbRefJobSheet.on('value', function (snapshot){
		var property = snapshot.val();
		var numRoom = Object.keys(property).length;
		console.log(numRoom);
		if (numRoom <= num_done) {
        	//all rooms are done
        	document.getElementById("done").innerHTML = "Done!";
	    } else {
	        // there are some room are not done
	        alert("You have unfinished rooms!");
	    }

	});
}







