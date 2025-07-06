<script lang="ts">
import 'unfonts.css';
import 'mdui/mdui.css';
import 'mdui';
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { setColorScheme } from 'mdui';
import UploadSave from './components/UploadSave.vue';
import FunctionBar from './components/FunctionBar.vue';
import UserInfo from './components/UserInfo.vue';
import SongRank from './components/SongRank.vue';
import Tips from './components/Tips.vue';
import Contact from './components/Contact.vue';
import Friends from './components/Friends.vue';
import Help from './components/Help.vue';
import { ComponentChannal } from './utils/channal';
import { useRootStore } from './stores/root';

export default defineComponent({
  computed: mapState(useRootStore, [
    'save',
  ]),
  components: {
    UploadSave,
    Contact,
    Friends,
    FunctionBar,
    UserInfo,
    SongRank,
    Tips,
    Help,
  },
  mounted(){
    const AppChannal = new ComponentChannal('App');

    setColorScheme('#F0F8FF');

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
    <div id="contact">
      <Contact></Contact>
    </div>
    <div id="contact">
      <Friends></Friends>
    </div>
    <div id="functionBar" v-if="save">
      <FunctionBar></FunctionBar>
    </div>
    <div id="saveView" v-if="save">
      <div id="userInfo">
        <UserInfo></UserInfo>
      </div>
      <div id="help">
        <Help></Help>
      </div>
      <div id="songRank">
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
