//initialize Firebase
var config = {
    apiKey: "AIzaSyAoh8pzoi-rZ8X0OVHi3JT1_YmH6fZCkgI",
    authDomain: "homtel-63eec.firebaseapp.com",
    databaseURL: "https://homtel-63eec.firebaseio.com",
    storageBucket: "homtel-63eec.appspot.com",
    messagingSenderId: "389458058945"
  };
  firebase.initializeApp(config);

function generateCustomerCode(){
	if(document.getElementById("fName").value == ""){
		alert("please input customer's first name!");
	} else if(document.getElementById("lName").value == ""){
		alert("please input customer's last name!");
	} else {
		var first_name = document.getElementById("fName").value.slice(0,1).toUpperCase();
		var last_name = document.getElementById("lName").value.toUpperCase();
		var name = first_name + last_name;
		var dbRefCustomer = firebase.database().ref("customers/");
		dbRefCustomer.once('value').then(function (snapshot) {
		    var customerContent = snapshot.val();
		    if (customerContent == null){
		    	document.getElementById("customer_code").innerHTML = name + "01";
		    } else {
		    	var listCustomer = Object.keys(customerContent);
			    var counter = 0;
			    for (i = 0; i < listCustomer.length; i++) {
			    	if(listCustomer[i].slice(0,-2) == name){
			    		counter = counter + 1;
			    	}
			    }
			    var order = (("0" + (counter + 1)).slice(-2)).toString();
			    document.getElementById("customer_code").innerHTML = name + order;
			}
		});
	}
	    
}

function writeCustomerInfo() { //write customer info to database
	
	if(document.getElementById("mobile").value == ""){
		alert("please input the mobile!");
	} else if(document.getElementById("email").value == ""){
		alert("please input the email!");
	} else if (document.getElementById("billStreet").value == "" ||
		document.getElementById("billCity").value == "" ||
		document.getElementById("billState").value == "" ||
		document.getElementById("billPostcode").value == "" ||
		document.getElementById("billCountry").value == ""){
		alert("please input the billling address correctly!");
	} else {
		var info_task = firebase.database().ref('customers/' + document.getElementById("customer_code").innerHTML).set({
		first_name: document.getElementById("fName").value,
		last_name: document.getElementById("lName").value,
		mobile: document.getElementById("mobile").value,
		contact_number_2: document.getElementById("contactNumber2").value,
		email: document.getElementById("email").value,
		bill_street: document.getElementById("billStreet").value,
		bill_city: document.getElementById("billCity").value,
		bill_state: document.getElementById("billState").value,
		bill_postcode: document.getElementById("billPostcode").value,
		bill_country: document.getElementById("billCountry").value,
		properties: 'null'
		});
		return info_task;
	}
	
}


