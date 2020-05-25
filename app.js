// Class Definitions

class Journey {
    originAddress;
    DestinationAddress;
    distance;
    cost;

    constructor(originAddress, DestinationAddress, distance) {
        this.originAddress = originAddress;
        this.DestinationAddress = DestinationAddress;
        this.distance = distance;
    }

    journeyJson() {
        return JSON.stringify(this);
    }
}

// Global Parameters

var journey;

// Global Actions

window.addEventListener(
    "load",
    function () {
        let forms = this.document.getElementsByClassName("needs-validation");
        // There's only one form on this page so, get first element in array.
        let form = forms[0];
        let validation = form.addEventListener("submit", function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else if (form.checkValidity() === true) {
                event.preventDefault();
                getJourney(
                    document.getElementById("origin").value,
                    document.getElementById("destination").value
                );
            }
            form.classList.add("was-validated");
        });
    },
    false
);

// Functions

function isNumber(subject) {
    if (typeof (subject) === "number") {
        return true;
    } else {
        return false;
    }
}

function ConvertMetresToMiles(metres) {
    return metres * 0.00062137;
}

function calculateFuelCost(mpg, fuelCost, distance) {
    // Imperial gallons
    const litresPerGallon = 4.54609;
    let gallonsForJourney = distance / mpg;
    let litresForJourney = gallonsForJourney * litresPerGallon;
    let costOfJourney = litresForJourney * fuelCost;
    return costOfJourney;
}

function distanceCallback(response, status) {
    if (status !== "OK") {
        alert("Google API Error: " + status);
    } else {
        journey = new Journey(
            response.originAddresses[0],
            response.destinationAddresses[0],
            response.rows[0].elements[0].distance.value
        );
        let mpg = document.getElementById("vehicleMPG").value;
        let fuelCost = document.getElementById("costOfFuel").value;
        let distance = ConvertMetresToMiles(journey.distance);
        document.getElementById("calcResult").value = calculateFuelCost(
            mpg,
            fuelCost,
            distance
        );
    }
}

function getJourney(origin, destination) {
    const distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: "DRIVING",
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        },
        distanceCallback
    );
}

function initMap() { }
