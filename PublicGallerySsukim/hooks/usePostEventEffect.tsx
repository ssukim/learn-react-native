import {useEffect} from 'react';
import events from '../lib/event';
import {UpdatePostProps} from '../lib/posts';

type Props = {
  refresh: () => void;
  removePost: (postId: string) => void;
  updatePost: ({id, description}: UpdatePostProps) => void;
  enabled: boolean;
};
export default function usePostsEventEffect({
  refresh,
  removePost,
  updatePost,
  enabled,
}: Props) {
  useEffect(() => {
    // 자신의 프로필을 보고 있을 때만 새 포스트 작성 후 새로고침
    if (!enabled) {
      return;
    }
    events.addListener('refresh', refresh);
    events.addListener('removePost', removePost);
    events.addListener('updatePost', updatePost);
    return () => {
      events.removeListener('refresh', refresh);
      events.removeListener('removePost', removePost);
      events.removeListener('updatePost', updatePost);
    };
  }, [refresh, removePost, updatePost, enabled]);
}
