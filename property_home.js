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
		//console.log(listRoom);
		var numRoom = Object.keys(property).length;
		for (i = 0; i < numRoom; i++) {
				roomDoneList = roomDoneList+"&"+listRoom[i]+ "=0";				
				var button = document.createElement("button");				
				var text = document.createTextNode(listRoom[i]);
				button.appendChild(text);
				button.style.color = "#313131";
				button.style.backgroundColor = "#F6F6F6";
				button.style.fontWeight = 'bold';
				button.style.border = "1px solid #F6F6F6;";
				button.style.borderRadius="4px"
				button.style.boxShadow ="2px 2px 1px #DDDDDD";
				button.style.width = "20%";
				button.style.height = "1cm";
				button.id = listRoom[i];
				button.onclick = (function (roomType, propertyCode) { //jump to room job sheet page
					if (roomType.slice(0,3) == "Bed" || roomType.slice(0,3) == "Bat") {
						var  name_query = roomType.split("_");
						var roomName = name_query[0];
						location.href = roomName+"_job_sheet.html?" + propertyCode + "&" + roomType + roomDoneList;
					}
					else{
						location.href = roomType+"_job_sheet.html?" + propertyCode + "&" + roomType + roomDoneList;	
					}
				}).bind(null, listRoom[i], propertyCode);

				
				if (listRoom[i].slice(0,3) == "Gen"){
					putBtn("check", button);
				}
				if (listRoom[i].slice(0,3) == "Bed"){
					putBtn("bedroom", button);
				}
				if (listRoom[i].slice(0,3) == "Bat"){
					putBtn("bathroom", button);
				}
				if (listRoom[i].slice(0,3) == "Kit"||listRoom[i].slice(0,3) == "Lau"){
					putBtn("kl", button);
				}
				if (listRoom[i].slice(0,3) == "Dus"||listRoom[i].slice(0,3) == "Mop"||listRoom[i].slice(0,3) == "Vac"){
					putBtn("dmv", button);
				}
				if (listRoom[i].slice(0,3) == "Bel"){
					putBtn("belcony", button);
				}
				if (listRoom[i].slice(0,3) == "Was"){
					putBtn("washing", button);
				}
				if (listRoom[i].slice(0,3) == "Iro"){
					putBtn("ironing", button);
				}
				if (listRoom[i].slice(0,3) == "Fin"){
					putBtn("finishing", button);
				}
				
		}
		createFinBtn();	
	});

} else { //just done a room
	var roomDoneList = ""; 
	for (i = 1; i < query.length; i++) {
	    roomDoneList = roomDoneList +"&" + query[i];	    
	};
	//console.log(roomDoneList);
	var dbRefJobSheet = firebase.database().ref().child('job_sheets').child(propertyCode);
	dbRefJobSheet.on('value', function (snapshot){
		var property = snapshot.val();
		var listRoom = Object.keys(property);
		var numRoom = Object.keys(property).length;
		console.log(listRoom);

		for (i = 0; i < numRoom; i++) {
			var button = document.createElement("button");
			var text = document.createTextNode(listRoom[i]);
			button.appendChild(text);
			button.style.color = "#313131";
			button.style.backgroundColor = "#F6F6F6";
			button.style.fontWeight = 'bold';
			button.style.border = "1px solid #F6F6F6;";
			button.style.borderRadius="4px"
			button.style.boxShadow ="2px 2px 1px #DDDDDD";
			button.style.width = "20%";
			button.style.height = "1cm";
			button.id = listRoom[i];
			button.onclick = (function (roomType, propertyCode) { //jump to room job sheet page
				//roomType.slice(0,-2) is to ignore the index of a room
				if (roomType.slice(0,3) == "Bed" || roomType.slice(0,3) == "Bat") {
					var  name_query = roomType.split("_");
					var roomName = name_query[0];
					location.href = roomName+"_job_sheet.html?" + propertyCode + "&" + roomType + roomDoneList;
				}
				else{
					location.href = roomType+"_job_sheet.html?" + propertyCode + "&" + roomType +roomDoneList;	
				}
			}).bind(null, listRoom[i], propertyCode);

			if (listRoom[i].slice(0,3) == "Gen"){
				putBtn("check", button);
			}
			if (listRoom[i].slice(0,3) == "Bed"){
				putBtn("bedroom", button);
			}
			if (listRoom[i].slice(0,3) == "Bat"){
				putBtn("bathroom", button);
			}
			if (listRoom[i].slice(0,3) == "Kit"||listRoom[i].slice(0,3) == "Lau"){
				putBtn("kl", button);
			}
			if (listRoom[i].slice(0,3) == "Dus"||listRoom[i].slice(0,3) == "Mop"||listRoom[i].slice(0,3) == "Vac"){
				putBtn("dmv", button);
			}
			if (listRoom[i].slice(0,3) == "Bel"){
				putBtn("belcony", button);
			}
			if (listRoom[i].slice(0,3) == "Was"){
				putBtn("washing", button);
			}
			if (listRoom[i].slice(0,3) == "Iro"){
				putBtn("ironing", button);
			}
			if (listRoom[i].slice(0,3) == "Fin"){
				putBtn("finishing", button);
			}

			var  name_query2 = query[i+1].split("=");
			if (parseInt(name_query2[1])>0){//find the room we just done
				var  name_query2 = query[i+1].split("=");
				console.log(name_query2[0]);//grab this room name, it id button id
				document.getElementById(name_query2[0]).style.backgroundColor = "green";
	   		}

		}
		createFinBtn();		
	});
}

function mouseOver(btn) {
    document.getElementById(btn).style.color = "blue";
}


function putBtn(room, button){

	document.getElementById(room).appendChild(button);

	linebr(room);
	linebr(room);

}

function linebr(room){
	var line_break = document.createElement("br");
	document.getElementById(room).appendChild(line_break);
}

function createFinBtn(){
	var finish_button = document.createElement("button");
	var finish_text = document.createTextNode("Finish Cleaning - Preview Cleaning Report");
	finish_button.style.color = "#313131";
	finish_button.style.backgroundColor = "#F6F6F6";
	finish_button.style.fontWeight = 'bold';
	finish_button.style.border = "1px solid #F6F6F6;";
	finish_button.style.borderRadius="4px"
	finish_button.style.boxShadow ="2px 2px 1px #DDDDDD";
	finish_button.style.width = "50%";
	finish_button.style.height = "1cm";
	finish_button.onclick = (function () { 
							console.log("finish");
							finish();
							});
	finish_button.appendChild(finish_text);
	document.getElementById("finish").appendChild(finish_button);
}

function finish() {
	if (query[1]=="search"){//coming from search page, definitely unfinshed
		alert("You have unfinished rooms!");
		return 0;
	} else {//just done a room
		for (i = 1; i < query.length; i++) {

			//console.log(query[i]);
			var  name_query3 = query[i].split("=");
			//console.log(name_query3);
		    if (parseInt(name_query3[1]) == 0){
		    	alert("You have unfinished rooms!");
		    	return 0;
		    } 
		};
		window.location.href = "report_pdf.html";
	} 
}







