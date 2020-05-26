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

/**
 * Round a number to specified number of decimal places.
 *
 * @dp     {Number}   var=2       Decimal places @number should be rounded to.
 * @number {Number}   var         Number to round.
 *
 * @return {String}               Number rounded to x DP.
 */
function roundToDp(dp = 2, number) {
    return number.toFixed(dp);
}

/**
 * Generate a random number between min and max (inclusive) .
 *
 * @min     {Number}   var         Lowest number function should return.
 * @max     {Number}   var         Highest number function should return.
 *
 * @return  {Number}               Number between min and max (inclusive).
 */
function randomNumberBetween(min, max) {
    return Math.floor((Math.random() * max) + min);
}

/**
 * Convert metric metres to imperial miles.
 *
 * @metres   {Number}   var       Metres.
 *
 * @return   {Number}             Number of miles given distance in metres.
 */
function ConvertMetresToMiles(metres) {
    return metres * 0.00062137;
}

/**
 * Calculate the fuel cost of a journey.
 *
 * Given the Miles Per Gallon (Imperial), fuel cost and distance (miles) of a journey;
 * calculate the cost in fuel for that journey.
 *
 * @mpg      {Number}   var         Miles Per Gallon of vehicle.
 * @fuelCost {Number}   var         Fuel cost when vehicle Filled.
 * @distance {Number}   var         Distance of journey in miles.
 *
 * @return {Number}                 Cost of journey rounded to 2 decimal places.
 */
function calculateFuelCost(mpg, fuelCost, distance) {
    // Imperial gallons
    const litresPerGallon = 4.54609;
    let gallonsForJourney = distance / mpg;
    let litresForJourney = gallonsForJourney * litresPerGallon;
    let costOfJourney = litresForJourney * fuelCost;
    return roundToDp(2, costOfJourney);
}

function distanceCallback(response, status) {
    if (status !== "OK") {
        alert("Google API Error: " + status);
    } else if (response.rows[0].elements[0].status === "NOT_FOUND") {
        alert("Your origin or destination locations are not valid.");
    } else if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        alert("No route can be found between your origin and destination locations.");
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

/**
 * Get journey information, calculate journey cost and display to the user.
 *
 * This function can be split into 3 parts.
 * 1. A call is made to Google API given an origin and destination for a journey.
 * Google API will return journey information and pass it to the 'distanceCallback'
 * function - assuming the origin and destination are valid.
 * 2. DistanceCallback will see if the call was successful and will calculate the
 * journey cost given the variables received from Google.
 * 3. The calculated information is displayed to the user.
 *
 * @origin       {String}   var       Start location of journey (must be a valid Google location).
 * @destination  {String}   var       End location of journey (must be a valid Google location).
 */
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

/**
 * Initialisation function to call Google Maps SDK ready for use later.
 */
function initMap() { }
