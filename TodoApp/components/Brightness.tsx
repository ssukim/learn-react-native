import {NativeModules} from 'react-native';

const {BrightnessModule} = NativeModules;

export const getBrightness = () => BrightnessModule.getBrightness();

export const setBrightness = (brightness: number) => {
  BrightnessModule.setBrightness(brightness);
};