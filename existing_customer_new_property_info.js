//initialize Firebase
var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);
var propertyCode = window.location.search.substring(1);

function generateServiceCode() {

	if (document.getElementById('washingYes').checked && document.getElementById('ironingYes').checked) {
	}
	if (document.getElementById('washingYes').checked && document.getElementById('ironingNo').checked) {
	}
	if (document.getElementById('washingNo').checked && document.getElementById('ironingYes').checked) {
	}
	if (document.getElementById('washingNo').checked && document.getElementById('ironingNo').checked) {
	}

	if (document.getElementById('cleaningYes').checked) {
		if (document.getElementById('washingYes').checked) {
			if (document.getElementById('ironingYes').checked) {
				document.getElementById("service_code").innerHTML = document.getElementById("numBed").value + 'B' + document.getElementById("numBath").value + 'T' + "1K" + "WI"
			} else if (document.getElementById('ironingNo').checked) {
				document.getElementById("service_code").innerHTML = document.getElementById("numBed").value + 'B' + document.getElementById("numBath").value + 'T' + "1K" + "W"
			}
		} else if (document.getElementById('washingNo').checked) {
			if (document.getElementById('ironingYes').checked) {
				document.getElementById("service_code").innerHTML = document.getElementById("numBed").value + 'B' + document.getElementById("numBath").value + 'T' + "1K" + "I"
			} else if (document.getElementById('ironingNo').checked) {
				document.getElementById("service_code").innerHTML = document.getElementById("numBed").value + 'B' + document.getElementById("numBath").value + 'T' + "1K"
			}
		}
		
	} else if (document.getElementById('cleaningNo').checked){
		if (document.getElementById('washingYes').checked){
			if (document.getElementById('ironingYes').checked) {
				document.getElementById("service_code").innerHTML = "WI"
			} else if (document.getElementById('ironingNo').checked) {
				document.getElementById("service_code").innerHTML = "W"
			}
		} else  if (document.getElementById('washingNo').checked) {
			if (document.getElementById('ironingYes').checked) {
				document.getElementById("service_code").innerHTML = "I"
			} else if (document.getElementById('ironingNo').checked) {
				alert("Please choose a service!");
			}
		} 
	} else {
		alert("Please choose a service!");
	}	
	 
}

