//import {default as pdfConverter} from 'pdf-poppler'
//import path from 'path'

const pdfConverter = require('pdf-poppler')
const path = require('path')

function convertImage(pdfPath) {

    let option = {
        format : 'jpeg',
        out_dir : 'E:\\temp',
        out_prefix : path.basename(pdfPath, path.extname(pdfPath)),
        page : 1,
        scale: 384
    }
// option.out_dir value is the path where the image will be saved

    pdfConverter.convert(pdfPath, option)
    .then(() => {
        console.log('file converted')
    })
    .catch(err => {
        console.log('an error has occurred in the pdf converter ' + err)
    })

}

//export default convertImage
convertImage('C:/Users/victor.quisbert/Desktop/BO-DS-24547.pdf')