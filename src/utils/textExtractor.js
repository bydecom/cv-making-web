import { createWorker } from 'tesseract.js'
import * as pdfjsLib from 'pdfjs-dist'

export async function extractTextFromFile(file, language) {
  if (file.type === 'application/pdf') {
    return await extractTextFromPDF(file, language)
  } else {
    return await extractTextFromImage(file, language)
  }
}

async function extractTextFromPDF(file, language) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let fullText = ''

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item) => item.str).join(' ')
    fullText += pageText + '\n'
  }

  if (fullText.trim() === '') {
    console.warn('PDF does not contain actual text, switching to OCR...')
    fullText = await extractTextUsingOCR(pdf)
  }

  return fullText.trim()
}

async function extractTextUsingOCR(pdf) {
  const numPages = pdf.numPages
  let ocrText = ''
  const worker = await createWorker()

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i)

    const viewport = page.getViewport({ scale: 1 })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width
    await page.render({ canvasContext: context, viewport }).promise

    const dataUrl = canvas.toDataURL('image/png')
    const {
      data: { text }
    } = await worker.recognize(dataUrl, 'eng')

    ocrText += text + ' '
  }

  await worker.terminate()
  return ocrText.trim()
}

async function extractTextFromImage(file, language) {
  const worker = await createWorker(language)
  const {
    data: { text }
  } = await worker.recognize(URL.createObjectURL(file))
  await worker.terminate()
  return text
}
