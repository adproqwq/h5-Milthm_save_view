import initSqlJs from 'sql.js';
import json5 from 'json5';
import type { ISave } from '@adpro/milthm-data-reader';
import { snackbar } from 'mdui';

export default async () => {
  const resultChannal = new BroadcastChannel('getSaveChannal');

  const inputElement = document.querySelector('input#upload') as HTMLInputElement;
  const SQL = await initSqlJs({
    locateFile: () => `./sql-wasm.wasm`,
  });

  const fileList = inputElement.files;
  if (!fileList) return;

  const file = fileList![0];

  const fileReader = new FileReader();

  fileReader.onload = () => {
    const Uints = new Uint8Array(fileReader.result as ArrayBuffer);

    const db = new SQL.Database(Uints);

    const save = json5.parse<ISave>(db.exec('SELECT value FROM "kv"')[0].values[1][0] as string);

    resultChannal.postMessage(save);

    snackbar({
      message: '读取成功！',
      placement: 'top',
    });
  };
  fileReader.readAsArrayBuffer(file);
};