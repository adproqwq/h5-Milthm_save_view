<script lang="ts">
import { defineComponent } from 'vue';
import { ComponentChannal } from '../utils/channal';

export default defineComponent({
  mounted(){
    const UserInfoChannal = new ComponentChannal('UserInfo');

    UserInfoChannal.listen(data => {
      if(data.sender === 'proxyWindow'){
        const info = data.message as [string, string];
        document.querySelector('#userName')!.textContent = info[0];
        document.querySelector('#reality')!.textContent = info[1];
      }
    });
  }
});
</script>

<template>
  <mdui-card variant="outlined" class="box">
    <div class="insideBox">
      <mdui-button variant="filled" href="https://qm.qq.com/q/Utb6sNDvki" target="_blank">QQ交流群</mdui-button>
      <mdui-button variant="filled" href="https://github.com/adproqwq/h5-Milthm_save_view" target="_blank">Github仓库</mdui-button>
    </div>
  </mdui-card>
</template>
