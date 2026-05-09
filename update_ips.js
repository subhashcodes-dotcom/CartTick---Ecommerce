const fs = require('fs');
const path = require('path');

const directory = 'h:/DBMS PROJ/FrontEnd/src';

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        let filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(filePath));
        } else {
            if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.css')) {
                results.push(filePath);
            }
        }
    });
    return results;
}

const files = walkDir(directory);
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;

    if (file.endsWith('index.css')) {
        newContent = newContent.replace('http://localhost:3000/brand_logo.png', '/brand_logo.png');
    }

    if (newContent.includes('http://localhost:3001')) {
        newContent = newContent.replace(/\"http:\/\/localhost:3001([^\"]*)\"/g, '\`http://${window.location.hostname}:3001$1\`');
        newContent = newContent.replace(/\'http:\/\/localhost:3001([^\']*)\'/g, '\`http://${window.location.hostname}:3001$1\`');
        newContent = newContent.replace(/\`http:\/\/localhost:3001/g, '\`http://${window.location.hostname}:3001');
    }

    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated ' + file);
    }
});
