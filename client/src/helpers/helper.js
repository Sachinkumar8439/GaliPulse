async function getCurrentLocation() {
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
    };

   
    const fetchLocation = () =>
        new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error),
                options
            );
        });

    try {
        const position = await fetchLocation();
        console.log("First attempt succeeded:", position.coords);
        return { success: true, location: { latitude: position.coords.latitude, longitude: position.coords.longitude } };
    } catch (error) {
        console.warn("First attempt failed. Retrying...", error);

        try {
            const position = await fetchLocation();
            console.log("Second attempt succeeded:", position.coords);
            return { success: true, location: { latitude: position.coords.latitude, longitude: position.coords.longitude } };
        } catch (error) {
            console.error("Second attempt also failed.", error);
            return { success: false };
        }
    }
}

function trackUserLocation(interval = 5000) {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return {
            success: false,
            reason: "Geolocation is not supported",
            startTracking: null,
            stopTracking: null,
        };
    }

    let watchId = null;

    const startTracking = (callback) => {
        if (!callback || typeof callback !== "function") {
            console.error("Callback function is required to receive location updates.");
            return;
        }

        watchId = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    console.log("Current location fetched:", currentLocation);

                    // Pass location to callback
                    callback({
                        success: true,
                        position: currentLocation,
                    });
                },
                (error) => {
                    console.error("Error while fetching location:", error);
                    callback({
                        success: false,
                        reason: error.message || "Unknown error",
                    });
                },
                {
                    enableHighAccuracy: true,
                }
            );
        }, interval);

        console.log("Tracking started.");
    };

    const stopTracking = () => {
        if (watchId !== null) {
            clearInterval(watchId);
            watchId = null;
            console.log("Tracking stopped.");
        } else {
            console.warn("Tracking is not active.");
        }
    };

    return { startTracking, stopTracking };
}


const fetchLocationDetails = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );

    if (!response.ok) {

      console.error(`HTTP error! status: ${response.status}`);
      return {success:false}
    }

    const data = await response.json();

    return {
      success: true,
      data: {
        country: data.address.country || "Not available",
        state: data.address.state || "Not available",
        city:
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "Not available",
        postcode: data.address.postcode || "Not available",
        fullResponse: data, // Include the full response for further use if needed
      },
    };
  } catch (error) {
    console.error("Error fetching location details:", error.message);
    return { success: false };
  }
};


module.exports = {
 getCurrentLocation,
 trackUserLocation,
 fetchLocationDetails,
}