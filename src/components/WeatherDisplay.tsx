import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {GET_FORECAST} from 'src/service/constant';
import OpenMeteoService from 'src/service/OpenMeteoService';
import Loader from './Loader';
import WeatherImage from './WeatherImage';
import {WeatherCode} from 'src/helpers/getWeatherImage';

type WeeklyDataType = {
  time: string;
  weatherCode: string;
  temperature_2m: string;
  temperatureUnit: string;
};

interface WeatherDisplayProps {
  latitude?: number;
  longitude?: number;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  latitude = '',
  longitude = '',
}) => {
  const {error, data, isLoading} = useQuery({
    queryKey: [
      GET_FORECAST,
      latitude ? latitude.toString() : '',
      longitude ? longitude.toString() : '',
    ],
    queryFn: OpenMeteoService.getForecast,
    enabled: !!latitude && !!longitude,
  });

  const currentHours = data?.current.time
    ? new Date(data.current.time).getHours()
    : 0;
  // const isDay = currentTime > 6 && currentTime < 18;
  const weeklyDates = useMemo<WeeklyDataType[]>(() => {
    const result = data?.hourly.time
      .map((hour: string, index) => {
        const time = hour.includes(`T${currentHours}`);
        if (time) {
          const weatherCode = data?.hourly.weather_code[index]?.toString();
          const temperature_2m = data?.hourly.temperature_2m[index]?.toString();
          const temperatureUnit = data?.hourly_units.temperature_2m;
          return {time: hour, weatherCode, temperature_2m, temperatureUnit};
        }
      })
      .filter(Boolean) as WeeklyDataType[];
    return result || [];
  }, [
    currentHours,
    data?.hourly.temperature_2m,
    data?.hourly.time,
    data?.hourly.weather_code,
    data?.hourly_units.temperature_2m,
  ]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loader animating={true} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Weather information</Text>
      <Text style={styles.text}>
        Current Temp: {data?.current.temperature_2m}{' '}
        {data?.current_units.temperature_2m}
      </Text>
      <FlatList<WeeklyDataType>
        data={weeklyDates}
        keyExtractor={item => item.time}
        horizontal
        renderItem={({item}) => (
          <WeatherImage
            weatherCode={item.weatherCode as WeatherCode}
            time={item.time}
            temperature={item.temperature_2m}
            temperatureUnit={item.temperatureUnit}
          />
        )}
      />
    </View>
  );
};

export default WeatherDisplay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
