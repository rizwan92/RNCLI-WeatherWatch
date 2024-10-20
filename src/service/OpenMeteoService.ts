import {ForecastRes, SearchCountryRes} from 'src/type';
import {GET_FORECAST, SEARCH_COUNTRY} from './constant';
import {QueryParam} from './type';
import Rest from './Rest';
import {geoCodingIntance, openMeteoInstance} from './axios';

const geoCodingRestService = new Rest(geoCodingIntance);
const openMeteoRestService = new Rest(openMeteoInstance);

class OpenMeteoService {
  static async searchCountry({
    queryKey,
  }: QueryParam): Promise<SearchCountryRes> {
    const country = queryKey[1];
    const response = await geoCodingRestService.get<SearchCountryRes>(
      SEARCH_COUNTRY,
      {
        params: {
          name: country,
        },
      },
    );
    return response?.data;
  }

  static async getForecast({queryKey}: QueryParam): Promise<ForecastRes> {
    const lat = queryKey[1];
    const lon = queryKey[2];
    const repsonse = await openMeteoRestService.get<ForecastRes>(GET_FORECAST, {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m',
        hourly: 'temperature_2m,weather_code',
      },
    });
    return repsonse.data;
  }
}

export default OpenMeteoService;
