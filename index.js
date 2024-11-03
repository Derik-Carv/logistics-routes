import {routeTraveld, arrival } from './locationIQ/locationIQ'

let map; let initialMarker; let destinationMarker;

// Variáveis para armazenar latitude e longitude
let initialLatitude = null;
let initialLongitude = null;
let destinationLatitude = null;
let destinationLongitude = null;

function initMap() {
    // Mapa inicial sem localização
    const initialLocation = [ -23.5505, -46.6333 ]; // São Paulo como exemplo
    map = L.map('map').setView(initialLocation, 12);

    // Camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Marcador inicial
    initialMarker = L.marker(initialLocation).addTo(map);

    // Evento de clique no mapa para adicionar um marcador de destino
    map.on('click', function(e) {
        // Atualiza a localização do mapa para a posição clicada
        map.setView(e.latlng, map.getZoom());
        
        // Remove o marcador de destino anterior (se houver)
        if (destinationMarker) {
            map.removeLayer(destinationMarker);
        }
        // Cria um novo marcador na posição clicada
        destinationMarker = L.marker(e.latlng).addTo(map);
        // Armazena a latitude e longitude do destino
        destinationLatitude = e.latlng.lat;
        destinationLongitude = e.latlng.lng;
        console.log(`Destino - Latitude: ${destinationLatitude}, Longitude: ${destinationLongitude}`);
    });
}

document.getElementById("get-location").onclick = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            initialLatitude = position.coords.latitude;
            initialLongitude = position.coords.longitude;

            const userLocation = [initialLatitude, initialLongitude];
            map.setView(userLocation, 12);
            initialMarker.setLatLng(userLocation);
            console.log(`Localização Inicial - Latitude: ${initialLatitude}, Longitude: ${initialLongitude}`);
            exports.modules = { initialLatitude, initialLongitude } ;

        }, function() {
            alert("Erro ao obter sua localização.");
        });
    } else {
        alert("Geolocalização não é suportada por este navegador.");
    }
};

// Função para buscar destino
document.getElementById("search-button").onclick = function() {
    const query = document.getElementById("search").value;
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const location = [data[0].lat, data[0].lon];
                // Armazena a latitude e longitude do destino
                destinationLatitude = data[0].lat;
                destinationLongitude = data[0].lon;
                
                console.log(`Destino - Latitude: ${destinationLatitude}, Longitude: ${destinationLongitude}`);
                exports.modules = { destinationLatitude, destinationLongitude } ;

                // Definir zoom mais próximo, por exemplo, 15
                map.setView(location, 15);
                if (destinationMarker) {
                    map.removeLayer(destinationMarker);
                }
                destinationMarker = L.marker(location).addTo(map);

                const div = document.createElement('div')
                div.classList.add('resultTrip');
                document.body.appendChild(div);
            } else {
                alert("Destino não encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro na busca:", error);
            alert("Erro ao buscar destino.");
        });
};

// Inicializa o mapa ao carregar a página
window.onload = initMap;



// // -1.3016510280626798, -47.91558374687553 Milagre
// // -1.2929355312204651, -47.924301950426326 matriz
// // Exemplo de coordenadas (ponto inicial e ponto final)
// const startLat = -1.3016510280626798;  // Milagre
// const startLon = -47.91558374687553;
// const endLat = -1.2929355312204651;    // Matriz
// const endLon = -47.924301950426326;

// getRoute(startLat, startLon, endLat, endLon);

