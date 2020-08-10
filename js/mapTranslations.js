const fs = require('fs');

const translations = require('./translations.json');

const mapped = {
    "en": {},
    "lv": {},
    "ru": {}
}

Object.entries(translations).forEach(([key, values])=>{
    Object.entries(values).forEach(([lang, text])=>{
        mapped[lang][key] = text;
        
    });
    console.log('Mapped', key);
});

fs.writeFileSync('mapped.json', JSON.stringify(mapped, null, 2));