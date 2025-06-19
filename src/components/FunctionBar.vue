<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';
import { snackbar } from 'mdui';
import type { ISave } from '@adpro/milthm-data-reader';
import generateImage from '../utils/generateImage';

export default defineComponent({
  computed: mapState([
    'save',
    'isOnlyB20',
  ]),
  methods: {
    ...mapMutations([
      'B20',
    ]),
    generateImage(){
      snackbar({
        message: '生成中……',
        placement: 'top',
      });

      generateImage((this.save as ISave).UserName);

      snackbar({
        message: '已自动下载！',
        placement: 'top',
      });
    },
  },
});
</script>

<template>
  <mdui-card class="box" variant="outlined">
    <div class="insideBox">
      <mdui-button @click="generateImage">生成图片</mdui-button>
      <mdui-checkbox id="onlyB20" @change="B20" :checked="isOnlyB20">仅显示B20</mdui-checkbox>
    </div>
  </mdui-card>
</template>
