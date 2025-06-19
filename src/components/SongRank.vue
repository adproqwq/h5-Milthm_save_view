<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import type { ISaveSongRecord } from '@adpro/milthm-data-reader';
import renderSongRank from '../utils/renderSongRank';

export default defineComponent({
  computed: mapState([
    'songRecords',
    'isOnlyB20',
  ]),
  watch: {
    isOnlyB20(){
      this.render();
    },
  },
  methods: {
    render(){
      if(this.isOnlyB20 as boolean) renderSongRank(this.songRecords as ISaveSongRecord[], 20);
      else renderSongRank(this.songRecords as ISaveSongRecord[]);
    },
  },
  mounted(){
    this.render();
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