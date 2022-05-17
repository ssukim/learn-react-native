import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import BorderInput from '../components/BorderInput';
import CustomButton from '../components/CustomButton';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/user';
import {
  RootStackNavigationProps,
  RootStackWelcomeRouteProps,
} from './RootStack';
import storage from '@react-native-firebase/storage';
import Avatar from '../components/Avartar';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation<RootStackNavigationProps>();
  const {setUser} = useUserContext();
  const [response, setResponse] = useState<ImagePickerResponse | null>(null);

  const {params} = useRoute<RootStackWelcomeRouteProps>();
  const {uid} = params || {};
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    let photoURL = null;

    if (response) {
      const asset = response?.assets && response?.assets[0];
      const extension = asset?.fileName?.split('.').pop(); // 확장자 추출
      const reference = storage().ref(`/profile/${uid}.${extension}`);

      try {
        if (Platform.OS === 'android') {
          await reference.putString(asset?.base64 || '', 'base64', {
            contentType: asset?.type,
          });
        } else {
          await reference.putFile(asset?.uri || '');
        }
        await reference.getDownloadURL();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    const user = {
      id: uid,
      displayName,
      photoURL,
    };

    createUser(user);
    setUser(user);
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          // 취소 시
          return;
        }
        setResponse(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable style={styles.circle} onPress={onSelectImage}>
        <Avatar
          source={response?.assets ? {uri: response?.assets[0]?.uri} : null}
          size={128}
        />
      </Pressable>
      <View style={styles.form}>
        <BorderInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        {loading ? (
          <ActivityIndicator size={32} color="#6200ee" style={styles.spinner} />
        ) : (
          <View style={styles.buttons}>
            <CustomButton
              title="다음"
              onPress={onSubmit}
              hasMarginBottom
              theme="primary"
            />
            <CustomButton title="취소" onPress={onCancel} theme="secondary" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
  spinner: {
    marginTop: 48,
    height: 104,
  },
});

export default SetupProfile;
