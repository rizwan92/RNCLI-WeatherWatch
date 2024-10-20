import {useQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SEARCH_COUNTRY} from 'src/service/constant';
import OpenMeteoService from 'src/service/OpenMeteoService';
import {CountryType} from 'src/type';
import Loader from './Loader';
import {useDebounce} from 'src/utils/useDebounce';

interface CountrySearchProps {
  onSearchResult(country: CountryType): void;
}

const CountrySearch: React.FC<CountrySearchProps> = ({
  onSearchResult = () => {},
}) => {
  const [countryName, setCountryName] = React.useState('India');
  const debouncedCountryName = useDebounce(countryName, 500);
  const {error, isLoading, data, refetch} = useQuery({
    queryKey: [SEARCH_COUNTRY, debouncedCountryName],
    queryFn: OpenMeteoService.searchCountry,
    enabled: !!countryName,
  });

  useEffect(() => {
    const firstResult = data?.results?.[0];
    if (firstResult) {
      onSearchResult(firstResult);
    }
  }, [data, onSearchResult]);

  return (
    <View style={styles.container}>
      {error && (
        <View>
          <Text>Something went wrong: {error.message}</Text>
        </View>
      )}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Enter country name"
          value={countryName}
          onChangeText={text => setCountryName(text)}
          style={styles.textInput}
        />
        <Loader animating={isLoading} size="large" />
        <TouchableOpacity
          onPress={() => refetch()}
          style={{borderWidth: 1, padding: 10}}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CountrySearch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 10,
  },
  searchBox: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
