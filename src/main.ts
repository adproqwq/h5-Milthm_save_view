import { createApp } from 'vue';
import { createStore } from 'vuex';
import type { ISave } from '@adpro/milthm-data-reader';
import App from './App.vue';

const store = createStore({
  state(){
    return {
      save: undefined,
      songRecords: undefined,
      isOnlyB20: false,
    };
  },
  mutations: {
    saveUploaded(state, save: ISave){
      (state.save as any) = save;
      (state.songRecords as any) = save.SongRecords;
    },
    B20(state){
      state.isOnlyB20 = !state.isOnlyB20;
    },
  },
});

createApp(App).use(store).mount('#app');
