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
            }
            form.classList.add("was-validated");
            let distance = 200;
            let mpg = document.getElementById("vehicleMPG").value;
            let fuelCost = document.getElementById("costOfFuel").value;
            document.getElementById("calcResult").value = calculateFuelCost(
                distance,
                mpg,
                fuelCost
            );
        });
    },
    false
);

// document.addEventListener("DOMContentLoaded", function () {
//     alert("Doc loaded")
// })

// const mainHeading = document.querySelector("h1")
// mainHeading.addEventListener("click", calculateFuelCost);

function calculateFuelCost(distance, mpg, fuelCost) {
    // Imperial gallons
    const litresPerGallon = 4.54609;
    let gallonsForJourney = distance / mpg;
    let litresForJourney = gallonsForJourney * litresPerGallon;
    let costOfJourney = litresForJourney * fuelCost;
    return costOfJourney;
}

// document.getElementById("calcResult").textContent = calculateFuelCost();

function distanceCallback(response, status) {
    if (status !== "OK") {
        alert("Error was: " + status);
    } else {
        var formDestAddrs = response.destinationAddresses;
        var formOriginAddrs = response.originAddresses;
        var results = response.rows;
        return results;
    }
}

function initMap(origin, destination) {
    origin = "WD19 5AX";
    destination = "BA14 7WR";
    var service = new google.maps.DistanceMatrixService();
    var test = service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: "DRIVING",
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        },
        distanceCallback
    );
}
