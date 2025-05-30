<script lang="ts">
import { defineComponent } from 'vue';
import { type Checkbox, snackbar } from 'mdui';
import generateImage from '../utils/generateImage';
import { ComponentChannal } from '../utils/channal';

const FunctionBarChannal = new ComponentChannal('FunctionBar');

export default defineComponent({
  methods: {
    generateImage(){
      snackbar({
        message: '生成中……',
        placement: 'top',
      });

      generateImage();

      snackbar({
        message: '已自动下载！',
        placement: 'top',
      });
    },
    onlyB20Change(){
      const isOnlyB20 = (document.querySelector('#onlyB20') as Checkbox).checked;

      FunctionBarChannal.send<boolean>('SongRank', isOnlyB20);
    },
  },
});
</script>

<template>
  <mdui-card class="box">
    <div class="insideBox">
      <mdui-button @click="generateImage">生成图片</mdui-button>
      <mdui-checkbox id="onlyB20" @change="onlyB20Change">仅显示B20</mdui-checkbox>
    </div>
  </mdui-card>
</template>
