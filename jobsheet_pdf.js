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
var customerCode;
var current_id = 0;

var d = new Date();
document.getElementById("date").innerHTML = d;

var dbRefCus = firebase.database().ref().child('customers');
dbRefCus.once('value', function (snapshot) {
	snapshot.forEach(function(childSnapshot) {
	    var customersKey = childSnapshot.key;//list
	    var customersProperties = childSnapshot.val().properties;//list
	    var propertiesList = Object.keys(customersProperties);
	    for (i = 0; i < propertiesList.length; i++) {
	    	if(customersProperties[propertiesList[i]]==propertyCode){
	 			customerCode = customersKey;
		 	} 
	    }    
 	 });
	//console.log(customerCode);
  	var dbRefCus = firebase.database().ref().child('customers').child(customerCode);
	dbRefCus.once('value', function (snapshot) {
	    var customerInfo = snapshot.val();
	    var listInfo = Object.keys(customerInfo); //read customer info items
	    for (i = 0; i < listInfo.length; i++) {
	    	if(listInfo[i]!="properties"){
				document.getElementById(listInfo[i]).innerHTML = customerInfo[listInfo[i]];
	    	}       
	    }
	    document.getElementById("customer_code").innerHTML = customerCode;
	});
});

var dbRefProp = firebase.database().ref().child('properties').child(propertyCode);
dbRefProp.once('value', function (snapshot) {
	var propertyInfo = snapshot.val();
	var propertyListInfo = Object.keys(propertyInfo);
	for (i = 0; i < propertyListInfo.length; i++) {
    	document.getElementById(propertyListInfo[i]).innerHTML = propertyInfo[propertyListInfo[i]];     
	}
});

var dbRefJS = firebase.database().ref().child('job_sheets').child(propertyCode);
dbRefJS.once('value', function (snapshot) {
	var roomInfo = snapshot.val();
	var roomKey = Object.keys(roomInfo);//list of rooms
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Gen"){
			createCheck(roomKey[i]);
			break;
		}				
	}
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Bed"){
			createBedroom(roomKey[i]);
		}			
	}
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Bat"){
			createBathroom(roomKey[i]);
		}			
	}
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Kit"){
			createKitchen(roomKey[i]);
			break;
		}			
	}
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Lau"){
			createLaundry(roomKey[i]);
			break;
		}			
	}
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Dus"){
			createDusting(roomKey[i]);
			break;
		}			
	}
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Mop"){
			createMopping(roomKey[i]);
			break;
		}			
	}
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Vac"){
			createVacuuming(roomKey[i]);
			break;
		}			
	}
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Was"){
			createWashing(roomKey[i]);
			break;
		}			
	}
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Iro"){
			createIroning(roomKey[i]);
			break;
		}			
	}
	for (i = 0; i < roomKey.length; i++) {
		if (roomKey[i].slice(0,3) == "Fin"){
			createFinishing(roomKey[i]);
			break;
		}			
	}

});


function createCheck(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("Electricity power (e.g. Air-con, heater, lights, electric blankets)- turn off ", "electricity");
	createRow("Vent (through out the entire cleaning process) ", "vent");
	createRow("Check keys/cards", "keys");

	createExtraRow();
	createBr();

	var dbRefCheck = firebase.database().ref().child('job_sheets').child(propertyCode).child("General_Check");
	dbRefCheck.once('value', function (snapshot) {
		var checkInfo = snapshot.val();
		var checkKey = Object.keys(checkInfo);
		for (i = 0; i < checkKey.length; i++) {
			document.getElementById(checkKey[i]).innerHTML = checkInfo[checkKey[i]];		
		}	
		idChange("electricity");
		idChange("vent");
		idChange("keys");
		idChange("extra_iterm");
		idChange("extra_requirements");
	});

}


