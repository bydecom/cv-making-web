require('dotenv').config()
const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: process.env.VITE_APP_AI_MODEL })

const enhanceEmail = async (emailContent) => {
  if (!emailContent) {
    return 123
  }

  try {
    const prompt = `Write a complete email that I can copy and send to the employer using the prompts and emails I provided:\nEmail: \n\n${emailContent.value}\nEnhance prompt: ${import.meta.env.VITE_APP_ENHANCE_EMAIL_PROMPT}`
    const result = await model.generateContent(prompt)
    return result.response.text() // Get enhanced email from AI
  } catch (error) {
    console.error('Error enhancing email:', error)
  }
}
module.exports = { enhanceEmail }
