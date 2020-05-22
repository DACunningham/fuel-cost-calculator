
document.addEventListener("DOMContentLoaded", function () {
    alert("Doc loaded")
})

const mainHeading = document.querySelector("h1")
mainHeading.addEventListener("click", calculateFuelCost);

function calculateFuelCost() {
    mainHeading.textContent = "£20"
}


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
    origin = "WD19 5AX"
    destination = "BA14 7WR"
    var service = new google.maps.DistanceMatrixService;
    var test = service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: "DRIVING",
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }, distanceCallback);
}
