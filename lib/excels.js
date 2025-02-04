const path = require("path");
const fs = require("fs");

module.exports = {
    writeFile: (fn, data) => {
        fs.writeFile(path.join(__dirname, "..", "dump", fn), JSON.stringify(data, null, 2), { flag: 'w' }, (err) => {
            if (err)
                console.error(err);
            else
                console.log(`${fn} created successfully.`)
        });
    },
    weaponMeta: (wl, ws) => {
        wl = wl[Object.keys(wl)[0]];
        ws = ws[Object.keys(ws)[0]];

        const RARITY = Object.keys(wl[0])[0];
        const LEVEL = Object.keys(wl[0])[1];
        const BREAK_LEVEL = Object.keys(ws[0])[1];
        const FIELD_XXX = Object.entries(wl[1]).filter(([_, val]) => val == 1568)[0][0];
        const FIELD_YYY = Object.entries(ws[1]).filter(([_, val]) => val == 8922)[0][0];
        const FIELD_ZZZ = Object.entries(ws[1]).filter(([_, val]) => val == 3000)[0][0];

        const json = {
            levels: {},
            breakLevels: {}
        };

        for (const wlObj of wl) {
            if (!json.levels[wlObj[RARITY]])
                json.levels[wlObj[RARITY]] = {};

            json.levels[wlObj[RARITY]][wlObj[LEVEL]] = wlObj[FIELD_XXX];
        }
            
        for (const wsObj of ws) {
            if (!json.breakLevels[wsObj[RARITY]])
                json.breakLevels[wsObj[RARITY]] = {};

            json.breakLevels[wsObj[RARITY]][wsObj[BREAK_LEVEL]] = {
                Field_YYY: wsObj[FIELD_YYY],
                Field_ZZZ: wsObj[FIELD_ZZZ]
            }
        }

        return json;
    },
    discDriveMeta: (dd) => {
        dd = dd[Object.keys(dd)[0]];

        const RARITY = Object.keys(dd[0])[0];
        const LEVEL = Object.keys(dd[0])[1];
        const FIELD_XXX = Object.entries(dd[1]).filter(([_, val]) => val == 3333)[0][0];

        const json = {};

        for (const ddObj of dd) {
            if (!json[ddObj[RARITY]])
                json[ddObj[RARITY]] = {};

            json[ddObj[RARITY]][ddObj[LEVEL]] = ddObj[FIELD_XXX];
        }

        return json;
    }
};
