const RelicSubAffixConfig = require('./data/ExcelOutput/RelicSubAffixConfig.json');
;const AvatarSkillConfig = require('./data/ExcelOutput/AvatarSkillConfig.json');
const AvatarPlayerIcon = require('./data/ExcelOutput/AvatarPlayerIcon.json');
const AvatarRankConfig = require('./data/ExcelOutput/AvatarRankConfig.json');
const EquipmentConfig = require('./data/ExcelOutput/EquipmentConfig.json');
const RelicSetConfig = require('./data/ExcelOutput/RelicSetConfig.json');
const RelicDataInfo = require('./data/ExcelOutput/RelicDataInfo.json');
const AvatarConfig = require('./data/ExcelOutput/AvatarConfig.json');
const RelicConfig = require('./data/ExcelOutput/RelicConfig.json');
const PlayerIcon = require('./data/ExcelOutput/PlayerIcon.json');
const downloader = require('./lib/download');
const skillTree = require('./lib/skilltrees');
const textmaps = require('./lib/textmaps');
const lib = require('./lib/excels');
const fs = require('fs');

if (process.argv.slice(2) == '--download-content') {
  (async () => {
    await downloader.downloadMeta();
    await downloader.downloadSkillTree();
  })().catch(err => {
    console.error(err);
});
} else if (process.argv.slice(2) == '--excels') {
  const icons = lib.icons([AvatarPlayerIcon, PlayerIcon]);
  const characters = lib.characters(AvatarConfig);
  const lightcones = lib.lightcones(EquipmentConfig);
  const relics = lib.relics(RelicConfig, RelicDataInfo, RelicSetConfig);
  const ranks = lib.ranks(AvatarRankConfig);
  const skills = lib.skills(AvatarSkillConfig);
  const substattypes = lib.substatTypes(RelicSubAffixConfig);
  const skilltrees = skillTree.generate();
  
  [{ fn: 'icons.json', content: icons }, 
  { fn: 'characters.json', content: characters },
  { fn: 'lightcones.json', content: lightcones },
  { fn: 'relics.json', content: relics },
  { fn: 'ranks.json', content: ranks },
  { fn: 'skills.json', content: skills },
  { fn: 'substattypes.json', content: substattypes },
  { fn: 'skilltree.json', content: skilltrees }]
  .forEach((data) => {
    fs.writeFile(`./dump/${data.fn}`, JSON.stringify(data.content, null, 2), { flag: 'w' }, (err) => {
      if (err) console.error(err);
      else console.log(`${data.fn} generated successfully`);
    });
  });
} else if (process.argv.slice(2)[0] == '--textmaps-extra') {
  textmaps.generateNeededMaps();
} else if (process.argv.slice(2)[0] == '--textmaps') {
  textmaps.cookMaps();
} else {
  console.log('Invalid flag!');
}

