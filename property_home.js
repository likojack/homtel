var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
firebase.initializeApp(config);

var query = window.location.search.substring(1).split("&");
var propertyCode = query[0];
document.getElementById("property_code").innerHTML = propertyCode;

if (query[1]=="search"){//coming from search page
	var roomDoneList = "";
	var dbRefJobSheet = firebase.database().ref().child('job_sheets').child(propertyCode);
	console.log(propertyCode);
	dbRefJobSheet.on('value', function (snapshot){
		var property = snapshot.val();
		var listRoom = Object.keys(property);
		var numRoom = Object.keys(property).length;
		for (i = 0; i < numRoom; i++) {
			var button = document.createElement("button");
			roomDoneList = roomDoneList+"&"+listRoom[i]+ "=0";
			button.innerHTML = listRoom[i];
			button.onclick = (function (roomType, propertyCode) { //jump to room job sheet page
				//roomType.slice(0,-2) is to ignore the index of a room
				if (roomType.slice(0,-2) == "Bedroom" || roomType.slice(0,-2) == "Bathroom") {//***************!!!!!!BUG!!!!///
					location.href = roomType.slice(0,-2)+"_job_sheet.html?" + propertyCode + "&" + roomType + roomDoneList;
				}
				else{
					location.href = roomType+"_job_sheet.html?" + propertyCode + "&" + roomType + roomDoneList;	
				}
			}).bind(null, listRoom[i], propertyCode);
				document.body.appendChild(button);

				var line_break = document.createElement("br");
				document.body.appendChild(line_break);
		}

		var p = document.createElement("p");
		p.innerHTML = "";
		document.body.appendChild(p);


		var finish_button = document.createElement("button");
		finish_button.innerHTML = "FINISH";
		finish_button.onclick = (function () { 
						console.log("haha");
						finish();
		});
		document.body.appendChild(finish_button);
			
		var finish_lable = document.createElement("lable");
		finish_lable.innerHTML = "";
		finish_lable.id = "finish_lable";
		document.body.appendChild(finish_lable);
	});

} else { //just done a room
	var roomDoneList = ""; 
	for (i = 1; i < query.length; i++) {
	    roomDoneList = roomDoneList +"&" + query[i];	    
	};
	console.log(roomDoneList);
	var dbRefJobSheet = firebase.database().ref().child('job_sheets').child(propertyCode);
	dbRefJobSheet.on('value', function (snapshot){
		var property = snapshot.val();
		var listRoom = Object.keys(property);
		var numRoom = Object.keys(property).length;
		for (i = 0; i < numRoom; i++) {
			var button = document.createElement("button");
			button.innerHTML = listRoom[i];
			button.onclick = (function (roomType, propertyCode) { //jump to room job sheet page
				//roomType.slice(0,-2) is to ignore the index of a room
				if (roomType.slice(0,-2) == "Bedroom" || roomType.slice(0,-2) == "Bathroom") {
					location.href = roomType.slice(0,-2)+"_job_sheet.html?" + propertyCode + "&" + roomType + roomDoneList;
				}
				else{
					location.href = roomType+"_job_sheet.html?" + propertyCode + "&" + roomType +roomDoneList;	
				}
			}).bind(null, listRoom[i], propertyCode);
				document.body.appendChild(button);

			if (parseInt(query[i+1].slice(-1)) >0){
				var lable = document.createElement("lable");
				lable.innerHTML = "*";
				document.body.appendChild(lable);
	   		}

			var line_break = document.createElement("br");
			document.body.appendChild(line_break);
		}
		var finish_button = document.createElement("button");
		finish_button.innerHTML = "FINISH";
		finish_button.onclick = (function () { 
						console.log("haha");
						finish();
		});
		document.body.appendChild(finish_button);
			
		var finish_lable = document.createElement("lable");
		finish_lable.innerHTML = "";
		finish_lable.id = "finish_lable";
		document.body.appendChild(finish_lable);
	});
}




function finish() {
	if (query[1]=="search"){//coming from search page, definitely unfinshed
		alert("You have unfinished rooms!");
		return 0;
	} else {//just done a room
		for (i = 1; i < query.length; i++) {
		    if (parseInt(query[i].slice(-1)) == 0){
		    	alert("You have unfinished rooms!");
		    	return 0;
		    } 
		    console.log(parseInt(query[i].slice(-1)));
		};
		document.getElementById("finish_lable").innerHTML = "Done!";
	} 
}







