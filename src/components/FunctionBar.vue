<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { snackbar } from 'mdui';
import { Reality, type ISave, type ISaveSongRecord } from '@adpro/milthm-data-reader';
import { ImageRenderer, type TrackItem } from '../utils/generateImage';
import { setSettings } from '../utils/indexedDB';
import { useRootStore } from '../stores/root';

export default defineComponent({
  computed: mapState(useRootStore, [
    'save',
    'songRecords',
    'isOnlyB20',
  ]),
  methods: {
    ...mapActions(useRootStore, [
      'B20',
    ]),
    async generateImage(){
      snackbar({
        message: '生成中……',
        placement: 'top',
      });

      const renderer = new ImageRenderer();
      const reality = new Reality(this.songRecords as ISaveSongRecord[]);

      const songRank = reality.ScoreRank.slice(0, 20);
      const advice = reality.Advice.slice(0, 20);

      const trackData: TrackItem[] = [];
      songRank.forEach((scoreRank, index) => {
        let targetScore = '';
        if(advice[index]!.targetScore === null) targetScore = '无法推分';
        else targetScore = advice[index]!.targetScore.toFixed(0);

        trackData.push({
          rank: (index + 1).toString(),
          title: scoreRank.name,
          difficulty: `${scoreRank.category} ${scoreRank.constant}`,
          grade: scoreRank.BestLevel,
          score: `${scoreRank.BestScore.toString()} -> ${targetScore}`,
          accuracy: `${(scoreRank.BestAccuracy * 100).toFixed(2)}%`,
        });
      });

      let starString: string = '';
      for(let i = 0;i < reality.Star;i++){
        starString += '★';
      }

      const playerInfo = {
        stars: starString,
        player: (this.save as ISave).UserName,
        reality: reality.Reality.toFixed(4),
      };

      const canvas = await renderer.render(trackData, playerInfo);
      canvas.toBlob(blob => {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob!);
        a.download = `${(this.save as ISave).UserName}.png`;
        a.click();
      });

      snackbar({
        message: '已自动下载！',
        placement: 'top',
      });
    },
    uploadImageButtonClicked(){
      (document.querySelector('#uploadImage') as HTMLInputElement).click();
    },
    async setImage(){
      const inputElement = document.querySelector('#uploadImage') as HTMLInputElement;

      const fileList = inputElement.files!;
      const imageArrayBuffer = await fileList[0]!.arrayBuffer();

      await setSettings('imageBackground', imageArrayBuffer);

      snackbar({
        message: '设置成功！',
        placement: 'top',
      });
    },
    async resetImage(){
      const imageArrayBuffer = await (await fetch('./background.png')).arrayBuffer();
      await setSettings('imageBackground', imageArrayBuffer);

      snackbar({
        message: '重置成功！',
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
      <input id="uploadImage" type="file" accept=".png" @change="setImage" hidden></input>
      <mdui-button @click="uploadImageButtonClicked">设置查分图背景图</mdui-button>
      <mdui-button @click="resetImage">重置查分图背景图</mdui-button>
      <mdui-checkbox id="onlyB20" @change="B20" :checked="isOnlyB20">仅显示B20</mdui-checkbox>
    </div>
  </mdui-card>
</template>
