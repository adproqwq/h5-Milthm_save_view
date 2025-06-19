<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { Reality, type ISave, type ISaveSongRecord } from '@adpro/milthm-data-reader';
import { useRootStore } from '../stores/root';

export default defineComponent({
  computed: mapState(useRootStore, [
    'save',
    'songRecords',
  ]),
  methods: {
    reality(): string{
      const reality = new Reality(this.songRecords as ISaveSongRecord[]);

      let starString: string = '';
      for(let i = 0;i < reality.Star;i++){
        starString += '★';
      }

      const realityString = `${starString} ${reality.Reality.toFixed(4)}`;

      return realityString;
    },
  },
});
</script>

<template>
  <mdui-card variant="outlined" class="box">
    <div class="insideBox">
      <span>玩家：</span>
      <span id="userName">{{ (save as ISave).UserName }}</span>
      <br>
      <span>Reality：</span>
      <span id="reality">{{ reality()  }}</span>
    </div>
  </mdui-card>
</template>
