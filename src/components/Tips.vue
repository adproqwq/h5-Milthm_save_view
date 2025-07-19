<script lang="ts">
import { defineComponent } from 'vue';
import { type Button, type Dialog, type RadioGroup, dialog, snackbar } from 'mdui';
import generateSafeQuestion from '../utils/generateSafeQuestion';
import { setSettings, getSettings } from '../utils/indexedDB';

export default defineComponent({
  methods: {
    disappear(){
      const div = document.createElement('div');

      div.append(
        generateSafeQuestion('移动存档文件的正确方式为？', ['移动', '剪切', '复制'], 'correctMoveMethod'),
        generateSafeQuestion('上传存档文件的正确方式为？', ['打开文件并上传内部文字', '直接上传文件', '上传其他东西'], 'correctUploadMethod'),
        generateSafeQuestion('如何对待存档文件？', ['我是大神，乱改数据', '我不懂，维持原样'], 'correctEditMethod'),
        generateSafeQuestion('如何反馈问题？', ['直接找Milthm官方', '通过各种方式联系开发者'], 'correctFeedMethod'),
      );

      dialog({
        headline: '请完成以下问题',
        description: '全部正确即可永久（？）停止弹出该弹窗',
        body: div,
        actions: [
          {
            text: '提交答案',
            onClick: async dialog => {
              if(
                (dialog.querySelector('#correctMoveMethod') as RadioGroup).value === '复制' &&
                (dialog.querySelector('#correctUploadMethod') as RadioGroup).value === '直接上传文件' &&
                (dialog.querySelector('#correctEditMethod') as RadioGroup).value === '我不懂，维持原样' &&
                (dialog.querySelector('#correctFeedMethod') as RadioGroup).value === '通过各种方式联系开发者'
              ){
                snackbar({
                  message: '该弹窗已不会再弹出！',
                  placement: 'top',
                });
                await setSettings('isTipsShow', false);

                this.close();
              }
              else snackbar({
                message: '有些题目的答案是错误的，你应继续认真仔细看弹窗的文字！',
                placement: 'top',
              });
            },
          },
        ],
      });
    },
    close(){
      const tips = document.querySelector('#beforeUse') as Dialog;

      tips.open = false;
    },
  },
  mounted(){
    new BroadcastChannel('MountChannal').onmessage = async e => {
      if(e.data == 'appMounted'){
        const tips = document.querySelector('#beforeUse') as Dialog;
        tips.addEventListener('open', () => {
          setTimeout(() => {
            (document.querySelector('#disappear') as Button).disabled = false;
            (document.querySelector('#ok') as Button).disabled = false;
          }, 5000);
        });
        if(await getSettings<boolean>('isTipsShow') !== false) tips.open = true;
      }
    };
  },
});
</script>

<template>
  <mdui-dialog
    id="beforeUse"
    headline="使用须知"
    description="在使用本查分器前你必须知道的东西！"
  >
    <span>本查分器<b>非官方</b>查分器，出现任何bug请勿寻找任何官方人员反馈！</span>
    <br>
    <span>你应清楚存档文件应被正确使用和获取，随意使用所带来的后果由你个人承担！</span>
    <br>
    <span>你应清楚不正确使用存档文件所带来的后果包括但不限于：<b>存档丢失、存档损坏等</b>！</span>
    <br>
    <span>你应清楚存档文件应为<b>复制</b>而非剪切或移动到外部文件夹中！</span>
    <br>
    <span>你应清楚当你点击下方按钮后即代表你已阅读这些文字，并清晰自己的行为会带来什么后果！</span>
    <br>
    <span>为确保文字被有效阅读，你需要等待<b>5秒</b>方可点击下方按钮！</span>
    <br>
    <span>你也可以通过回答一些必要的问题来永久（？）解除该弹窗！</span>

    <mdui-button variant="tonal" id="disappear" slot="action" disabled @click="disappear">不再提示</mdui-button>
    <mdui-button variant="filled" id="ok" slot="action" disabled @click="close">我已阅读并知悉</mdui-button>
  </mdui-dialog>
</template>