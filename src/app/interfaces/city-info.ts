export interface CityInfo {
  name: string;
  local_names: {
    pt: string;
    ascii: string;
    feature_name: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}
