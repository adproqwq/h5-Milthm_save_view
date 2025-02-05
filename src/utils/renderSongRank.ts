import { Reality, type ISaveSongRecord } from '@adpro/milthm-data-reader';
import type { Card } from 'mdui';

export default (songRecodes: ISaveSongRecord[]) => {
  const reality = new Reality(songRecodes);
  const songRank = reality.ScoreRank;
  const songRankCard = document.querySelector('#songRankCard') as Card;

  songRank.forEach((songRank, index) => {
    const template = (document.querySelector('#card') as HTMLTemplateElement).content.cloneNode(true) as HTMLTemplateElement;

    template.querySelector('#rank')!.textContent = String(index + 1);
    template.querySelector('#songName')!.textContent = songRank.name;
    template.querySelector('#songDifficulty')!.textContent = `${songRank.category} ${songRank.constant}`;
    template.querySelector('#songLevel')!.textContent = songRank.BestLevel;
    template.querySelector('#songScore')!.textContent = String(songRank.BestScore);
    template.querySelector('#songAcc')!.textContent = `${(songRank.BestAccuracy * 100).toFixed(2)}%`;
    template.querySelector('#songReality')!.textContent = songRank.reality.toFixed(6);

    songRankCard.append(template);
  });
};