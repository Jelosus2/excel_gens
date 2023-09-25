const { GetStableHash } = require('../utils/hash');

module.exports = {
  /**
   * @param {Array} data 
   */
  icons: (data) => {
    let json = {};

    data.forEach((file) => {
      Object.keys(file).forEach((key) => {
        json[key] = {
          ImagePath: file[key].ImagePath
        };
      });
    });

    return json;
  },
  characters: (data) => {
    let json = {};

    Object.keys(data).forEach((key) => {
      json[key] = {
        AvatarName: data[key].AvatarName.Hash,
        Rarity: +data[key].Rarity.replace('CombatPowerAvatarRarityType', ''),
        Element: data[key].DamageType,
        AvatarBaseType: data[key].AvatarBaseType,
        AvatarSideIconPath: data[key].AvatarSideIconPath,
        AvatarCutinFrontImgPath: data[key].AvatarCutinFrontImgPath,
        RankIDList: data[key].RankIDList,
        SkillList: data[key].SkillList
      };
    });

    return json;
  },
  lightcones: (data) => {
    let json = {};

    Object.keys(data).forEach((key) => {
      json[key] = {
        Rarity: +data[key].Rarity.replace('CombatPowerLightconeRarity', ''),
        AvatarBaseType: data[key].AvatarBaseType,
        EquipmentName: data[key].EquipmentName.Hash,
        ImagePath: data[key].ImagePath.replace('Max', '')
      };
    });

    return json;
  },
  relics: (data, info, set) => {
    let json = {};

    Object.keys(data).forEach((key) => {
      json[key] = {
        Rarity: +data[key].Rarity.replace('CombatPowerRelicRarity', ''),
        Type: data[key].Type,
        MainAffixGroup: data[key].MainAffixGroup,
        SubAffixGroup: data[key].SubAffixGroup,
        SetId: data[key].SetID,
        Icon: info[data[key].SetID][data[key].Type].IconPath,
        Name: GetStableHash(info[data[key].SetID][data[key].Type].RelicName),
        SetName: set[data[key].SetID].SetName.Hash
      };
    });

    return json;
  },
  ranks: (data) => {
    let json = {};

    Object.keys(data).forEach((key) => {
      json[key] = {
        IconPath: data[key].IconPath,
        Name: GetStableHash(data[key].Name),
        SkillAddLevelList: data[key].SkillAddLevelList || {}
      };
    });

    return json;
  }
};