const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')

const createPdf = async ()=> {
    const pdfDoc = await PDFDocument.create()
     
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    
    const page = pdfDoc.addPage()
    
    const { width, height } = page.getSize()
    
    const fontSize = 30
    
    page.drawText('Thank you for purchasing!', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    })

    page.drawText('Here is your url: https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
        x: 50,
        y: height - 14 * 15,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    
    const pdfBytes = await pdfDoc.save()
    return pdfBytes
}

module.exports = {createPdf}