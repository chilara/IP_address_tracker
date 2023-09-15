import L from "leaflet";
import iconL from "../src/assets/iconL.svg";

export default L.icon({
  iconSize: [32, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: iconL,
});
