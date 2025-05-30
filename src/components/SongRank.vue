<script lang="ts">
import { defineComponent } from 'vue';
import type { ISaveSongRecord } from '@adpro/milthm-data-reader';
import { ComponentChannal } from '../utils/channal';
import renderSongRank from '../utils/renderSongRank';

export default defineComponent({
  mounted(){
    const SongRankChannal = new ComponentChannal('SongRank');

    SongRankChannal.listen<ISaveSongRecord[]>(data => {
      if(data.sender === 'proxyWindow'){
        renderSongRank(data.message);
      }
    });
  }
});
</script>

<template>
  <mdui-card id="songRankCards" class="box" style="display: inline-block;"></mdui-card>
</template>

<style>
.songRank {
  height: 180px;
  width: 340px;
}
</style>