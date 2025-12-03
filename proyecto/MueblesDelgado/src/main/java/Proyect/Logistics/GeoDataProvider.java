package Proyect.Logistics;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.json.JSONObject;
import org.springframework.stereotype.Component;


@Component
public class GeoDataProvider {
    private static final String API_KEY = "AIzaSyA2hbYzjR8a_Rbnwi4R-02Lo7ZM38yH7qI";

    // Método principal para obtener las coordenadas a partir de la dirección
    public double[] getCoordinatesFromAddress(String p_address) throws Exception {
        String encodedAddress = normalizeAddress(p_address);
        String urlString = generateRequestURLCoordinates("geocode", encodedAddress);
        JSONObject jsonResponse = getApiResponse(urlString);
        verifyResult(jsonResponse);
        
        return extractCoordinates(jsonResponse);
    }

    public double calculateDistanceBetweenTwoPoints(double[] p_origin, double[] p_destination) throws Exception {
        return extractRouteMetric(p_origin, p_destination, "distance") / 1000; // Convertir a kilómetros
    }
    
    public double calculateDurationBetweenTwoPoints(double[] p_origin, double[] p_destination) throws Exception {
        return extractRouteMetric(p_origin, p_destination, "duration") / 60; // Convertir a minutos
    }
    
    // Método auxiliar para extraer métricas de la ruta (distancia o duración)
    private double extractRouteMetric(double[] p_origin, double[] p_destination, String p_metric) throws Exception {
        JSONObject routeInfo = getRouteInformation(p_origin, p_destination);
    
        return routeInfo.getJSONArray("routes").getJSONObject(0)
                .getJSONArray("legs").getJSONObject(0)
                .getJSONObject(p_metric).getDouble("value");
    }
    
    // Método principal para obtener la información de la ruta entre dos puntos
    private JSONObject getRouteInformation(double[] p_origin, double[] p_destination) throws Exception {
        String originStr = formatCoordinates(p_origin);
        String destinationStr = formatCoordinates(p_destination);
    
        String urlString = generateRequestURLRoute("directions", originStr, destinationStr);
        JSONObject jsonResponse = getApiResponse(urlString);
        validateRouteResponse(jsonResponse);
    
        return jsonResponse;
    }

    // Método común para obtener la respuesta de la API
    private static JSONObject getApiResponse(String p_urlString) throws Exception {
        @SuppressWarnings("deprecation")
        URL url = new URL(p_urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        int responseCode = connection.getResponseCode();
        if (responseCode != 200) {
            throw new RuntimeException("Error HTTP: " + responseCode);
        }

        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();

        return new JSONObject(response.toString());
    }

    // Método común para verificar si la respuesta es válida
    private static void verifyResult(JSONObject p_jsonResponse) {
        if (!"OK".equals(p_jsonResponse.getString("status"))) {
            System.out.println("Error en la API: " + p_jsonResponse.getString("status"));
            throw new RuntimeException("Error en la API: " + p_jsonResponse.getString("status"));
        }
    }

    // Para obtener las coordenadas de la respuesta de Geocoding
    private static double[] extractCoordinates(JSONObject p_jsonResponse) {
        JSONObject location = p_jsonResponse.getJSONArray("results").getJSONObject(0)
                .getJSONObject("geometry").getJSONObject("location");
        double lat = location.getDouble("lat");
        double lng = location.getDouble("lng");

        return new double[]{lat, lng};
    }

    // Método para formatear las coordenadas
    private static String formatCoordinates(double[] p_coordinates) {
        return p_coordinates[0] + "," + p_coordinates[1];
    }

    // Método para generar la URL de la solicitud para GeoCode
    private static String generateRequestURLCoordinates(String p_type, String p_address) {
        return "https://maps.googleapis.com/maps/api/" + p_type + "/json?address=" + p_address + "&key=" + API_KEY;
    }


    // Método para generar la URL de la solicitud para Directions
    private static String generateRequestURLRoute(String p_type, String p_origin, String p_destination) {
        return "https://maps.googleapis.com/maps/api/" + p_type + "/json?origin=" + p_origin + "&destination=" + p_destination + "&key=" + API_KEY;
    }

    // Normalizar la dirección para la URL
    private static String normalizeAddress(String p_address) {
        return URLEncoder.encode(p_address, StandardCharsets.UTF_8);
    }

    // Validar la respuesta de la API de Direcciones
    private static void validateRouteResponse(JSONObject p_jsonResponse) {
        if (!"OK".equals(p_jsonResponse.getString("status"))) {
            System.out.println("Error en Directions API: " + p_jsonResponse.getString("status"));
            throw new RuntimeException("Error en Directions API: " + p_jsonResponse.getString("status"));
        }
    }


    public static void main(String[] args) {
        GeoDataProvider geoDataProvider = new GeoDataProvider();
        try {
            double[] coordinates = geoDataProvider.getCoordinatesFromAddress("Cedis Manuel Delgado, Tamanché, Yucatán, México");
            double[] destination = geoDataProvider.getCoordinatesFromAddress("Facultad de Matemáticas, Mérida, Yucatán, México");
            
            System.out.println("Coordinates: " + coordinates[0] + ", " + coordinates[1]);
            System.out.println("Coordinates: " + destination[0] + ", " + destination[1]);

            double distance = geoDataProvider.calculateDistanceBetweenTwoPoints(coordinates, destination);
            double duration = geoDataProvider.calculateDurationBetweenTwoPoints(coordinates, destination);

            System.out.println("Distance: " + distance + " km");
            System.out.println("Duration: " + duration + " minutes");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
