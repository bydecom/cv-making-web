const express = require('express')
const puppeteer = require('puppeteer')
const pdfjsLib = require('pdfjs-dist')

const router = express.Router()

router.post('/extract-job-description', async (req, res) => {
  const { url } = req.body

  // Validate URL
  if (!url || !url.toLowerCase().endsWith('.pdf')) {
    return res.status(400).json({ error: 'Invalid PDF URL' })
  }

  try {
    // Fetch the PDF file
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()

    // Load PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item) => item.str).join(' ')
      fullText += pageText + '\n'
    }

    res.json({ text: fullText.trim() })
  } catch (error) {
    console.error('Error extracting PDF:', error)
    res.status(500).json({ error: 'Failed to extract PDF content' })
  }
})

module.exports = router
