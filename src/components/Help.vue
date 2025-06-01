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
      <span>分数中的 x -> y，是推分建议，推到 1005000 的多半是无法对 Reality 作出影响的</span>
      <br>
      <span>排名中的 x -> y，意思是达到推荐分数后到达的排名，没进前20就不会影响 Reality</span>
    </div>
  </mdui-card>
</template>
