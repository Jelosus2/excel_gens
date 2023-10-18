const AvatarSkillConfig = require('../data/ExcelOutput/AvatarSkillConfig.json');

module.exports = {
  generate: () => {
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

    let json = {};

    langList.forEach((language) => {
      const skillTree = require(`../data/SkillTree/avatartree_${language}.json`);

      json[language] = {};

      Object.keys(skillTree).forEach((key) => {
        json[language][key] = {
          avatarId: skillTree[key].avatar,
          avatarName: skillTree[key].avatarName,
          type: skillTree[key].type,
          pos: skillTree[key].pos,
          icon: skillTree[key].icon,
          status: skillTree[key].status.length > 0 
            ? { PropertyType: skillTree[key].status[0].PropertyType, Value: skillTree[key].status[0].Value.Value }
            : {},
          baseSkill: skillTree[key].baseSkill.length > 0
            ? { Id: skillTree[key].baseSkill[0], Name: AvatarSkillConfig[skillTree[key].baseSkill[0]]["1"].SkillName.Hash }
            : {}
        };

        if (skillTree[key].name) json[language][key].name = skillTree[key].name;
      });
    });

    return json;
  }
};