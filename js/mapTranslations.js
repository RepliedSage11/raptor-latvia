const fs = require('fs');

const translations = require('./translations.json');

const mapped = Object.entries(translations).reduce((ac,[key, values]) => {
    Object.entries(values).forEach(([lang, text]) => {
        ac[lang][key] = text;
    });
    return ac;
}, {
    "en": {},
    "lv": {},
    "ru": {}
});

fs.writeFileSync('mapped.json', JSON.stringify(mapped, null, 2));