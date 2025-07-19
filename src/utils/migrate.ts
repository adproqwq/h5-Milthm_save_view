import { getSettings, setSettings } from './indexedDB';

if((await getSettings<boolean>('isTipsShow')) === null){
  if(localStorage.getItem('showTips') === 'false') await setSettings('isTipsShow', false);
  else await setSettings('isTipsShow', true);

  localStorage.removeItem('showTips');
}

if((await getSettings<ArrayBuffer>('imageBackground')) === null){
  const imageArrayBuffer = await (await fetch('./background.png')).arrayBuffer();
  await setSettings('imageBackground', imageArrayBuffer);
}