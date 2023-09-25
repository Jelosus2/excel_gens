const fs = require('fs');

module.exports = {
  generateNeededMaps: () => {
    let hashes = [];

    [
      'characters','lightcones',
      'skilltree','relics',
      'ranks'
    ].forEach((exName, i) => {
      const excel = require(`../dump/${exName}.json`);

      if (i == 0) {
        Object.keys(excel).forEach((key) => {
          hashes.push(excel[key].AvatarName);
        });
      } else if (i == 1) {
        Object.keys(excel).forEach((key) => {
          hashes.push(excel[key].EquipmentName);
        });
      } else if (i == 2) {
        Object.keys(excel).forEach((langKey) => {
          Object.keys(excel[langKey]).forEach((key) => {
            if (excel[langKey][key].baseSkill.Name) hashes.push(excel[langKey][key].baseSkill.Name);
          });
        });
      } else if (i == 3) {
        Object.keys(excel).forEach((key) => {
          if (!hashes.includes(excel[key].Name)) {
            hashes.push(excel[key].Name)
          }
          if (!hashes.includes(excel[key].SetName)) {
            hashes.push(excel[key].SetName)
          }
        });
      } else if (i == 4) {
        Object.keys(excel).forEach((key) => {
          hashes.push(excel[key].Name);
        });
      }
    });

    fs.writeFile('./data/Others/neededHashes.json', JSON.stringify(hashes, null, 2), { flag: 'w' }, (err) => {
      if (err) console.error(err)
      else console.log(hashes.length + " new needed hashes were saved!");
    });
  },
  cookMaps: () => {
    let json = {};

    const neededHashes = require('../data/Others/neededHashes.json');
    const parsedLangs = {
      "CHS": "zh-CN",
      "CHT": "zh-TW",
      "JP": "ja",
      "KR": "ko"
    };

    [
      "CHS", "CHT", "DE",
      "EN", "ES", "FR",
      "ID", "JP", "KR",
      "PT", "RU", "TH",
      "VI"
    ].forEach((langCode) => {
      const textmap = require(`../data/TextMap/TextMap${langCode}.json`);

      if (parsedLangs[langCode]) {
        json[parsedLangs[langCode]] = {};
        neededHashes.forEach((hash) => {
          json[parsedLangs[langCode]][hash] = textmap[hash];
        });
      } else {
        json[langCode.toLowerCase()] = {};
        neededHashes.forEach((hash) => {
          json[langCode.toLowerCase()][hash] = textmap[hash];
        });
      };
    });

    fs.writeFile('./dump/hashes.json', JSON.stringify(json, null, 2), { flag: 'w' }, (err) => {
      if (err) console.error(err);
      else console.log('hashes.json generated successfully');
    }); 
  }
};