function createBedroom(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);

	var h3 = document.createElement("H3"); 
	h3.align = "left";
	var t3 = document.createTextNode("Strip");
	h3.appendChild(t3);
	document.getElementById("dyn").appendChild(h3);
	
	createRow("Protector", "strip_protector");
	createRow("Fitted sheet", "strip_fitted_sheet");
	createRow("Flat sheet", "strip_flat_sheet");
	createRow("Quilt cover", "strip_quilt_cover");
	createRow("Pillowcases", "strip_pillowcases");
	
	var h3_2 = document.createElement("H3"); 
	h3_2.align = "left";
	var t3_2 = document.createTextNode("Make");
	h3_2.appendChild(t3_2);
	document.getElementById("dyn").appendChild(h3_2);

	createRow("Pillowcases", "make_pillowcases");
	createRow("Protector", "make_protector");
	createRow("Fitted sheet", "make_fitted_sheet");
	createRow("Flat sheet", "make_flat_sheet");
	createRow("Quilt cover", "make_quilt_cover");	
	createRow("Other beddings (cushion, decoration)", "make_other_beddings");

	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("strip_protector");
		idChange("strip_fitted_sheet");
		idChange("strip_flat_sheet");
		idChange("strip_quilt_cover");
		idChange("strip_pillowcases");

		idChange("make_pillowcases");
		idChange("make_protector");
		idChange("make_fitted_sheet");
		idChange("make_flat_sheet");
		idChange("make_quilt_cover");
		idChange("make_other_beddings");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});


}

function createBathroom(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("Take all used towels/ face washers/ Bath mats away", "dirty_towels");
	createRow("Dry the floor & shower screen & basin", "dry");
	createRow("Wipe shower screens and mirror & dry with paper towels", "wipe");
	createRow("Clean drains", "drain");
	createRow("Wipe racks& taps & showerheads & dry with paper towels", "rack");
	createRow("Clean the basin", "basin");
	createRow("Wipe the surface", "surface");
	createRow("Wipe the bathtub", "bathtub");
	createRow("Check or replace shampoo/ body wash/ hand wash liquid", "replace");
	createRow("Change the rubbish bin bag", "bin");	
	createRow("Change toilet papers & put spare", "toilet_paper");
	createRow("Put clean towels", "clean_towels");
	createRow("Put clean hand towels", "clean_hand_towels");
	createRow("Put clean face wahsers", "clean_washers");
	createRow("Put clean bathmat", "clean_bathmat");	
	createRow("Brush toilet", "brush_toilet");

	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("dirty_towels");
		idChange("dry");
		idChange("wipe");
		idChange("drain");
		idChange("rack");
		idChange("basin");
		idChange("surface");
		idChange("bathtub");
		idChange("replace");
		idChange("bin");
		idChange("toilet_paper");
		idChange("clean_towels");
		idChange("clean_hand_towels");
		idChange("clean_washers");
		idChange("clean_bathmat");
		idChange("brush_toilet");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});
}

function createKitchen(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("Check dishwasher & put away all washed stuff", "dishwasher");
	createRow("Check the fridge & chuck remaining food away & wipe inside", "fridge");
	createRow("Check & wipe microwave/ oven/ cook top/ toaster (*Deep clean for extra)", "microwave");
	createRow("Wipe appliances (e.g., coffee machien, kettles)", "appliances");
	createRow("Wipe the bench top", "wipe");
	createRow("Check and replace hand wash liquid & dishwasher pacs", "replace");
	createRow("Top up supply (e.g., milk, tea, water, coffee, snack)", "supply");
	createRow("Take away dirty tea towels & put clean tea towels", "tea_towels");
	createRow("Change the rubbish bin bags & paper towels", "bin");
	createRow("Brush the sink & wipe the tap & dry with paper towels", "sink");	

	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("dishwasher");
		idChange("fridge");
		idChange("microwave");
		idChange("appliances");
		idChange("wipe");
		idChange("replace");
		idChange("supply");
		idChange("tea_towels");
		idChange("bin");
		idChange("sink");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});
}

function createLaundry(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("Wipe all the surface", "surface");
	createRow("Clean the sink", "sink");
	
	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("surface");
		idChange("sink");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});
}

function createDusting(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("Switches", "switches");
	createRow("Selves", "selves");
	createRow("Door handles", "handles");
	createRow("Tables & chairs & sofas (All surface)", "tables");
	createRow("Bedframes", "frames");
	createRow("Wipe mirrors/ wardrobes & dry with paper towels", "mirrors");
	createRow("Wipe windows/ flyscreens & dry with paper towels (if necessary)", "windows");	

	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("switches");
		idChange("selves");
		idChange("handles");
		idChange("tables");
		idChange("frames");
		idChange("mirrors");
		idChange("windows");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});
}

function createMopping(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("Mop all bathrooms", "bathrooms");
	createRow("Mop all other non-carpet area (e.g. laundry, kitchen)", "other");
	
	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("bathrooms");
		idChange("other");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});
}

