const { GetStableHash } = require('../utils/hash');

module.exports = {
  /**
   * @param {Array} data 
   */
  icons: (data) => {
    let json = {};

    data.forEach((file) => {
      file.forEach((icon) => {
        json[icon.ID] = {
          ImagePath: icon.ImagePath
        };
      });
    });

    return json;
  },
  characters: (data) => {
    let json = {};

    data.forEach((character) => {
      json[character.AvatarID] = {
        AvatarName: character.AvatarName.Hash,
        Rarity: +character.Rarity.replace('CombatPowerAvatarRarityType', ''),
        Element: character.DamageType,
        AvatarBaseType: character.AvatarBaseType,
        AvatarSideIconPath: character.AvatarSideIconPath,
        AvatarCutinFrontImgPath: character.AvatarCutinFrontImgPath,
        RankIDList: character.RankIDList,
        SkillList: character.SkillList
      };
    });

    return json;
  },
  lightcones: (data) => {
    let json = {};

    data.forEach((lightcone) => {
      json[lightcone.EquipmentID] = {
        Rarity: +lightcone.Rarity.replace('CombatPowerLightconeRarity', ''),
        AvatarBaseType: lightcone.AvatarBaseType,
        EquipmentName: lightcone.EquipmentName.Hash,
        ImagePath: lightcone.ImagePath.replace('Max', '')
      };
    });

    return json;
  },
  relics: (data, info, set) => {
    let json = {};

    data.forEach((relic) => {
      json[relic.ID] = {
        Rarity: +relic.Rarity.replace('CombatPowerRelicRarity', ''),
        Type: relic.Type,
        MainAffixGroup: relic.MainAffixGroup,
        SubAffixGroup: relic.SubAffixGroup,
        SetId: relic.SetID,
        Icon: info.find((relicInfo) => relicInfo.SetID == relic.SetID && relicInfo.Type == relic.Type).IconPath,
        Name: GetStableHash(info.find((relicInfo) => relicInfo.SetID == relic.SetID && relicInfo.Type == relic.Type).RelicName),
        SetName: set.find((relicSet) => relicSet.SetID == relic.SetID).SetName.Hash
      };
    });

    return json;
  },
  ranks: (data) => {
    let json = {};

    data.forEach((rank) => {
      json[rank.RankID] = {
        IconPath: rank.IconPath.replace(/Avatar\/\d{4}\//, ''),
        Name: GetStableHash(rank.Name),
        SkillAddLevelList: rank.SkillAddLevelList || {}
      };
    });

    return json;
  },
  skills: (data) => {
    let json = {};
    let lastSkillID;

    data.forEach((skill) => {
      if (lastSkillID != skill.SkillID) {
        json[skill.SkillID] = {
          Name: skill.SkillName.Hash,
          SkillIcon: skill.SkillIcon.replace(/Avatar\/\d{4}\//, '')
        };
        lastSkillID = skill.SkillID;
      }
    });

    return json;
  },
  substatTypes: (data) => {
    let json = {};

    data.filter((substat) => substat.GroupID == 2).forEach((substat) => {
      json[substat.AffixID] = {
        Property: substat.Property
      }
    });

    return json;
  }
};