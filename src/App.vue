<script lang="ts">
import 'unfonts.css';
import 'mdui/mdui.css';
import 'mdui';
import { defineComponent } from 'vue';
import UploadSave from './components/UploadSave.vue';
import FunctionBar from './components/FunctionBar.vue';
import UserInfo from './components/UserInfo.vue';
import SongRank from './components/SongRank.vue';

export default defineComponent({
  components: {
    UploadSave,
    FunctionBar,
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
    <div id="functionBar" hidden>
      <FunctionBar></FunctionBar>
    </div>
    <div id="saveView">
      <div id="userInfo">
        <UserInfo></UserInfo>
      </div>
      <div id="songRank" hidden>
        <SongRank></SongRank>
      </div>
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
