const WeaponLevelTemplateTb = require("./data/FileCfg/WeaponLevelTemplateTb.json");
const WeaponStarTemplateTb = require("./data/FileCfg/WeaponStarTemplateTb.json");
const lib = require("./lib/excels");

if (process.argv.slice(2)[0] == "--excels") {
    const weaponMeta = lib.weaponMeta(WeaponLevelTemplateTb, WeaponStarTemplateTb);
    
    [{ fn: "weaponmeta.json", data: weaponMeta }]
    .forEach((obj) => {
        lib.writeFile(obj.fn, obj.data);
    });
}
