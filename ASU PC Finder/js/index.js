"use strict;"

var map;


/* wait until all phonegap/cordova is loaded then call onDeviceReady*/
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    loadScript('initMap');

}

function loadScript(callback) {
    var mapScript = document.getElementById("mapScript");
	if (mapScript){
		mapScript.remove();	
	}

    var script = undefined;
    var googleAPIKey = "AIzaSyDf8HLjjrhN0XjmtT7cQ8JHTnWLFg-FqEM";

    var googleAPIUrl = "https://maps.googleapis.com/maps/api/js";

    var srcURL = googleAPIUrl + '?key=' + googleAPIKey +
        '&callback=' + callback;


    script = document.createElement('script');
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.src = srcURL;
    script.id = 'mapScript';

    document.body.appendChild(script);
}


function initMap() {  //default map
    var mapElement = document.getElementById('mapDiv');

    var geoLocationASU = {
        lat: 33.416602,
        lng: -111.934182
    };
    var mapOptions = {
        zoom: 15,
        center: geoLocationASU
    };

    var mapper = new google.maps.Map(mapElement, mapOptions);

    var markerOptions = {
        position: geoLocationASU,
        map: mapper
    };    

}


function mapHayden() {  //Tempe campus
    var mapElement = document.getElementById('mapDiv');

    var geoLocationASU = {
        lat: 33.4191,
        lng: -111.9346
    };
    var mapOptions = {
        zoom: 18,
        center: geoLocationASU
    };

    var mapper = new google.maps.Map(mapElement, mapOptions);

    var markerOptions = {
        position: geoLocationASU,
        map: mapper
    };
    var marker = new google.maps.Marker(markerOptions);

}

function mapCoor() {  //Tempe campus
    var mapElement = document.getElementById('mapDiv');

    var geoLocationASU = {
        lat: 33.4194,
        lng: -111.9374
    };
    var mapOptions = {
        zoom: 18,
        center: geoLocationASU
    };

    var mapper = new google.maps.Map(mapElement, mapOptions);

    var markerOptions = {
        position: geoLocationASU,
        map: mapper
    };
    var marker = new google.maps.Marker(markerOptions);

}

function mapComputingCommons() {  //Tempe campus
    var mapElement = document.getElementById('mapDiv');

    var geoLocationASU = {
        lat: 33.4180369,
        lng: -111.9324426
    };
    var mapOptions = {
        zoom: 18,
        center: geoLocationASU
    };

    var mapper = new google.maps.Map(mapElement, mapOptions);

    var markerOptions = {
        position: geoLocationASU,
        map: mapper
    };
    var marker = new google.maps.Marker(markerOptions);
}

function mapDowntown() {
    var mapElement = document.getElementById('mapDiv');

    var geoLocationASU = {
        lat: 33.4530,
        lng: -112.0719
    };
    var mapOptions = {
        zoom: 18,
        center: geoLocationASU
    };

    var mapper = new google.maps.Map(mapElement, mapOptions);

    var markerOptions = {
        position: geoLocationASU,
        map: mapper
    };
    var marker = new google.maps.Marker(markerOptions);
}

function mapWest() {
    var mapElement = document.getElementById('mapDiv');

    var geoLocationASU = {
        lat: 33.6073,
        lng: -112.1599
    };
    var mapOptions = {
        zoom: 18,
        center: geoLocationASU
    };

    var mapper = new google.maps.Map(mapElement, mapOptions);

    var markerOptions = {
        position: geoLocationASU,
        map: mapper
    };
    var marker = new google.maps.Marker(markerOptions);
}

function mapPoly() {
    var mapElement = document.getElementById('mapDiv');

    var geoLocationASU = {
        lat: 33.3071,
        lng: -111.6783
    };
    var mapOptions = {
        zoom: 18,
        center: geoLocationASU
    };

    var mapper = new google.maps.Map(mapElement, mapOptions);

    var markerOptions = {
        position: geoLocationASU,
        map: mapper
    };
    var marker = new google.maps.Marker(markerOptions);
}

