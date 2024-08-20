import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const WorldMap = () => {
  const coordinates = [
    { lat: 40.7128, lng: -74.006, name: "New York", numberOfIP: 123 },
    { lat: 36.884804, lng: 30.704044, name: "Antalya", numberOfIP: 1234 },
    { lat: 35.6895, lng: 139.6917, name: "Tokyo", numberOfIP: 274 },
    { lat: -33.8688, lng: 151.2093, name: "Sydney", numberOfIP: 341 },
    { lat: 51.5074, lng: -0.1278, name: "London", numberOfIP: 198 },
    { lat: 48.8566, lng: 2.3522, name: "Paris", numberOfIP: 65 },
    { lat: -22.9068, lng: -43.1729, name: "Rio de Janeiro", numberOfIP: 321 },
    { lat: 55.7558, lng: 37.6173, name: "Moscow", numberOfIP: 254 },
    { lat: 39.9042, lng: 116.4074, name: "Beijing", numberOfIP: 134 },
    { lat: 43.651, lng: -79.347, name: "Toronto", numberOfIP: 287 },
    { lat: 30.0444, lng: 31.2357, name: "Cairo", numberOfIP: 45 },
    { lat: 41.0082, lng: 28.9784, name: "Istanbul", numberOfIP: 308 },
    { lat: 19.076, lng: 72.8777, name: "Mumbai", numberOfIP: 215 },
    { lat: -33.9249, lng: 18.4241, name: "Cape Town", numberOfIP: 174 },
    { lat: -34.6037, lng: -58.3816, name: "Buenos Aires", numberOfIP: 369 },
    { lat: 37.5665, lng: 126.978, name: "Seoul", numberOfIP: 162 },
    { lat: 19.4326, lng: -99.1332, name: "Mexico City", numberOfIP: 146 },
    { lat: 13.7563, lng: 100.5018, name: "Bangkok", numberOfIP: 295 },
    { lat: 37.9838, lng: 23.7275, name: "Athens", numberOfIP: 233 },
    { lat: 25.276987, lng: 55.296249, name: "Dubai", numberOfIP: 77 },
    { lat: 1.3521, lng: 103.8198, name: "Singapore", numberOfIP: 312 },
    { lat: 48.2082, lng: 16.3738, name: "Vienna", numberOfIP: 56 },
    { lat: 38.7223, lng: -9.1399, name: "Lisbon", numberOfIP: 123 },
    { lat: 60.1695, lng: 24.9354, name: "Helsinki", numberOfIP: 141 },
    { lat: 59.9139, lng: 10.7522, name: "Oslo", numberOfIP: 198 },
    { lat: 59.3293, lng: 18.0686, name: "Stockholm", numberOfIP: 219 },
    { lat: 53.3331, lng: -6.2489, name: "Dublin", numberOfIP: 283 },
    { lat: 47.3769, lng: 8.5417, name: "Zurich", numberOfIP: 154 },
    { lat: 52.2297, lng: 21.0122, name: "Warsaw", numberOfIP: 245 },
    { lat: 50.8503, lng: 4.3517, name: "Brussels", numberOfIP: 322 },
    { lat: 47.4979, lng: 19.0402, name: "Budapest", numberOfIP: 109 },
    { lat: 50.0755, lng: 14.4378, name: "Prague", numberOfIP: 258 },
    { lat: 50.4501, lng: 30.5234, name: "Kiev", numberOfIP: 312 },
    { lat: -12.0464, lng: -77.0428, name: "Lima", numberOfIP: 142 },
    { lat: -34.6037, lng: -58.3816, name: "Buenos Aires", numberOfIP: 378 },
    { lat: -34.9285, lng: 138.6007, name: "Adelaide", numberOfIP: 209 },
    { lat: -31.9505, lng: 115.8605, name: "Perth", numberOfIP: 327 },
    { lat: -37.8136, lng: 144.9631, name: "Melbourne", numberOfIP: 186 },
    { lat: 40.7306, lng: -73.9352, name: "New York City", numberOfIP: 269 },
    { lat: 47.6062, lng: -122.3321, name: "Seattle", numberOfIP: 234 },
    { lat: 39.0997, lng: -94.5786, name: "Kansas City", numberOfIP: 305 },
    { lat: 25.7617, lng: -80.1918, name: "Miami", numberOfIP: 213 },
    { lat: 32.7157, lng: -117.1611, name: "San Diego", numberOfIP: 288 },
    { lat: 37.7749, lng: -122.4194, name: "San Francisco", numberOfIP: 158 },
    { lat: 48.8566, lng: 2.3522, name: "Paris", numberOfIP: 67 },
    { lat: 35.6762, lng: 139.6503, name: "Tokyo", numberOfIP: 142 },
    { lat: 40.7128, lng: -74.006, name: "New York", numberOfIP: 235 },
    { lat: 34.0522, lng: -118.2437, name: "Los Angeles", numberOfIP: 192 },
    { lat: 41.8781, lng: -87.6298, name: "Chicago", numberOfIP: 169 },
    { lat: 39.7392, lng: -104.9903, name: "Denver", numberOfIP: 221 },
    { lat: 37.7749, lng: -122.4194, name: "San Francisco", numberOfIP: 143 },
    { lat: 51.5074, lng: -0.1278, name: "London", numberOfIP: 294 },
    { lat: 48.2082, lng: 16.3738, name: "Vienna", numberOfIP: 153 },
    { lat: 52.52, lng: 13.405, name: "Berlin", numberOfIP: 265 },
    { lat: 55.7558, lng: 37.6173, name: "Moscow", numberOfIP: 203 },
    { lat: 41.9028, lng: 12.4964, name: "Rome", numberOfIP: 307 },
    { lat: 48.1351, lng: 11.582, name: "Munich", numberOfIP: 179 },
    { lat: 60.1695, lng: 24.9354, name: "Helsinki", numberOfIP: 232 },
    { lat: 59.437, lng: 24.7535, name: "Tallinn", numberOfIP: 147 },
    { lat: 55.9533, lng: -3.1883, name: "Edinburgh", numberOfIP: 211 },
    { lat: 59.3293, lng: 18.0686, name: "Stockholm", numberOfIP: 125 },
    { lat: 35.6895, lng: 139.6917, name: "Tokyo", numberOfIP: 374 },
  ];

  return (
    <MapContainer
      center={[25, 4]}
      zoom={2}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates.map((coord, index) => (
        <Marker key={index} position={[coord.lat, coord.lng]}>
          <Popup>
            {"#" + coord.numberOfIP} {coord.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WorldMap;
