import React from 'react';
import {ActivityIndicator} from 'react-native';

type LoaderProps = {
  animating: boolean;
  size?: 'small' | 'large';
};

const Loader: React.FC<LoaderProps> = ({animating = true, size = 'large'}) => {
  return (
    <ActivityIndicator size={size} color="#00ff00" animating={animating} />
  );
};

export default Loader;
