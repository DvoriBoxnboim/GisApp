const API_URL = 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0/query';

export async function fetchCapitals(): Promise<any> {
  try {
    const response = await fetch(`${API_URL}?where=1=1&outFields=CITY_NAME,POP&f=json`);
    const data = await response.json();

    if (data.features) {
      return data.features.map((feature: any) => ({
        name: feature.attributes.CITY_NAME,
        population: feature.attributes.POP,
        lat: feature.geometry.y,
        lon: feature.geometry.x,
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching capitals:', error);
    return [];
  }
}