function generateServiceCode() {

	if(document.getElementById("numBed").value == ""){
		alert("please input the number of bedrooms!");
	} else if(document.getElementById("numBath").value == ""){
		alert("please input the number of bathrooms!");
	} else {
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
	 
}

function generatePropertyCode(){
	generateCustomerCode();
	var customerCode = document.getElementById("customer_code").innerHTML;
	var propertyTypecode = null;
	if (document.getElementById('unit').checked) {
  		propertyTypecode = document.getElementById('unit').value.slice(0,1).toUpperCase();
	} else if (document.getElementById('apartment').checked) {
		propertyTypecode = document.getElementById('apartment').value.slice(0,1).toUpperCase();
	} else if (document.getElementById('townhouse').checked) {
		propertyTypecode = document.getElementById('townhouse').value.slice(0,1).toUpperCase();
	} else if (document.getElementById('house').checked) {
		propertyTypecode = document.getElementById('house').value.slice(0,1).toUpperCase();
	}
	if(document.getElementById("propertyStreet").value == "" ||
		document.getElementById("propertyCity").value == "" ||
		document.getElementById("propertyState").value == "" ||
		document.getElementById("propertyPostcode").value == ""||
		document.getElementById("propertyCountry").value == ""){
		alert("please input the property address correctly!");
	} else if (propertyTypecode == null){
		alert("please select a property type!");
	} else {
		var propertyPostcode = document.getElementById("propertyPostcode").value;
		var code = customerCode + propertyPostcode + propertyTypecode;
		var dbRefProperty = firebase.database().ref("properties/");
		dbRefProperty.once('value').then(function (snapshot) {
		    var propertyContent = snapshot.val();
		    if (propertyContent == null){
		     	document.getElementById("property_code").innerHTML = code + "01";
		    } else {
			    var listProperty = Object.keys(propertyContent);
			    var counter = 0;
			    for (i = 0; i < listProperty.length; i++) {
			    	if(listProperty[i].slice(0,-2) == code){
			    		counter = counter + 1;
			    	}
			    }
			    var order = (("0" + (counter + 1)).slice(-2)).toString();
			    document.getElementById("property_code").innerHTML = code + order;
			}
		});
	}
	
}

function writePropertyInfo() { //write property info to database
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
	
	info_task = firebase.database().ref('properties/' + document.getElementById("property_code").innerHTML).set({
		property_type: propertyType,
		property_street: document.getElementById("propertyStreet").value,
		property_city: document.getElementById("propertyCity").value,
		property_state: document.getElementById("propertyState").value,
		property_postcode: document.getElementById("propertyPostcode").value,
		property_country: document.getElementById("propertyCountry").value,
		num_bedroom: document.getElementById("numBed").value,
		num_bathroom: document.getElementById("numBath").value,
		parking_provided: parking,
		parking_access: document.getElementById("parkingAccess").value,
		front_door_lock_type: frontDoorLockType,
		front_door_access: document.getElementById("frontDoorAccess").value,
		utility_lock_type: utilityLockType,
		utility_access: document.getElementById("utilityAccess").value,

		cleaning: cleaning,
		washing: washing,
		ironing: ironing,
		service_code : document.getElementById("service_code").value
	});
	return info_task;
}

function nextRoom() {
	console.log(document.getElementById("property_code").innerHTML);
	//jump to next page after info uploaded
	if (document.getElementById('cleaningYes').checked) {
		if (document.getElementById('washingYes').checked) {
			if (document.getElementById('ironingYes').checked) {
				window.location.href = 'check_requirement.html'+'?'+document.getElementById("property_code").innerHTML+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'Check'+"&"+'1'+"&"+"W"+"&"+"I"+"&"+"C";
			} else if (document.getElementById('ironingNo').checked) {
				window.location.href = 'check_requirement.html'+'?'+document.getElementById("property_code").innerHTML+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'Check'+"&"+'1'+"&"+"W"+"&"+"!"+"&"+"C";
			}
		} else if (document.getElementById('washingNo').checked) {
			if (document.getElementById('ironingYes').checked) {
				window.location.href = 'check_requirement.html'+'?'+document.getElementById("property_code").innerHTML+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'Check'+"&"+'1'+"&"+"!"+"&"+"I"+"&"+"C";
			} else if (document.getElementById('ironingNo').checked) {
				window.location.href = 'check_requirement.html'+'?'+document.getElementById("property_code").innerHTML+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'Check'+"&"+'1'+"&"+"!"+"&"+"!"+"&"+"C";
			}
		}
		
	} else if (document.getElementById('cleaningNo').checked){
		if (document.getElementById('washingYes').checked){
			if (document.getElementById('ironingYes').checked) {
				window.location.href = 'check_requirement.html'+'?'+document.getElementById("property_code").innerHTML+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'Check'+"&"+'0'+"&"+"W"+"&"+"I"+"&"+"!";
			} else if (document.getElementById('ironingNo').checked) {
				window.location.href = 'check_requirement.html'+'?'+document.getElementById("property_code").innerHTML+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'Check'+"&"+'0'+"&"+"W"+"&"+"!"+"&"+"!";
			}
		} else  if (document.getElementById('washingNo').checked) {
			if (document.getElementById('ironingYes').checked){
				window.location.href = 'check_requirement.html'+'?'+document.getElementById("property_code").innerHTML+"&"+document.getElementById("numBed").value+"&"+document.getElementById("numBath").value+"&"+'Check'+"&"+'0'+"&"+"!"+"&"+"I"+"&"+"!";
			} else if (document.getElementById('ironingNo').checked) {
				alert("Please choose a service!");
			}
		} 
	} else {
		alert("Please choose a service!");
	}	

}

function writeJobSheetInfo() {

	//make sure customer code and property code are not empty. If empty, database will be ruined
	if (document.getElementById("customer_code").innerHTML == "") {
		alert("please click the 'Get Customer Code' button to generate a valid customer code!");
	}
	else if (document.getElementById("property_code").innerHTML == ""){
		alert("please click the 'Get Property Code' button to generate a valid property code!");
	}
	else {
		var property_info = writePropertyInfo();
		property_info.then(function () {
			var customer_info = writeCustomerInfo();
			customer_info.then(function() {
				var property_list_info = firebase.database().ref('customers/' + document.getElementById("customer_code").innerHTML + '/properties').update({
					1: document.getElementById("property_code").innerHTML
				});
				property_list_info.then(function() {
					nextRoom();
				});
			});
		});
		console.log(document.getElementById("property_code").innerHTML);
		
		firebase.database().ref('job_sheets/' + document.getElementById("property_code").innerHTML).set({
			//Bedroom_1:'null'
			General_Check:'null'
		});
	}
}

