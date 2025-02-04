const EquipmentLevelTemplateTb = require("./data/FileCfg/EquipmentLevelTemplateTb.json");
const WeaponLevelTemplateTb = require("./data/FileCfg/WeaponLevelTemplateTb.json");
const WeaponStarTemplateTb = require("./data/FileCfg/WeaponStarTemplateTb.json");
const lib = require("./lib/excels");

if (process.argv.slice(2)[0] == "--excels") {
    const weaponMeta = lib.weaponMeta(WeaponLevelTemplateTb, WeaponStarTemplateTb);
    const discDriveMeta = lib.discDriveMeta(EquipmentLevelTemplateTb);
    
    [
        { fn: "weaponmeta.json", data: weaponMeta },
        { fn: "discdrivemeta.json", data: discDriveMeta }
    ]
    .forEach((obj) => {
        lib.writeFile(obj.fn, obj.data);
    });
}
