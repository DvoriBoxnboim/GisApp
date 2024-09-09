// import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { fetchCapitals } from "../fetchCapitals";

// // Individual imports for each component used in this sample
// import "@arcgis/map-components/dist/components/arcgis-map";
// import "@arcgis/map-components/dist/components/arcgis-legend";
// import "@arcgis/map-components/dist/components/arcgis-search";
// import { ArcgisMap, ArcgisSearch, ArcgisLegend } from "@arcgis/map-components-react";

// useEffect(() => {
//   // Fetch and display capital cities data from a public API
//   fetchCapitals().then((capitals) => {
//     console.log("capitals", capitals);
//     // const map = new Map({
//     //   basemap: 'topo-vector'
//     // });
//   });
// })

// export default function Map() {
//   // Fetch and display capital cities data from a public API
//   // const capitals = await fetchCapitals();
//   // console.log("capitals", capitals);
//   return(
//     <div id="Map">
//       <h1>ArcGIS Map Component Example</h1>
//       <ArcgisMap
//       // itemId="d5dda743788a4b0688fe48f43ae7beb9"
//       center="35, 31" zoom={8} 
//       onArcgisViewReadyChange={async (event: any) => {
//         var data = fetchCapitals();
//         console.log("data", data);
//         console.log("MapView ready", event);
//       }}
//     >
//         <ArcgisSearch position="top-right"></ArcgisSearch>
//         <ArcgisLegend position="bottom-left"></ArcgisLegend>
//       </ArcgisMap>
//     </div>
//   )
// }

import React, { useEffect, useRef, useState } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import { fetchCapitals } from '../fetchCapitals';
import Point from '@arcgis/core/geometry/Point';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

interface Capital {
  name: string;
  population: number;
  lat: number;
  lon: number;
}

const MapComponent: React.FC = () => {
  const viewDiv = useRef<HTMLDivElement | null>(null);
  const [capitals, setCapitals] = useState<Capital[]>([]);

  useEffect(() => {
    if (viewDiv.current) {
      const webMap = new WebMap({
        basemap: 'streets-navigation-vector'
      });

      const view = new MapView({
        container: viewDiv.current,
        map: webMap,
        zoom: 6,
        center: [35, 31]
      });

      const graphicsLayer = new GraphicsLayer();
      webMap.add(graphicsLayer);

      const point = new Point({
        longitude: 35,
        latitude: 31
      });
      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [255, 0, 0],
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      };
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
      });
      graphicsLayer.add(pointGraphic);

      const trailheadsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",
        popupTemplate: {
          title: '{CITY_NAME}',
          content: `Population: {POP}` 
        }
      });
      webMap.add(trailheadsLayer);

      const getCapitals = async () => {
        var data = await fetchCapitals();
        setCapitals(data);
        data.forEach((capital) => {
          const point = new Point({ //Create a point
            longitude: capital.lon,
            latitude: capital.lat
          });
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: [255, 0, 0],  // Orange
            outline: {
              color: [255, 255, 255], // White
              width: 1
            }
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol
          });

          graphicsLayer.add(pointGraphic);
        });
      }
      getCapitals();
    }
  }, []);

  return <div ref={viewDiv} style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapComponent;