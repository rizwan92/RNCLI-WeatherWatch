import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import WeatherDisplay from './components/WeatherDisplay';
import CountrySearch from './components/CountrySearch';
import {CountryType} from './type';

const Root: React.FC = () => {
  const [country, setCountry] = React.useState<CountryType>();

  return (
    <SafeAreaView style={styles.container}>
      <CountrySearch onSearchResult={ctry => setCountry(ctry)} />
      {country && (
        <>
          <View style={styles.countryInfo}>
            <Text style={styles.text}>country: {country?.name}</Text>
            <Text style={styles.text}>lat: {country?.latitude}</Text>
            <Text style={styles.text}>long: {country?.longitude}</Text>
            <Text style={styles.text}>time-zone: {country?.timezone}</Text>
          </View>
          <WeatherDisplay
            latitude={country?.latitude}
            longitude={country?.longitude}
          />
        </>
      )}
    </SafeAreaView>
  );
};
export default Root;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  countryInfo: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});