function writePropertyInfo() { //write property info to database
	//test reading from input field in html:
	// var p = document.createElement("p");
	// var textp = document.createTextNode(customerCode.value);
	// p.appendChild(textp);
	// document.body.appendChild(p);
	var propertyType = null;
	if (document.getElementById('unit').checked) {
  		propertyType = document.getElementById('unit').value;
	} else if (document.getElementById('apartment').checked) {
		propertyType = document.getElementById('apartment').value;
	} else if (document.getElementById('townhouse').checked) {
		propertyType = document.getElementById('townhouse').value;
	} else if (document.getElementById('house').checked) {
		propertyType = document.getElementById('house').value;
	}

	var parking = null;
	if (document.getElementById('parkingYes').checked) {
  		parking = document.getElementById('parkingYes').value;
	} else if (document.getElementById('parkingNo').checked) {
		parking = document.getElementById('parkingNo').value;
	} 

	var frontDoorLockType = null;
	if (document.getElementById('frontDoorKey').checked) {
  		frontDoorLockType = document.getElementById('frontDoorKey').value;
	} else if (document.getElementById('frontDoorPK').checked) {
		frontDoorLockType = document.getElementById('frontDoorPK').value;
	} else if (document.getElementById('frontDoorPasscode').checked) {
		frontDoorLockType = document.getElementById('frontDoorPasscode').value;
	}

	var utilityLockType = null;
	if (document.getElementById('utilityKey').checked) {
  		utilityLockType = document.getElementById('utilityKey').value;
	} else if (document.getElementById('utilityPK').checked) {
		utilityLockType = document.getElementById('utilityPK').value;
	} else if (document.getElementById('utilityPasscode').checked) {
		utilityLockType = document.getElementById('utilityPasscode').value;
	}

	
	var cleaning = null;
	if (document.getElementById('cleaningYes').checked) {
  		cleaning = document.getElementById('cleaningYes').value;
	} else if (document.getElementById('cleaningNo').checked) {
		cleaning = document.getElementById('cleaningNo').value;
	} 

	var washing = null;
	if (document.getElementById('washingYes').checked) {
  		washing = document.getElementById('washingYes').value;
	} else if (document.getElementById('washingNo').checked) {
		washing = document.getElementById('washingNo').value;
	} 

	var ironing = null;
	if (document.getElementById('ironingYes').checked) {
  		ironing = document.getElementById('ironingYes').value;
	} else if (document.getElementById('ironingNo').checked) {
		ironing = document.getElementById('ironingNo').value;
	}

	generateServiceCode();
	firebase.database().ref('properties/' + propertyCode).set({
		property_type: propertyType,
		property_street: document.getElementById("propertyStreet").value,
		property_city: document.getElementById("propertyCity").value,
		property_state: document.getElementById("propertyState").value,
		property_postcode: document.getElementById("propertyPostcode").value,
		property_country: document.getElementById("propertyCountry").value,
		num_bedroom: document.getElementById("numBed").value,
		num_bathroom: document.getElementById("numBath").value,
		parking_provided: parking,
		front_door_lock_type: frontDoorLockType,
		front_door_access: document.getElementById("frontDoorAccess").value,
		utility_lock_type: utilityLockType,
		utility_access: document.getElementById("utilityAccess").value,

		cleaning: cleaning,
		washing: washing,
		ironing: ironing,
		service_code : document.getElementById("service_code").innerText
	});


	//generate corresponding HTML pages according to property setting,
	// and then write service requirement to database
	//assume the number of bedroom is 2
	
}



function writeJobSheetInfo() {
	writePropertyInfo();
	firebase.database().ref('job_sheets/' + propertyCode).set({
		bedroom_1:'null'
	});
	
}

function nextRoom() {
	console.log ("in");
	if (document.getElementById('cleaningYes').checked) {
		if (document.getElementById('washingYes').checked) {
			if (document.getElementById('ironingYes').checked) {
				window.location.href = 'bedroom_requirement.html'+'?'+propertyCode+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'bedroom'+"&"+'1'+"&"+"W"+"&"+"I";
			} else if (document.getElementById('ironingNo').checked) {
				window.location.href = 'bedroom_requirement.html'+'?'+propertyCode+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'bedroom'+"&"+'1'+"&"+"W"+"&"+"!";
			}
		} else if (document.getElementById('washingNo').checked) {
			if (document.getElementById('ironingYes').checked) {
				window.location.href = 'bedroom_requirement.html'+'?'+propertyCode+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'bedroom'+"&"+'1'+"&"+"!"+"&"+"I";
			} else if (document.getElementById('ironingNo').checked) {
				window.location.href = 'bedroom_requirement.html'+'?'+propertyCode+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'bedroom'+"&"+'1'+"&"+"!"+"&"+"!";
			}
		}
		
	} else if (document.getElementById('cleaningNo').checked){
		if (document.getElementById('washingYes').checked){
			if (document.getElementById('ironingYes').checked) {
				window.location.href = 'washing_requirement.html'+'?'+propertyCode+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'washing'+"&"+'0'+"&"+"W"+"&"+"I";
			} else if (document.getElementById('ironingNo').checked) {
				window.location.href = 'washing_requirement.html'+'?'+propertyCode+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'washing'+"&"+'0'+"&"+"W"+"&"+"!";
			}
		} else  if (document.getElementById('washingNo').checked) {
			if (document.getElementById('ironingYes').checked){
				window.location.href = 'ironing_requirement.html'+'?'+propertyCode+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'ironing'+"&"+'0'+"&"+"!"+"&"+"I";
			} else if (document.getElementById('ironingNo').checked) {
				alert("Please choose a service!");
			}
		} 
	} else {
		alert("Please choose a service!");
	}	

}

