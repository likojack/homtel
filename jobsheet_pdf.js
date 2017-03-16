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
	h3.align = "center";
	var t3 = document.createTextNode("Strip");
	h3.appendChild(t3);
	document.getElementById("dyn").appendChild(h3);
	
	createRow("Protector", "strip_protector");
	createRow("Fitted sheet", "strip_fitted_sheet");
	createRow("Flat sheet", "strip_flat_sheet");
	createRow("Quilt cover", "strip_quilt_cover");
	createRow("Pillowcases", "strip_pillowcases");
	
	var h3_2 = document.createElement("H3"); 
	h3_2.align = "center";
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
	//createBr(); 
	document.getElementById("dyn").appendChild(div); 

	var div2 = document.createElement("div");
	div2.style.float = "left";
	div2.style.width = "60%";
	var l = document.createElement("lable");
	l.id = lable_id;                
	div2.appendChild(l);
	//createBr(); 
	document.getElementById("dyn").appendChild(div2);

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
	//createBr();  
	document.getElementById("dyn").appendChild(div); 

	var div2 = document.createElement("div");
	div2.style.float = "left";
	div2.style.width = "60%";
	var l2 = document.createElement("lable");
	l2.id = "extra_requirements";                
	div2.appendChild(l2);
	//createBr(); 
	document.getElementById("dyn").appendChild(div2);

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










