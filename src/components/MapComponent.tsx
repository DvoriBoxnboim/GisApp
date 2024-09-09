import React, { useEffect, useRef } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

const MapComponent: React.FC = () => {
  const viewDiv = useRef<HTMLDivElement | null>(null);

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

      const trailheadsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",
        popupTemplate: {
          title: '{CITY_NAME}',
          content: `Population: {POP}` 
        }
      });
      webMap.add(trailheadsLayer);
    }
  }, []);

  return <div ref={viewDiv} style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapComponent;