import L from "leaflet";

type IconProps = {
  pointType: number;
}

const IconMap = ({
  pointType
}: IconProps) => {

  if (pointType === 0) {
    return L.icon({
      iconUrl: "icons/trilha.webp",
      iconSize: [32, 32],
    });
  }

  if (pointType === 1) {
    return L.icon({
      iconUrl: "icons/trilha.webp",
      iconSize: [32, 32],
    });
  }

  return L.icon({
    iconUrl: "icons/teste.png",
    iconSize: [32, 32],
  });
}

export default IconMap;