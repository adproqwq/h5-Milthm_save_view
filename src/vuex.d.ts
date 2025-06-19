import { Store } from 'vuex';
import type { ISave, ISaveSongRecord } from '@adpro/milthm-data-reader';

declare module 'vue'{
  interface State {
    save: ISave,
    songRecords: ISaveSongRecord[];
    isOnlyB20: boolean,
  }

  interface ComponentCustomProperties{
    $store: Store<State>;
  }
}