import { Reality, type ISaveSongRecord } from '@adpro/milthm-data-reader';
import type { Card } from 'mdui';

export default (songRecodes: ISaveSongRecord[], length?: number) => {
  const reality = new Reality(songRecodes);
  const songRank = length ? reality.ScoreRank.slice(0, length) : reality.ScoreRank;
  const songAdvice = length ? reality.Advice.slice(0, length) : reality.Advice;
  const songRankCards = document.querySelector('#songRankCards') as Card;

  // 清除上次查询结果
  if(songRankCards.childElementCount != 0){
    for(let i = songRankCards.childNodes.length - 1; i >= 0; i--){
      songRankCards.removeChild(songRankCards.childNodes[i]!);
    }
  }

  songRank.forEach((songRank, index) => {
    const template = (document.querySelector('#card') as HTMLTemplateElement).content.cloneNode(true) as HTMLTemplateElement;

    let targetScore: string;
    if(songAdvice[index]!.targetScore === null) targetScore = '无法推分';
    else targetScore = songAdvice[index]!.targetScore.toFixed(0);

    template.querySelector('#rank')!.textContent = `${String(index + 1)} -> ${String(songAdvice[index]!.increasedRank)}`;
    template.querySelector('#songName')!.textContent = songRank.name;
    template.querySelector('#songDifficulty')!.textContent = `${songRank.category} ${songRank.constant}`;
    template.querySelector('#songLevel')!.textContent = songRank.BestLevel;
    template.querySelector('#songScore')!.textContent = `${String(songRank.BestScore)} -> ${targetScore}`;
    template.querySelector('#songAcc')!.textContent = `${(songRank.BestAccuracy * 100).toFixed(2)}%`;
    template.querySelector('#songReality')!.textContent = songRank.reality.toFixed(6);

    songRankCards.append(template);
  });
};