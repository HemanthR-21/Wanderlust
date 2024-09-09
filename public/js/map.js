mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 12 // starting zoom
});

console.log(listing.geometry.coordinates);

const marker = new mapboxgl.Marker()
    .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
    .setPopup(
        new mapboxgl.Popup({offset: 25}).setHTML(
                `<h4>${listing.location}</h4><p>Exact Location provided after booking</p>`
        ))
    .addTo(map);

