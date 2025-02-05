import { Reality, type ISave } from '@adpro/milthm-data-reader';
import renderSongRank from './renderSongRank';

export default new Proxy(window, {
  set(target, p, newValue){
    if(p == 'save'){
      const reality = new Reality((newValue as ISave).SongRecords);

      document.querySelector('#userName')!.textContent = (newValue as ISave).UserName;
      document.querySelector('#reality')!.textContent = reality.Reality.toFixed(2);
      renderSongRank((newValue as ISave).SongRecords);
    }

    target[p as any] = newValue;

    return true;
  },
});