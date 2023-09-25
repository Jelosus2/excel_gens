const AvatarPlayerIcon = require('./data/ExcelOutput/AvatarPlayerIcon.json');
const AvatarRankConfig = require('./data/ExcelOutput/AvatarRankConfig.json');
const EquipmentConfig = require('./data/ExcelOutput/EquipmentConfig.json');
const RelicSetConfig = require('./data/ExcelOutput/RelicSetConfig.json');
const RelicDataInfo = require('./data/ExcelOutput/RelicDataInfo.json');
const AvatarConfig = require('./data/ExcelOutput/AvatarConfig.json');
const RelicConfig = require('./data/ExcelOutput/RelicConfig.json');
const PlayerIcon = require('./data/ExcelOutput/PlayerIcon.json');
const skillTree = require('./lib/skilltrees');
const textmaps = require('./lib/textmaps');
const lib = require('./lib/excels');
const fs = require('fs');

if (!process.argv.slice(2)[0] || process.argv.slice(2) == '--excels') {
  const icons = lib.icons([AvatarPlayerIcon, PlayerIcon]);
  const characters = lib.characters(AvatarConfig);
  const lightcones = lib.lightcones(EquipmentConfig);
  const relics = lib.relics(RelicConfig, RelicDataInfo, RelicSetConfig);
  const ranks = lib.ranks(AvatarRankConfig);
  const skilltrees = skillTree.generate();
  
  [{ fn: 'icons.json', content: icons }, 
  { fn: 'characters.json', content: characters },
  { fn: 'lightcones.json', content: lightcones },
  { fn: 'relics.json', content: relics },
  { fn: 'ranks.json', content: ranks },
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

