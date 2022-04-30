import React, {createRef} from 'react';
import {TextInput} from 'react-native';
import BorderInput from '../components/BorderInput';
import {FormProps} from '../screens/SignInScreen';

type Props = {
  isSignUp?: boolean;
  onSubmit: () => void;
  form: FormProps;
  createChangeTextHandler: (name: string) => (value: string) => void;
};
function SignForm({isSignUp, onSubmit, form, createChangeTextHandler}: Props) {
  const passwordRef = createRef<TextInput>();
  const confirmPassword = createRef<TextInput>();

  return (
    <>
      <BorderInput
        hasMarginBottom
        placeholder="이메일"
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <BorderInput
        placeholder="비밀번호"
        hasMarginBottom={isSignUp}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPassword.current?.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <BorderInput
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPassword}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}

export default SignForm;