function showMap() { //this will display a map based on the location selected
   
    var campusIndex = document.getElementById("campus").selectedIndex;
    var libraryIndex = document.getElementById("location").selectedIndex;

    switch (campusIndex) {
        case 1: // Tempe
            if (libraryIndex == 0) {
                loadScript('mapHayden');
            } else if (libraryIndex == 1) {
                loadScript('mapCoor');
            } else {
                loadScript('mapComputingCommons');
            }
            break;
        case 2: // Downtown
            loadScript('mapDowntown');
            break;
        case 3: // West
            loadScript('mapWest');
            break;
        case 4: // Poly
            loadScript('mapPoly');
            break;
        default:
            alert('Incorrect selection');
    }
}

function checkavailability() { //makes a call to the database,checks availability and returns results 

    MySql.Execute(
        "dmazzola.com", // mySQL server
        "dtlawren", // login name
        "lawr1252", // login password
        "test_db_dtlawren", // database to use
        "SELECT availability, campus, library FROM computers", // SQL query string
        function(data) {
            var result = processQueryResult(data);
            var availability = getAvailability(result);
            document.getElementById("currentAvailability").innerHTML = "Available: " + availability;
        }
    );

} 

function getAvailability(resultSet) {
    var campusIndex = document.getElementById("campus").selectedIndex;
    var libraryIndex = document.getElementById("location").selectedIndex;

    switch (campusIndex) {
        case 1: // Tempe
            if (libraryIndex == 0) {
                return getValue(resultSet, 'Tempe', 'Hayden');
            } else if (libraryIndex == 1) {
                return getValue(resultSet, 'Tempe', 'Coor Hall');
            } else {
                return getValue(resultSet, 'Tempe', 'Computing Commons');
            }
        case 2: // Downtown
            return getValue(resultSet, 'Downtown', 'John J Ross');
        case 3: // West
            return getValue(resultSet, 'West', 'Fletcher');
        case 4: // Poly
            return getValue(resultSet, 'Polytechnic', 'Poly Library');
        default:
            return 0;
    }
}

function getValue(resultSet, campus, library) {
    for (var i = 0; i < resultSet.length; i++) {
        if (resultSet[i].campus == campus && resultSet[i].library == library) {
            return resultSet[i].availability;
        }
    }
}

function processQueryResult(queryReturned) {
    if (!queryReturned.Success) {
        alert(queryReturned.Error)
    } else {
        return queryReturned.Result;
    }
}


function clearValues() {
    // The following will clear all values
    document.getElementById("campus").selectedIndex = 0;
    var librarySelect = document.getElementById("location");

	while (librarySelect.options.length > 0) {
        librarySelect.remove(0);
    }
    var availabilityButton = document.getElementById("btnAvailability");
    availabilityButton.disabled = true;

    document.getElementById("currentAvailability").innerHTML = "";
    loadScript('initMap');
} 

function campusChange(control) {
    var campus = control.selectedIndex;
    var librarySelect = document.getElementById("location");

    var availabilityButton = document.getElementById("btnAvailability");
    availabilityButton.disabled = false;

    while (librarySelect.options.length > 0) {
        librarySelect.remove(0);
    }


    switch (campus) {
        case 1: // Tempe
            setTempeLibraries(librarySelect);
            break;
        case 2: // Downtown
            librarySelect.add(new Option("John J Ross", "johnJRoss"));
            break;
        case 3: // West
            librarySelect.add(new Option("Fletcher", "fletcher"));
            break;
        case 4: // Poly
            librarySelect.add(new Option("Poly", "poly"));
            break;
        default:
            break;
    }
}

function setTempeLibraries(control) {
    control.add(new Option("Hayden", "hayden"));
    control.add(new Option("Coor Hall", "coorHall"));
    control.add(new Option("Computing Commons", "commons"));
}