# StarRail Excels Generator
### This tool is used to generate the excels for the npm library [enkanetwork.js](https://www.npmjs.com/package/enkanetwork.js)

## How to use
1. Run `git clone https://github.com/Jelosus2/excels_gen`.
2. Clone or download the [StarRail Data Repo](https://github.com/Dimbreath/StarRailData) and place the files of the **ExcelOutput** folder into `excel_gens/data/ExcelOutput` and the files in the **TextMap** folder into `excel_gens/data/TextMap`.
3. Download the **avatartree.json** files in [FortOfFans Repo](https://github.com/FortOfFans/HSRMaps/blob/master/maps) of each language and rename them appending the language code. Example: `avatartree_en.json` for English. Check the [Language codes table](#language-code-table).
4. Run the following commands in order:
    - `node cook.js --excels`
    - `node cook.js --textmaps-extra`
    - `node cook.js --textmaps`
5. Check the `excels_gen/dump` and enjoy :)

## Language Code Table
| Language | Code |
| -------- | ---- |
| German | de |
| English | en |
| Spanish | es |
| French | fr |
| Indonesian | id |
| Japanese | ja |
| Korean | ko |
| Portuguese | pt |
| Russian | ru |
| Thai | th |
| Vietnamese  | vi |
| Chinese (Simplified)  | zh-CN |
| Chinese (Traditional) | zh-TW |

Made by me for my library, modify the code to your needs.