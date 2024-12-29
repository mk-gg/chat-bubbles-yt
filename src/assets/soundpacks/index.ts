const soundPacks = import.meta.glob('./**/config.json', { eager: true });

const packs = Object.keys(soundPacks).reduce((acc, key) => {
  const packName = key.split('/')[1];
  acc[packName] = {
    config: soundPacks[key].default,
    sound: new URL(`./${packName}/sound.ogg`, import.meta.url).href,
  };
  return acc;
}, {});

export default packs;

