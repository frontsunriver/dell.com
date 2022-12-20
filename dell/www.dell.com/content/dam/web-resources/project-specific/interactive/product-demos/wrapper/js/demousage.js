/* Script name:         demoUsage.js
*
* Version:              3.0
*
* Author:               Nathan Bennis Whelan
*
* Version Date:         12 Jan 2021
*
* Functionality:        Collect Demo Usage data
*
* Changes:				Major re-write. Removed code that previously dealt
*						with handling data collection in the online and local 
*						version of the interactive.
*						
*						Removed expiry checking.
*
*						Removed automatic language selection from here. It is
*						now in behaviour.js
						
*******************************************************************************/
var country_code="";

var requestAuthentication = async function(){

	const credentials = {identifier: 'interactiveUsageUser', access: 'k1KbA9Qa/qvNZPgdgZDsbcXskzoTA6p67eK0LhiM/Hk='};

	const respData = await fetch('https://itdlog-democenter.delltechnologies.com/api/Authenticate', {
  		method: 'POST', // or 'PUT'
  		headers: {
		Accept: '*/*',
    	'Content-Type': 'application/json',
  		},
  		body: JSON.stringify(credentials),
	})
	.then(response => response.json())
	.catch((error) => {
  		console.error('Error:', error);
	});
	
	return respData;
};

var sendUsageTrackingToAPI = async function(token, usageData) {
    
	fetch('https://itdlog-democenter.delltechnologies.com/api/AddUsage', {
	method: 'POST', // or 'PUT'
	headers: {
	Accept: '*/*',
	'Content-Type': 'application/json',
	Authorization: `Bearer ${token}`,
	},
	body: JSON.stringify(usageData),
	})
	.then(response => response.json())
	// .then(data => {
	// console.log('Success:', data);
	// })
	.catch((error) => {
		console.error('Error:', error);
	});
	
    
};


// var getCountryInfo = async function(){
// 	await fetch("https://c.evidon.com/geo/country.js")
//   		.await((response) => response.text())
//   		.await((text) => eval(text))
//   		.then(() => {
// 			/* Now you can use the script */
//   		})

// }

var getCountryInfo = async function(){
	const response = await fetch("https://c.evidon.com/geo/country.js")
	const text = await response.text();
	eval(text);
}

var demoUsage = async function(cfg) {
	
	var hostState = {
		labCode: cfg.text.labCode,
        demoName: cfg.text.demoName,
        demoVersion: cfg.text.demoVersion,
        demoType: cfg.text.demoType,
        countryName: null,
        countryCode: null,
        userName: null,
        reference: null,
        time: new Date().toISOString()
	};

	getCountryInfo().then(()=>{
		hostState.countryCode = evidon.location.code.toUpperCase();
	});//
	

	await loadGlobalConfig();
	if (gcf.services.usageTracking.enabled) {
		var url = new URL(window.location.href);
		if(url.searchParams.has("ref")){
			hostState.reference=url.searchParams.get("ref");
		}

		try {
			const authData = await requestAuthentication();//

			// Send Usage Data to DemoCenter
			sendUsageTrackingToAPI(authData.token, hostState);
			
		} catch (error) {
			console.error('###    API Authentication or Post error');
			console.error(error);
		}
	}


	
}