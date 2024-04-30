import {
  Clusterer,
  Map,
  Placemark,
  SearchControl,
  YMaps,
  ZoomControl,
  useYMaps,
} from "@pbe/react-yandex-maps";
import React from "react";

interface BigMapProps {
  width?: number;
  height?: number;
  coordinate1?: number | null | undefined;
  coordinate2?: number | null | undefined;
  zoom?: number | null | undefined;
}

function BigMap({
  width,
  height,
  coordinate1,
  coordinate2,
  zoom,
}: BigMapProps) {
  const mapRef = React.useRef(null);
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const clusterPoints = [
    [51.128201, 71.430429],
    [51.128201, 71.4305],
  ];

  return (
    <YMaps>
      <Map
        // defaultState={{
        //   center: [51.128201, 71.430429],
        //   zoom: 12,
        // }}
        state={{
          center: [coordinate1 || 51.128201, coordinate2 || 71.430429],
          zoom: zoom || 14,
        }}
        width={width || 600}
        height={height || 460}
      >
        <Clusterer
          options={{
            preset: "islands#invertedVioletClusterIcons",
            groupByCoordinates: false,
          }}
        >
          {clusterPoints.map((coordinates, index) => (
            <Placemark key={index} geometry={coordinates} />
          ))}
        </Clusterer>

        <ZoomControl />
      </Map>
    </YMaps>
  );
}

export default BigMap;
