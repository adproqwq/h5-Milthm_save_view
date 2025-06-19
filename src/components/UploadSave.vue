<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import { snackbar } from 'mdui';
import type { ISave } from '@adpro/milthm-data-reader';
import upload from '../utils/upload';

export default defineComponent({
  methods: {
    ...mapMutations([
      'saveUploaded',
    ]),
    uploadCardClick(){
      document.querySelector<HTMLInputElement>('#upload')!.click();
    },
    async upload(){
      const resultChannal = new BroadcastChannel('getSaveChannal');
      resultChannal.onmessage = (ev) => {
        this.saveUploaded(ev.data as ISave);
      };

      snackbar({
        message: '读取中……',
        placement: 'top',
      });

      await upload();
    },
  },
});
</script>

<template>
  <mdui-card variant="outlined" class="box">
    <input id="upload" type="file" accept=".db" @change="upload" hidden></input>
    <mdui-card variant="outlined" class="insideBox" style="height: 180px; width: 340px; line-height: 50px;" @click="uploadCardClick" clickable>
      <span>点击上传存档文件</span>
      <br>
      <span>Milthm 3.8.0及以上版本获取的saves.db文件</span>
    </mdui-card>
  </mdui-card>
</template>