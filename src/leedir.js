//let  fs = require('fs')//require('node:fs')
//var fs = require('fs')
//var body = fs.readFileSync(file)
//const files = fs.readFileSync('D:/Asuss2024/Biblioteca Virtual/Duplicados.xlsx')

//console.log("...:",files)

/*async function readAllFiles(path, arrayOfFiles=[]){
    const files =  fs.readFileSync(path)
    files.forEach(file=>{
        const stat = fs.statSync(`${path}/${file}`)
        if(stat.isDirectory()){
            readAllFiles(`${path}/${file}`, arrayOfFiles)
        }else{
            console.log(':::::-> ',`${path}/${file}`)
            arrayOfFiles.push(`${path}/${file}`)
        }
    })
    return arrayOfFiles
}

readAllFiles('D:/Asuss2024/Biblioteca Virtual')
*/

//Listar archivos.
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

var data=[];
let filesMd5=[]

const getHash = path => new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const rs = fs.createReadStream(path);
    rs.on('error', reject);
    rs.on('data', chunk => hash.update(chunk));
    rs.on('end', () => resolve(hash.digest('hex')));
   })

    async function myhash (path){
        const hashValue = await getHash(path);
        //console.log(hashValue);
        return hashValue
   }

console.log('«Buscando…»')
async function scanDirs(directoryPath){
   try{
      var ls=fs.readdirSync(directoryPath);

      for (let index = 0; index < ls.length; index++) {
        //console.log('Dir:',directoryPath)
        //console.log("..",ls[index])
         const file = path.join(directoryPath, ls[index]);
         var dataFile =null;
         try{
            dataFile =fs.lstatSync(file);
         }catch(e){
            console.log("???:",e.message)
         }

         if(dataFile){
            data.push(
               {
                  path: file,
                  isDirectory: dataFile.isDirectory(),
                  length: dataFile.size
               });
               //console.log('Dir:',data)
            if(dataFile.isDirectory()){
               scanDirs(file)
            }else{                
                const hasfile =  await myhash(file)
                if(filesMd5.includes(hasfile)){
                    console.log("archivo Eliminar: ", file)
                    const {unlink} = require('fs/promises')                    
                    await unlink(file)    
                }else {
                    console.log("Archivo bueno.....")
                    filesMd5.push(hasfile)
                }
            }
         }
      }
   }catch(e){
    console.log("xxx:",e.message)
   }
}

scanDirs('D:/Asuss2024/Biblioteca Virtual');

/*const jsonString = JSON.stringify(data);

fs.writeFile(‘./resultado.json’, jsonString, err => {
   if (err) {
      console.log(‘Error al escribir en el archivo’, err)
   } else {
      console.log(‘Archivo guardado.’)
   }
});*/