function createVacuuming(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("All carpet area", "carpet");
	createRow("All floor corner (e.g., kitchen floor corner)", "corners");
	createRow("Vents (if necessary)", "vents");
	createRow("Fly screens (if necessary)", "fly_screens");
	
	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("carpet");
		idChange("corners");
		idChange("vents");
		idChange("fly_screens");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});
}

function createBelcony(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("Sweep the ground (if necessary)", "sweep");
	createRow("Check BBQ (*Cleaning for extra)", "bbq");
	createRow("Check and clean cobweb (if necessary)", "cobweb");
	createRow("Wipe tables & chairs", "wipe");
	
	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("sweep");
		idChange("bbq");
		idChange("cobweb");
		idChange("wipe");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});
}

function createWashing(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("Check the quantity of washing", "quantity");
	createRow("Identify the washings that need speical treatment (e.g., bleach)", "identify_special");
	
	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("quantity");
		idChange("identify_special");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});
}

function createIroning(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("Ironing", "ironing_requirement");
	
	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("ironing_requirement");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});
}

function createFinishing(room){
	var h = document.createElement("H2"); 
	var t = document.createTextNode(room);
	h.appendChild(t);
	document.getElementById("dyn").appendChild(h);
	
	createRow("Extra Area Cleaning", "extra_area");
	createRow("Check storage cabinet usage, report if need more supply", "check_utility");
	createRow("Take photos & report", "photo_report");
	createRow("Lock the doors & Leave keys for guests", "keys");
	
	createExtraRow();
	createBr();

	var dbRefRoom = firebase.database().ref().child('job_sheets').child(propertyCode).child(room);
	dbRefRoom.once('value', function (snapshot) {
		var roomitem = snapshot.val();
		var roomItemKey = Object.keys(roomitem);//list of items in each room
		for (i = 0; i < roomItemKey.length; i++) {
			document.getElementById(roomItemKey[i]).innerHTML = roomitem[roomItemKey[i]];     
		}

		idChange("extra_area");
		idChange("check_utility");
		idChange("photo_report");
		idChange("keys");

		idChange("extra_iterm");
		idChange("extra_requirements");

	});
}



function createRow(key,lable_id){
	var div = document.createElement("div");
	div.style.clear = "both";
	div.style.float = "left";
	div.style.width = "40%";
	div.style.fontWeight = 'bold';
	div.innerHTML = key;
	document.getElementById("dyn").appendChild(div); 

	var div2 = document.createElement("div");
	div2.style.float = "left";
	div2.style.width = "10%";
	div2.innerHTML = "&nbsp";
	document.getElementById("dyn").appendChild(div2);

	var div3 = document.createElement("div");
	div3.style.float = "left";
	div3.style.width = "50%";
	var l = document.createElement("lable");
	l.id = lable_id;                
	div3.appendChild(l);
	document.getElementById("dyn").appendChild(div3);

	divider();
}

function createExtraRow(){
	var div = document.createElement("div");
	div.style.clear = "both";
	div.style.float = "left";
	div.style.width = "40%";
	div.style.fontWeight = 'bold';
	var l = document.createElement("lable");
	l.id = "extra_iterm";                
	div.appendChild(l);
	document.getElementById("dyn").appendChild(div); 

	var div2 = document.createElement("div");
	div2.style.float = "left";
	div2.style.width = "10%";
	div2.innerHTML = "&nbsp";
	document.getElementById("dyn").appendChild(div2);

	var div3 = document.createElement("div");
	div3.style.float = "left";
	div3.style.width = "50%";
	var l3 = document.createElement("lable");
	l3.id = "extra_requirements";                
	div3.appendChild(l3);
	document.getElementById("dyn").appendChild(div3);

	divider(); 

}

function createBr(){
	document.getElementById("dyn").appendChild(document.createElement("br")); 
}

function divider(){
	var div = document.createElement("div");
	div.style.clear = "both";
	document.getElementById("dyn").appendChild(div); 
}

function idChange(id_name){
	var new_id = (++ current_id).toString();
	document.getElementById(id_name).id = new_id;
}

