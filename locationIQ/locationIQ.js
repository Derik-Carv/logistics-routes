import fetch from 'node-fetch';
import dotenv from 'dotenv';
import {initialLatitude, initialLongitude, destinationLatitude, destinationLongitude, modules } from '../index';

// Configurar o caminho para o arquivo .env
dotenv.config({ path: './.env' }); // Carrega variáveis do arquivo .env

const apiKey = process.env.LOCATIONIQ_API_KEY;

// Cria uma função para obter o endereço com base nas coordenadas com latitudes e longitudes iniciais e finais.
async function getRoute(startLat, startLon, endLat, endLon) {
    const url = `https://us1.locationiq.com/v1/directions/driving/${startLon},${startLat};${endLon},${endLat}?key=${apiKey}&steps=true&alternatives=true&geometries=polyline&overview=full`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();

        // Verifique a estrutura da resposta
        console.log("Dados da resposta da API:", data);

        // Acesse a distância e duração somente se 'routes' existir e não for vazio
        if (data.routes && data.routes.length > 0) {
            const distance = data.routes[0].distance; // Distância em metros
            const duration = data.routes[0].duration; // Duração em segundos

            console.log(`Distância: ${distance / 1000} km`);
            console.log(`Duração: ${Math.round(duration / 60)} minutos.`);
            const routeTraveld = distance / 1000
            const arrival = duration / 60
            exports.modules = { routeTraveld, arrival }
        } else {
            console.log("Nenhuma rota encontrada.");
        }
    } catch (error) {
        console.error(`Erro ao obter a rota: `, error);
    }
}

getRoute(initialLatitude, initialLongitude, destinationLatitude, destinationLongitude);