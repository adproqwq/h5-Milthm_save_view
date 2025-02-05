<script lang="ts">
import 'unfonts.css';
import 'mdui/mdui.css';
import 'mdui';
import { defineComponent } from 'vue';
import UploadSave from './components/UploadSave.vue';
import UserInfo from './components/UserInfo.vue';
import SongRank from './components/SongRank.vue';

export default defineComponent({
  components: {
    UploadSave,
    UserInfo,
    SongRank,
  },
});
</script>

<template>
  <div class="main">
    <div id="uploadSave">
      <UploadSave></UploadSave>
    </div>
    <div id="userInfo">
      <UserInfo></UserInfo>
    </div>
    <div id="songRank">
      <SongRank></SongRank>
    </div>
  </div>
</template>

<style>
.main {
  margin: auto;
  width: 80%;
}

.box {
  display: flex;
  margin: 10px;
  padding: 10px;
  vertical-align: middle;
  text-align: center;
  background-color: aliceblue;
}

.insideBox {
  margin: auto;
}

.insideBox span {
  display: inline-block;
  vertical-align: middle;
}
</style>
