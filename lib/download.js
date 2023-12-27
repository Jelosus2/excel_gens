const fs = require('fs');

module.exports = {
  downloadMeta: async () => {
    const res = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/hsr/honker_meta.json');
    const data = await res.json();

    if (res.status != 200) return console.error('Error downloading meta.json', res);

    fs.writeFile('./dump/meta.json', JSON.stringify(data, null, 2), { flag: 'w' }, (err) => {
      if (err) console.error(err);
      else console.log('meta.json has been downloaded successfully');
    });
  },
  downloadSkillTree: async () => {
    const diffs = {
      'chs': 'zh-CN',
      'cht': 'zh-TW',
      'de': 'de',
      'en': 'en',
      'es': 'es',
      'fr': 'fr',
      'id': 'id',
      'jp': 'ja',
      'kr': 'ko',
      'pt': 'pt',
      'ru': 'ru',
      'th': 'th',
      'vi': 'vi'
    };

    Object.keys(diffs).forEach(async (key) => {
      const res = await fetch(`https://raw.githubusercontent.com/FortOfFans/HSRMaps/master/maps/${key}/avatartree.json`);
      const data = await res.json();

      if (res.status != 200) return console.error('Error downloading skilltree.json', res);

      fs.writeFile(`./data/SkillTree/avatartree_${diffs[key]}.json`, JSON.stringify(data, null, 2), { flag: 'w' }, (err) => {
        if (err) console.error(err);
        else console.log(`avatartree_${diffs[key]}.json has been downloaded successfully`);
      });
    });
  }
}