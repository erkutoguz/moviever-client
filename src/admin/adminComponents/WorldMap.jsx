/* eslint-disable react-hooks/exhaustive-deps */
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";

const WorldMap = () => {
  const { fetchIpAddresses } = useAppContext();
  const [ipAddresses, setIpAddresses] = useState([]);
  useEffect(() => {
    fetchIpAddresses().then((res) => {
      setIpAddresses(res.data);
    });
  }, []);

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
      {ipAddresses.length > 0 &&
        ipAddresses.map((ip, index) => console.log(ip))}
    </MapContainer>
  );
};

export default WorldMap;
