<script lang="ts">
import { defineComponent } from 'vue';
import { ComponentChannal } from '../utils/channal';

export default defineComponent({
  mounted(){
    const UserInfoChannal = new ComponentChannal('UserInfo');

    UserInfoChannal.listen(data => {
      if(data.sender === 'proxyWindow'){
        const info = data.message as [string, string, number];
        let star: string = '';

        for(let i = 0;i < info[2];i++){
          star += '★';
        }
        document.querySelector('#userName')!.textContent = info[0];
        document.querySelector('#reality')!.textContent = `${star} ${info[1]}`;
      }
    });
  }
});
</script>

<template>
  <mdui-card variant="outlined" class="box">
    <div class="insideBox">
      <span>玩家：</span>
      <span id="userName"></span>
      <br>
      <span>Reality：</span>
      <span id="reality"></span>
    </div>
  </mdui-card>
</template>
