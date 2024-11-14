import { createWorker } from 'tesseract.js'
import * as pdfjsLib from 'pdfjs-dist'

export async function extractTextFromFile(file, language) {
  if (file.type === 'application/pdf') {
    return await extractTextFromPDF(file)
  } else {
    return await extractTextFromImage(file, language)
  }
}

async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let fullText = ''

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item) => item.str).join(' ')
    fullText += pageText + '\n'
  }

  return fullText.trim()
}

async function extractTextFromImage(file, language) {
  const worker = await createWorker(language)
  const {
    data: { text }
  } = await worker.recognize(URL.createObjectURL(file))
  await worker.terminate()
  return text
}
