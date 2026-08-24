const fs = require('fs');

function fixLinks (pathFile){
    return new Promise((resolve, reject) => {
        fs.readFile(pathFile, 'utf-8', (err,data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        });
    });  
}
fixLinks ('./dist/index.html').then((data) => {
    const newData = data.replace(/noopener/g,'noopener noreferrer');
    fs.writeFile('./dist/index.html', newData, (err) => {
        if (err){
            if (err) throw err;
            console.log('created')
        } else {
            console.log('Compilación exitosa')
        }
    });
});