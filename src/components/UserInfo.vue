<script lang="ts">
import { defineComponent } from 'vue';
import { ComponentChannal } from '../utils/channal';

export default defineComponent({
  mounted(){
    const UserInfoChannal = new ComponentChannal('UserInfo');

    UserInfoChannal.listen<[ string, string ]>(data => {
      if(data.sender === 'proxyWindow'){
        document.querySelector('#userName')!.textContent = data.message[0];
        document.querySelector('#reality')!.textContent = data.message[1];
      }
    });
  }
});
</script>

<template>
  <mdui-card class="box">
    <div class="insideBox">
      <span>玩家：</span>
      <span id="userName"></span>
      <br>
      <span>Reality：</span>
      <span id="reality"></span>
    </div>
  </mdui-card>
</template>
