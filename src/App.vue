<script lang="ts">
import 'unfonts.css';
import 'mdui/mdui.css';
import 'mdui';
import { defineComponent } from 'vue';
import { setColorScheme } from 'mdui';
import UploadSave from './components/UploadSave.vue';
import FunctionBar from './components/FunctionBar.vue';
import UserInfo from './components/UserInfo.vue';
import SongRank from './components/SongRank.vue';
import Tips from './components/Tips.vue';
import { ComponentChannal } from './utils/channal';

export default defineComponent({
  components: {
    UploadSave,
    FunctionBar,
    UserInfo,
    SongRank,
    Tips,
  },
  mounted(){
    const AppChannal = new ComponentChannal('App');

    setColorScheme('#F0F8FF');

    AppChannal.listen(data => {
      if(data.sender === 'proxyWindow'){
        if(data.message as string === 'newSave'){
          (document.querySelector('#functionBar') as HTMLDivElement).hidden = false;
          (document.querySelector('#songRank') as HTMLDivElement).hidden = false;
        }
      }
    });

    AppChannal.send<string>('Tips', 'mounted');
  },
});
</script>

<template>
  <Tips></Tips>
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
}

.insideBox {
  margin: auto;
}

.insideBox span {
  display: inline-block;
  vertical-align: middle;
}
</style>
