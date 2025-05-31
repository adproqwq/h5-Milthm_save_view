<script lang="ts">
import { defineComponent } from 'vue';
import type { Card } from 'mdui';
import type { ISaveSongRecord } from '@adpro/milthm-data-reader';
import { ComponentChannal } from '../utils/channal';
import renderSongRank from '../utils/renderSongRank';

export default defineComponent({
  mounted(){
    const SongRankChannal = new ComponentChannal('SongRank');

    SongRankChannal.listen(data => {
      if(data.sender === 'proxyWindow'){
        renderSongRank(data.message as ISaveSongRecord[]);
      }
      if(data.sender === 'FunctionBar'){
        const isOnlyB20 = data.message as boolean;

        const songRankCards = document.querySelector('#songRankCards') as Card;
        for(let i = songRankCards.childNodes.length - 1; i >= 0; i--){
          songRankCards.removeChild(songRankCards.childNodes[i]);
        }

        if(isOnlyB20) renderSongRank(window.save!.SongRecords, 20);
        else renderSongRank(window.save!.SongRecords);
      }
    });
  }
});
</script>

<template>
  <mdui-card variant="outlined" id="songRankCards" class="box" style="display: inline-block;"></mdui-card>
</template>

<style>
.songRank {
  height: 180px;
  width: 340px;
}
</style>