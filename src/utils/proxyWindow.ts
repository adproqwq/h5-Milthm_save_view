import { Reality, type ISave, type ISaveSongRecord } from '@adpro/milthm-data-reader';
import { ComponentChannal } from './channal';

export default new Proxy(window, {
  set(target, p, newValue){
    if(p == 'save'){
      const proxyWindowChannal = new ComponentChannal('proxyWindow');

      const reality = new Reality((newValue as ISave).SongRecords);

      proxyWindowChannal.send<[ string, string ]>('UserInfo', [(newValue as ISave).UserName, reality.Reality.toFixed(4)]);
      proxyWindowChannal.send<ISaveSongRecord[]>('SongRank', (newValue as ISave).SongRecords);
      proxyWindowChannal.send<string>('App', 'newSave');
    }

    target[p as any] = newValue;

    return true;
  },
});