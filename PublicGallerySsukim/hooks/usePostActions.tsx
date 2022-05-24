import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {ActionSheetIOS, Platform} from 'react-native';
import {removePost} from '../lib/posts';
import {RootStackNavigationProps} from '../screens/RootStack';

type Props = {
  id: string;
  description: string;
};
export default function usePostActions({id, description}: Props) {
  const [isSelecting, setIsSelection] = useState(false);
  const navigation = useNavigation<RootStackNavigationProps>();
  const route = useRoute();

  const edit = () => {
    navigation.navigate('Modify', {
      id,
      description,
    });
  };

  const remove = async () => {
    await removePost(id);

    // 현재 단일 포스트 조회 화면이라면 뒤로가기
    if (route.name === 'Post') {
      navigation.pop();
    }

    // TODO: 홈 및 프로필 화면의 목록 업데이트
  };

  const onPressMore = () => {
    if (Platform.OS === 'android') {
      setIsSelection(true);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['설명 수정', '게시물 삭제', '취소'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            edit();
          } else if (buttonIndex === 1) {
            remove();
          }
        },
      );
    }
  };

  const actions = [
    {
      icon: 'edit',
      text: '설명 수정',
      onPress: edit,
    },
    {
      icon: 'delete',
      text: '게시물 삭제',
      onPress: remove,
    },
  ];

  const onClose = () => {
    setIsSelection(false);
  };

  return {
    isSelecting,
    onPressMore,
    onClose,
    actions,
  };
}
