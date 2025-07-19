import localforage from 'localforage';

const localStorage = localforage.createInstance({ name: 'localforage' });

export const setSettings = async <T>(item: string, value: T) => {
  await localStorage.setItem(item, value);
};

export const getSettings = async <T>(
  item: string,
): Promise<T | null> => {
  return await localStorage.getItem(item);
};