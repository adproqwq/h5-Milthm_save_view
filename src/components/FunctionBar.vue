<script lang="ts">
import { defineComponent } from 'vue';
import { type Checkbox, type Card, snackbar } from 'mdui';
import generateImage from '../utils/generateImage';
import renderSongRank from '../utils/renderSongRank';

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

      const songRankCards = document.querySelector('#songRankCards') as Card;
      for(let i = songRankCards.childNodes.length - 1; i >= 0; i--){
        songRankCards.removeChild(songRankCards.childNodes[i]);
      }

      if(isOnlyB20) renderSongRank(window.save!.SongRecords, 20);
      else renderSongRank(window.save!.SongRecords);
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
