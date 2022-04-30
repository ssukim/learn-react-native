import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

type Props = {
  hasMarginBottom?: boolean;
} & TextInputProps;
function BorderInput(
  {hasMarginBottom, ...rest}: Props,
  ref: React.ForwardedRef<TextInput>,
) {
  return (
    <TextInput
      ref={ref}
      style={[styles.input, hasMarginBottom && styles.margin]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
});

export default React.forwardRef(BorderInput);
