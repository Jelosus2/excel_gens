const AvatarSkillTreeConfig = require('../data/ExcelOutput/AvatarSkillTreeConfig.json').filter((skill) => skill.Level == 1);
const AvatarSkillConfig = require('../data/ExcelOutput/AvatarSkillConfig.json');
const fs = require('fs');

module.exports = {
  generate: () => {
    const characters = require('../dump/characters.json');

    const langList = [
      "de",
      "en",
      "es",
      "fr",
      "id",
      "ja",
      "ko",
      "pt",
      "ru",
      "th",
      "vi",
      "zh-CN",
      "zh-TW"
    ];

    const langFileList = {
      "de": "DE",
      "en": "EN",
      "es": "ES",
      "fr": "FR",
      "id": "ID",
      "ja": "JP",
      "ko": "KR",
      "pt": "PT",
      "ru": "RU",
      "th": "TH",
      "vi": "VI",
      "zh-CN": "CHS",
      "zh-TW": "CHT"
    }

    let json = {};

    for (let lang of langList) {
      const textMap = require(`../data/TextMap/TextMap${langFileList[lang]}.json`);

      json[lang] = {};
      for (let skill of AvatarSkillTreeConfig) {
        json[lang][skill.PointID] = {
          avatarId: skill.AvatarID,
          avatarName: textMap[characters[skill.AvatarID].AvatarName],
          type: skill.PointType,
          pos: skill.Anchor,
          icon: skill.IconPath,
          status: skill.StatusAddList.length > 0
            ? { PropertyType: skill.StatusAddList[0].PropertyType, Value: skill.StatusAddList[0].Value.Value }
            : {},
          baseSkill: skill.LevelUpSkillID.length > 0
            ? { Id: skill.LevelUpSkillID[0] }
            : {}
        }

        const skillNameHash = AvatarSkillConfig.find((skill_) => skill_.SkillID == json[lang][skill.PointID].baseSkill.Id && skill_.Level == 1)?.SkillName?.Hash;
        if (skillNameHash)
          json[lang][skill.PointID].name = textMap[skillNameHash];
      }
    }

    fs.writeFile('./dump/skilltree.json', JSON.stringify(json, null, 2), { flag: 'w' }, (err) => {
      if (err) console.error(err);
      else console.log('skilltree.json generated successfully');
    });
  }
};