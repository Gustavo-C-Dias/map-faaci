import L from "leaflet";

type IconProps = {
  pointType: number;
}

const IconMap = ({
  pointType
}: IconProps) => {

  if (pointType === 0) {
    return L.icon({
      iconUrl: "icons/trilha_start.png",
      iconSize: [26, 34],
    });
  }

  if (pointType === 1) {
    return L.icon({
      iconUrl: "icons/trilha_end.png",
      iconSize: [26, 34],
    });
  }

  if (pointType === 2) {
    return L.icon({
      iconUrl: "icons/restaurant.png",
      iconSize: [20, 28],
    });
  }
}

export default IconMap;