function genPDF(){
	
	var imgData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAlgCWAAD/4QCARXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAACWAAAAAQAAAJYAAAABAAKgAgAEAAAAAQAAAtOgAwAEAAAAAQAAAUsAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/iB+hJQ0NfUFJPRklMRQABAQAAB9hhcHBsAiAAAG1udHJSR0IgWFlaIAfZAAIAGQALABoAC2Fjc3BBUFBMAAAAAGFwcGwAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtYXBwbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC2Rlc2MAAAEIAAAAb2RzY20AAAF4AAAFnGNwcnQAAAcUAAAAOHd0cHQAAAdMAAAAFHJYWVoAAAdgAAAAFGdYWVoAAAd0AAAAFGJYWVoAAAeIAAAAFHJUUkMAAAecAAAADmNoYWQAAAesAAAALGJUUkMAAAecAAAADmdUUkMAAAecAAAADmRlc2MAAAAAAAAAFEdlbmVyaWMgUkdCIFByb2ZpbGUAAAAAAAAAAAAAABRHZW5lcmljIFJHQiBQcm9maWxlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtbHVjAAAAAAAAAB8AAAAMc2tTSwAAACgAAAGEZGFESwAAAC4AAAGsY2FFUwAAACQAAAHadmlWTgAAACQAAAH+cHRCUgAAACYAAAIidWtVQQAAACoAAAJIZnJGVQAAACgAAAJyaHVIVQAAACgAAAKaemhUVwAAABYAAALCbmJOTwAAACYAAALYY3NDWgAAACIAAAL+aGVJTAAAAB4AAAMgaXRJVAAAACgAAAM+cm9STwAAACQAAANmZGVERQAAACwAAAOKa29LUgAAABYAAAO2c3ZTRQAAACYAAALYemhDTgAAABYAAAPMamFKUAAAABoAAAPiZWxHUgAAACIAAAP8cHRQTwAAACYAAAQebmxOTAAAACgAAAREZXNFUwAAACYAAAQedGhUSAAAACQAAARsdHJUUgAAACIAAASQZmlGSQAAACgAAASyaHJIUgAAACgAAATacGxQTAAAACwAAAUCcnVSVQAAACIAAAUuYXJFRwAAACYAAAVQZW5VUwAAACYAAAV2AFYBYQBlAG8AYgBlAGMAbgD9ACAAUgBHAEIAIABwAHIAbwBmAGkAbABHAGUAbgBlAHIAZQBsACAAUgBHAEIALQBiAGUAcwBrAHIAaQB2AGUAbABzAGUAUABlAHIAZgBpAGwAIABSAEcAQgAgAGcAZQBuAOgAcgBpAGMAQx6lAHUAIABoAOwAbgBoACAAUgBHAEIAIABDAGgAdQBuAGcAUABlAHIAZgBpAGwAIABSAEcAQgAgAEcAZQBuAOkAcgBpAGMAbwQXBDAEMwQwBDsETAQ9BDgEOQAgBD8EQAQ+BEQEMAQ5BDsAIABSAEcAQgBQAHIAbwBmAGkAbAAgAGcA6QBuAOkAcgBpAHEAdQBlACAAUgBWAEIAwQBsAHQAYQBsAOEAbgBvAHMAIABSAEcAQgAgAHAAcgBvAGYAaQBskBp1KAAgAFIARwBCACCCcl9pY8+P8ABHAGUAbgBlAHIAaQBzAGsAIABSAEcAQgAtAHAAcgBvAGYAaQBsAE8AYgBlAGMAbgD9ACAAUgBHAEIAIABwAHIAbwBmAGkAbAXkBegF1QXkBdkF3AAgAFIARwBCACAF2wXcBdwF2QBQAHIAbwBmAGkAbABvACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjAG8AUAByAG8AZgBpAGwAIABSAEcAQgAgAGcAZQBuAGUAcgBpAGMAQQBsAGwAZwBlAG0AZQBpAG4AZQBzACAAUgBHAEIALQBQAHIAbwBmAGkAbMd8vBgAIABSAEcAQgAg1QS4XNMMx3xmbpAaACAAUgBHAEIAIGPPj/Blh072TgCCLAAgAFIARwBCACAw1zDtMNUwoTCkMOsDkwO1A70DuQO6A8wAIAPAA8EDvwPGA68DuwAgAFIARwBCAFAAZQByAGYAaQBsACAAUgBHAEIAIABnAGUAbgDpAHIAaQBjAG8AQQBsAGcAZQBtAGUAZQBuACAAUgBHAEIALQBwAHIAbwBmAGkAZQBsDkIOGw4jDkQOHw4lDkwAIABSAEcAQgAgDhcOMQ5IDicORA4bAEcAZQBuAGUAbAAgAFIARwBCACAAUAByAG8AZgBpAGwAaQBZAGwAZQBpAG4AZQBuACAAUgBHAEIALQBwAHIAbwBmAGkAaQBsAGkARwBlAG4AZQByAGkBDQBrAGkAIABSAEcAQgAgAHAAcgBvAGYAaQBsAFUAbgBpAHcAZQByAHMAYQBsAG4AeQAgAHAAcgBvAGYAaQBsACAAUgBHAEIEHgQxBEkEOAQ5ACAEPwRABD4ERAQ4BDsETAAgAFIARwBCBkUGRAZBACAGKgY5BjEGSgZBACAAUgBHAEIAIAYnBkQGOQYnBkUARwBlAG4AZQByAGkAYwAgAFIARwBCACAAUAByAG8AZgBpAGwAZXRleHQAAAAAQ29weXJpZ2h0IDIwMDcgQXBwbGUgSW5jLiwgYWxsIHJpZ2h0cyByZXNlcnZlZC4AWFlaIAAAAAAAAPNSAAEAAAABFs9YWVogAAAAAAAAdE0AAD3uAAAD0FhZWiAAAAAAAABadQAArHMAABc0WFlaIAAAAAAAACgaAAAVnwAAuDZjdXJ2AAAAAAAAAAEBzQAAc2YzMgAAAAAAAQxCAAAF3v//8yYAAAeSAAD9kf//+6L///2jAAAD3AAAwGz/wAARCAFLAtMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAcHBwcHBwwHBwwRDAwMERcRERERFx0XFxcXFx0jHR0dHR0dIyMjIyMjIyMqKioqKioxMTExMTc3Nzc3Nzc3Nzc/9sAQwEiJCQ4NDhgNDRg5pyAnObm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm/90ABAAu/9oADAMBAAIRAxEAPwDpKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKY0iqMk1Ue7HRalyS3KUW9i6SB1qPzo/Ws153eocmsnW7Gqo9zYEyHvUgIPSsPJqVJnU9aFW7g6PY2KKpJdA4Bq0rqwyDWqknsZOLW4+iiiqJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q6SiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACigkCoGnRaTaW40m9iemllHWqD3ZIwtVWdmPJrKVVLY1jSb3NJ7lFHFU2uXbOKrUVlKo2axppDizHqabRRWZoFFFOCk0ANopxUim0AFPDsvQ0yimIuJdMvDVbjnV6yKUEjpVxqNESppm4CD0pax0mdKtpdgnDVtGqmYypNF2io1lV+hqStUzNoKKKKBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9HpKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKaWUdTQA6iqklyq8Cqr3LseKzdRI0VNs0HlROpqs93g4WqBYt1pKydVvY2VJLcmad271FnNJRWTbe5oklsFFFLjNIYlFSrE7HpVlLQkfNVqDZDmkUgCelTx27P1rRSFEqXGK1jR7mUq3YqJaqOtWBGoGAKfRWqilsZOTe4xo1YYIqrJag8rV2ihxTBSa2MdoHWoiCOtbpANQvCj1k6PY1VbuY9FW3tWB4quUZeorFxa3NlJPYZRRRUlDgxXpVpLpl4NU6KpSa2JcU9zWW4RqnBB6VhVKszr0NaxrdzKVHsbNFUY7odGq0kqv0NbKaexi4NbklFFFUSFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//S6SiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopjSIvU1UkugPu1LkluUot7F0sB1qF7hFrOeZ371F1rGVbsbRo9y492eQtVWkZuSaZRWTk3uaqKWwUUUVJQUU4KT0qZLd2ppN7CbS3K9PVGboKvx2oHLVZVFXoK1jSfUylVXQoJasTzVpLdEqxRWyppGLqNiAAdKWiirICiiigAooooAKKKKACiiigAppRWGCKdRQBUa1U8iqbwOta9GAetZyppmkajRhEEdaSth4EeqklqRytYypNG0aqZSop7RsvUUyszS4U5WZelNopDLSXLr1q2lyjHFZVLWkajRnKmmbgYHpS1jLK69DVtLsfxVtGqnuYypNbF6io1lV+hqStUzJoKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0+kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKQkDrUL3CKOtJtLcaTexPTS6r1NZz3THpVcuzdTWTqroaqk+poyXKr93mqb3Dt04qvRWUqjZrGmkOLMepptFFZmgUUU8IzcAUxDKUAnpVtLVjyauJAijpWkaTZnKqkZqwu3arKWnPzVeAA6UtaqkkZOq2RrEi9BUmAKKK0SM2wooopiCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGsisMEVWe1U9Kt0VLinuUpNbGS0DqelQEEda3cA1C8CPWUqPY1jW7mPRV2S1I5WqzRsvUVi4tbmykmR0UtJUlDgzL0NTpcuvBqtRVKTWxLinuaqXKN1qdWVuhrEqRJXToa1jW7mUqPY2aKoR3X96rayo3Q1sppmLg0SUUUVRIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/1OkooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKaXUdaAHUVTe6UHAqq1w7ZrN1EjRU2zSaVUGSaqPd8YWqRYnrTaylVb2No0ktyZ53eoqSism29zRJLYKKKXFIYlFTLC7dBVuO1HVqtQbIc0igFJ6VOtu7GtFYkUcCpK1VHuZOt2KiWqgc1YCKvQU+itVFLYycm9woooqiQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmlFPUU6igCrJbK3Iqm9u61rUYrOVNM0jUaMIgjrSVstEjDGKpyWpH3axlSa2No1U9ylRUjRspwajrOxpcKcGI5FNopDLK3LrwauJcow5rKorRVGjN00zdDBulLWMkrp0NWo7rs1bRqp7mMqTWxfoqJZUboalrRO5m1YKKKKYgooooAKKKKACiiigAooooAKKKKACiiigAooooA//V6SiiigAooooAKKKKACiiigAoooJAoAKKgadFOKge75+Woc0i1BsulgOtQtcItZryu/U1HWTrdjVUe5ae6Y/dquXZupplFZOTe5qopbBRRRUlBRTgjHoKsJbMTzVKLexLkluVaeEY1opbKvWrARVGAK0VF9TN1l0M9LUnk1aW3RetWKK2VNIxdRsQADpS0UVZAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFACFQetVntlbpVqipcU9ylJrYyZLdkqEqR1rcxmoniV6ylR7Gsa3cxqKvPanHy1WaF16isnBo1U0yKilxikqCxQSORVhLl1PNVqKak1sJxT3NVLlGHNWAwPSsKpFldehraNbuYyo9jaoqhHddmqys6NWqmmZODRNRSAg9KWrICiiigAooooAKKKKACiiigAooooA//W6SiiigAooooAKKKazBRk0AOzUbSovU1ny3DM3y9KrlietYSq9jaNLuXnu+flqq07t3qGisnNs2UEhSSetJRRUFhRRRQAUtJS0ASpCW74q0kEY6nNUdzetG9vWrTS6EOLfU1gYlGBin+YnrWLuPrS7j61p7byM/Y+ZuUVRt7j+FqvVtGSaujGUWnZhRRRVEhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRTXcIMmq/2pKlyS3KUW9i1RUMcyydKrSXRVsChzSVxqDbsX6KzftbVbEv7reaSmmDg0T0Vm/a2qeGcvnNJVEwdNrUt0VQe6IJApFuiTzR7RD9mzQopu8AAnim+anrV3RFmSUU0OrdDTqYgooooAKKKKACiiigAooooAKQgHrS0UAV3t1bpVSS2ZeRWnVd7hFODWcoR6mkZy6GWUZeoptaLTRN1qq/ln7tc8opbM6Iyb3RBRRRUFhS5xSUUATJM6VaS7BPzVn0Vam0Q4Jm2siN0NPrDDMOhq1HdEcNW0aq6mMqT6GlRUMcyvwKmrVO+xk1bcKKKKYgooooAKKKKAP/1+kooooAKKKKACq1z9yrNRyJvXFTJXRUXZmLRUskTI2KjwfSuNo7ExKKXB9KMH0oGJRS4PpRg0CEop20+lG0+lADaKdtPpRtPpQA2inbTSEEUgEooooGOT7wrbX7tZNuAX5rXrporQ5qz1sFFFFbGIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBUu/u1mVpXf3aza5avxHVS+Eu2nU1Wk++angO1GPtVU8mlJ+6kOK95sKuSPtgCjvVMdannPIX0qU7JjkrtFerSHZCT61WqeU4RVoXccuxXqSNdzgVHViHjLntSW4Seg6eQ5CA8Cq2T60rHJJptDd2CVkTRu4bC1dln8vA71WgAGZD2qB2LsSatSaRDimy+t0p61ZWRW6GsWtK2iwNxrSnNt2IqQSVy3RRRW5gFFFFABRRRQAUUUUAVbiXYMCswkk5NWbr79Va5KjuzrpqyCiiiszQKKKKACiiigAooooAKKKKAHKxU5FasMvmLzWTWnbIVXJrak3cxqpWLVFFFdJzBRRRQAUUUUAf/Q6SiiigAooooAKKKKAGlFbqKTy09KfRSsO4zy09KPLT0p9FFkF2M8tPSjy09KfRRZBdjPLT0o8tPSn0UWQXYzy09KPLT0p9FFkF2M8tPSqNztHygVo1lXLAvxWdXRGlLVlaiiiuU6i7aKCc1o1VtVATNWq7KasjjqO7CiiirICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAKt0pKcVl1szf6s1jnrXNWWp00XoTocRtVepQf3ZqKsmaLqOX71OkOXNInWmk5NA+oq8kU6Q5b6Uidc00nJzQHUSpidsYX1qIcmnOcn6UCYylAycUlSR8Hce1A2SSNtURj8ar05iWOTTo0LtinuxLRE9vDvOTWkAAMCmooRcCn11QjZHLOV2FFFFWQFFFFABRRRQAUh6UtMkOEJFJjRkyklzmoqcxJOTTa4nudq2F61aS1Zhmqy/eFbSfdFaU4p7mdSTWxQ+yNR9katGitvZRMfayM77I1H2Rq0aKPZRD2sjO+yNR9katGij2UQ9rIzvsjUfZDWjRR7KIe1kUUtcHJq6AAMCloqoxS2JlJvcKKKKokKKKKACiiigD/9HpKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBG6GsaT75rVm+4axz1rnrPodFFdRKUc0lOUZYVibGtApVBmpqan3RTq7UtDib1CiiimIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAim/wBWaxz1rYm/1ZrHPWuetudFHYdn5aZS54pKwNhQcUlFFAxc0lFFACjikoooAKeThcUylNAgAycVqW8WwZNU7eMs2T0rVHFdFKPUwqy6BRRRW5gFFFFABRRRQAUUUUAFV7htqVYqldsMYqJuyLgrsz6SiiuM7CaEAuAa1wMDFZtqmWzWnXVSWhy1XqFFFFamQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/0ukooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAKt0xCcVl1rzxmRcCqf2V656kW2dFOSSKlWLcEvT/sr1ZghMZ5qYQd9SpTVtC1RRRXUcoUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAMddykVjuNrEVtnkVQa2LPk9KxqxvsbUpW3KFLg1pLaqDk1N5KelQqTLdVGV5b+lAic9q2do9KMCq9iT7Yy/s0lL9letSiq9kifasyjbSAZqLyn9K2qTApOihqszFMbjkikVSxxW0VUjBFNESA5ApexH7YIk2LipKKK2SsYt3CiiimIKKKKACiiigAooooAKzLogtWmaz5LdmYms6ibVkaU2k7so0Vb+yvR9leufkZ0c67k9qmBuq5UMKFFwamrqgrI5Zu7CiiiqJCiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9PpKKKKACiiigAooooAKKKKAGs6r1pnnR+tUrpjuxVTJrCVWzsbxpXVzY86P1pfOT1rGyakjBZwKSqsbpI2aKRRgYpa6DnCkJAGTS1SupMDaKmTsrlRjd2LHnJ60edH61j5NGTWPtmbexRsecnrUvWsRMlgBWygwozWkJ8xnOHKOooorQzCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqMyoOM0SnCGscsc1lOfKawhzGv50frR50frWPk0ZNR7Zl+xRsedH60edH61j5NGTR7Zh7FGx50frR50frWPk0ZNHtmHsUbHnR+tHnR+tY+TRk0e2YexRsedH61IrBhkViAknFa0ClU5q4TcmROCiiaiiitTIKKKKACiiigAooooAKKKKAEJAGTUfnJ61DcvhcA1m5NYzqWdjaFO6ubHnR+tOWRW6GsXJqeBjvFJVbsbpWRrUUCitzAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//1OkooooAKKKKACiiigAoopGICkmgDKuG3PVepJDlyRUdcUndnbFWQVZtlJfIqtV+0704K7FN2RfooorsOMKyrl9z4rUPSseb/WGsaz0NqK1IqKKK5jpJ4P8AWCtes60HzVo11UloctV6hRRRWpkFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFS6JC1mVeuixOBVPa3pXLU1Z1U9ENop21vSjaRWdjS42iiikMKKKUAnpQAlFO2t6UbW9KdhXFQEsAK2UGFANZkCNvBxWrXRRXU56z6BRRRWxiFFFFABRRRQAUUUUAFFFB6UAZt396qdTTnMhqGuObuztgrIKt2qgtk1UrRtU43U6auyajsi7RRRXWcgUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//1ekooooAKKKKACiiigAqOY4Q1JVS6Py4qZOyKirszT1pKKK4jtCtW2HyVljk1sxKFQYraitbmNZ6WJKKKK6TmGSfcNYrdTWrcsQnFZNc1Z6nTRWgUUUo5OKxNjRtVAXNXKhgXagqau2Csjim7sKKKrzTCMYHWm3b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oooAKilYKhzUtRTIXXApS20HHfUxzyaSrf2VqPsr1yckux186KlatqCEqsLVs1oIu1QK1pQad2ZVZpqyHUUUVuYEcrBUJNYxOTWxMhdcCqP2V6wqpt6G9JpLUqUVb+yvR9lasuRmvOixafdq3UcSbFxUldUVZWOWTu7hTJE3rin0VTRKZiyRlDg1HW28av1FU3tf7tc0qTWx0xqp7lCipmhcHGKQQuTjFZ8rNOZEVFW/srVZjtlXk1SptkuokV4ICx3NWkAAMCkAAGBS10xioo5pScmFV7gkJxViopkLrgUS2CO5jUVb+yvR9leuXkkdXOisoJYAVsxjCgVSjtmVgTWgOlbUo23Masr7BVG76VeqnNC8jVdTbQinvqZtFW/sr0fZXrm5H2OnnRHAu5xWuOBVKGBkbJq7W9KNlqYVZXegVmXX360zVCS3d2zTqJtWQqbSd2UKKt/ZXo+yvXPyPsdHOhbVMtmtKqsERj61arppqyOao7sKKKKsgKr3DBUxViq88ZkHFTLbQqO+plUlW/sr0fZXrl5Jdjq50Va14BhBVNbVgc1oqMDFa0otasyqyT0QtFFFbmAUjAMMGlooAyp4ShyOlVq3WUMMGqb2o6rXPOl1R0Qq9GZ1FWWtnAzUXlP6Vk4tGqkmR0VOsDscYqUWrZ5pqDYOaRUAJ6Vct4TncatJAiVOBjpWsKVtWYzq30QUUUVuYFeePevFZRBBwa3arS26vyOtY1Kd9UbU6ltGZVFW/srUfZXrHkfY250VR1rYhACDFU1tWzzWgo2jFbUotbmNWSewtFFFbGIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//0+kooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKADApMClooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKTApaKADAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==";
	var pdf = new jsPDF('p', 'pt', 'letter');
	pdf.addImage(imgData, 'JPEG', 20, 20, 93, 42);

	pdf.setFont('helvetica');
	pdf.setFontSize(8);
	pdf.text(25,75,"Generated Date: " + d);

	pdf.setTextColor(243, 146, 51);
	pdf.setFont('helvetica');
	pdf.setFontType('bold');
	pdf.setFontSize(25);
	pdf.text(120,60,"Sunny Homtel Service");
	
	pdf.internal.scaleFactor = 2.25;
	var options = {
		background: '#fff',
        pagesplit: true
    };


	pdf.addHTML($("#main"), 20,100, options, function()
	{
	    pdf.save(propertyCode +"_JobSheet.pdf");
	});

	// html2canvas($("#main"),{
	// 	onrendered: function (canvas){
	// 		var img = canvas.toDataURL ("image/png");
	// 		var imgWidth = 210;
	// 		var pageHeight = 295;
	// 		var imgHeight = canvas.height * imgWidth / canvas.width;
	// 		var heightLeft = imgHeight;

	// 		var doc = new jsPDF('p', 'mm');
	// 		var position = 0;

	// 		doc.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
	// 		heightLeft -= pageHeight;

	// 		while (heightLeft >= 0) {
	// 		position = heightLeft - imgHeight;
	// 		doc.addPage();
	// 		doc.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
	// 		heightLeft -= pageHeight;
	// 		}
	// 		doc.save( 'file.pdf');﻿

	// 	}

	// });
	
}

function back() {
	window.location.href = "main.html";
}










