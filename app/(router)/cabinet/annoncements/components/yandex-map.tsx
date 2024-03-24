import {
  Map,
  Placemark,
  SearchControl,
  YMaps,
  ZoomControl,
  useYMaps,
} from "@pbe/react-yandex-maps";
import React from "react";

function YandexMap() {
  const mapRef = React.useRef(null);
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <YMaps>
      <Map
        defaultState={{
          center: [51.128201, 71.430429],
          zoom: 12,
        }}
        width={600}
        height={460}
      >
        <Placemark geometry={[55.684758, 37.738521]} />
        <SearchControl options={{ float: "right" }} />
        <ZoomControl />
      </Map>
    </YMaps>
  );
}

export default YandexMap;
