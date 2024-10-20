import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import getWeatherImage, {WeatherCode} from 'src/helpers/getWeatherImage';

type WeatherImageProps = {
  weatherCode: WeatherCode;
  time: string;
  temperature: string;
  temperatureUnit: string;
};

const WeatherImage: React.FC<WeatherImageProps> = ({
  weatherCode = '0',
  time,
  temperature,
  temperatureUnit,
}) => {
  const weatherImage = getWeatherImage(weatherCode);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: weatherImage.image,
        }}
      />
      <Text style={styles.text}>
        {weatherImage.description} {temperature} {temperatureUnit}
      </Text>
      <Text style={styles.timeText}>
        {moment(time, 'YYYY-MM-DDTHH:mm').format('dddd DD MMM')}
      </Text>
    </View>
  );
};

export default WeatherImage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
    height: 150,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
});
