import { defineStore } from 'pinia';
import type { ISave, ISaveSongRecord } from '@adpro/milthm-data-reader';

interface State {
  save: ISave | undefined;
  songRecords: ISaveSongRecord[] | undefined;
  isOnlyB20: boolean;
};

export const useRootStore = defineStore('root', {
  state: (): State => {
    return {
      save: undefined,
      songRecords: undefined,
      isOnlyB20: false,
    };
  },
  actions: {
    saveUploaded(save: ISave){
      (this.save as any) = save;
      (this.songRecords as any) = save.SongRecords;
    },
    B20(){
      this.isOnlyB20 = !this.isOnlyB20;
    },
  },
});