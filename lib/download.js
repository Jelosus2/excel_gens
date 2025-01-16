const fs = require('fs');

module.exports = {
  downloadMeta: async () => {
    if (fs.existsSync('./dump/meta.json')) return console.log('meta.json already exists, skipping download');

    const res = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/hsr/honker_meta.json');
    if (res.status != 200) return console.error('Error downloading meta.json', res);
    
    const data = await res.json();

    fs.writeFile('./dump/meta.json', JSON.stringify(data, null, 2), { flag: 'w' }, (err) => {
      if (err) console.error(err);
      else console.log('meta.json has been downloaded successfully');
    });
  }
}