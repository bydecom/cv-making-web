import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: `You are a CV rewrite that extracts information from CV text into structured JSON format.
    You must ONLY return a valid JSON object with the following structure, no other text:
    {
      "firstName": string,
      "lastName": string,
      "jobTitle": string,
      "email": string,
      "sex": string,
      "dateofbirth" :string,
      "phone": string,
      "location": string,
      "city": string,
      "country": string,
      "summary": string,
      "skills": string[],
      "experience": [
        {
          "title": string,
          "company": string,
          "period": string,
          "description": string
        }
      ],
      "education": [
        {
          "degree": string,
          "school": string,
          "year": string
        }
      ]
      "contact": [
        {
          "facebook": string,
          "behance": string,
          "instagram": string,
          "pinterest:string,
          "github": string,
          "linkedin: string,
          "website": "string",
          "twitter": "string"    
        }
      ]
    }
    #Note : 
    - sumary can be introduce or objective
    - If the information does not clearly, attempt to infer it. This should be a best guess and should not be guaranteed.
    - The gender should be returned as "male", "female", or "null" if it cannot be inferred.
    - You must NOT include any other explanatory text.
  `
})

const generationConfig = {
  temperature: 0.1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1024,
  responseMimeType: 'application/json'
}

export const parseTextToCV = async (text) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [{ text }]
        }
      ]
    })

    const result = await chatSession.sendMessage(text)
    const content = result.response.text()

    // Log the raw response to check for any text or errors
    console.log('Raw Response:', content)

    // Attempt to parse the response content to JSON
    try {
      const parsedData = JSON.parse(content)

      // Check if the response follows the required structure
      if (parsedData.firstName && parsedData.lastName && parsedData.jobTitle) {
        console.log('Parsed CV Data:', parsedData)
        return parsedData
      } else {
        throw new Error('Parsed data does not match expected structure')
      }
    } catch (jsonError) {
      console.error('Failed to parse response as JSON:', jsonError)
      throw new Error('Invalid JSON format in response')
    }
  } catch (error) {
    console.error('Error parsing CV:', error)
    throw new Error('Failed to parse CV data: ' + error.message)
  }
}

// Example usage with extractedText
const extractedText = `Your CV text here...` // Replace with your actual text or data
;(async () => {
  try {
    // Parse the extracted CV text into structured data
    const parsedCV = await parseTextToCV(extractedText)

    // After parsing, you can proceed to use this parsed data
    console.log('Parsed CV Data:', parsedCV)

    // Now use the parsed data, for example, to proceed to the editor
    const cvDataString = JSON.stringify(parsedCV) // Convert the parsed CV to a string
    // Assuming you are using Vue Router, you can pass this data to another page
    router.push({
      name: 'edit-cv',
      params: { data: encodeURIComponent(cvDataString) }
    })
  } catch (error) {
    console.error('Error:', error.message)
  }
})()

// import { GoogleGenerativeAI } from '@google/generative-ai'

// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// const model = genAI.getGenerativeModel({
//   model: 'gemini-1.5-flash',
//   systemInstruction: 'You are a CV parser that extracts information from CV text'
// })

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: 'application/json',
//   responseSchema: {
//     type: 'object',
//     properties: {
//       response: {
//         type: 'object',
//         properties: {
//           firstName: { type: 'string' },
//           lastName: { type: 'string' },
//           jobTitle: { type: 'string' },
//           email: { type: 'string' },
//           phone: { type: 'string' },
//           location: { type: 'string' },
//           summary: { type: 'string' },
//           skills: {
//             type: 'array',
//             items: { type: 'string' }
//           },
//           experience: {
//             type: 'array',
//             items: {
//               type: 'object',
//               properties: {
//                 title: { type: 'string' },
//                 company: { type: 'string' },
//                 period: { type: 'string' },
//                 description: { type: 'string' }
//               }
//             }
//           },
//           education: {
//             type: 'array',
//             items: {
//               type: 'object',
//               properties: {
//                 degree: { type: 'string' },
//                 school: { type: 'string' },
//                 year: { type: 'string' }
//               }
//             }
//           }
//         },
//         required: ['firstName', 'lastName', 'jobTitle', 'summary', 'skills']
//       }
//     }
//   }
// }

// export const parseTextToCV = async (text) => {
//   try {
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: 'user',
//           parts: [{ text }]
//         }
//       ]
//     })
//     console.log(text)
//     const result = await chatSession.sendMessage(text)
//     const content = result.response.text()
//     console.log(content)
//     // Extract JSON from response
//     const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)
//     if (!jsonMatch) {
//       throw new Error('No JSON found in response')
//     }

//     const parsedData = JSON.parse(jsonMatch[1])
//     return parsedData.response
//   } catch (error) {
//     console.error('Error parsing CV:', error)

//     throw new Error('Failed to parse CV data: ' + error.message)
//   }
// }
// export const parseTextToCV = async (text) => {
//   try {
//     const response = await fetch('https://api.arliai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_ARLIAI_API_KEY}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         model: 'Meta-Llama-3.1-8B-Instruct',
//         messages: [
//           {
//             role: 'system',
//             content: `You are a CV parser that extracts information from CV text into structured JSON format.
//             You must ONLY return a valid JSON object with the following structure, no other text:
//             {
//               "firstName": string,
//               "lastName": string,
//               "jobTitle": string,
//               "email": string,
//               "phone": string,
//               "location": string,
//               "summary": string,
//               "skills": string[],
//               "experience": [
//                 {
//                   "title": string,
//                   "company": string,
//                   "period": string,
//                   "description": string
//                 }
//               ],
//               "education": [
//                 {
//                   "degree": string,
//                   "school": string,
//                   "year": string
//                 }
//               ]
//             }

//             Instructions for parsing:
//             - Extract email from contacts array and put it in email field
//             - Create jobTitle from the most recent experience title
//             - Format phone number if found in the text
//             - Convert education periods to just the year
//             - Ensure experience has both company and description fields
//             - Keep skills as an array of individual skills

//             Do not include any explanatory text, only return the JSON object.`
//           },
//           {
//             role: 'user',
//             content: text
//           }
//         ],
//         temperature: 0.1,
//         max_tokens: 1024,
//         stream: false
//       })
//     })

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     const data = await response.json()
//     const content = data.choices[0].message.content.trim()

//     // Log the raw content for debugging
//     console.log('Raw API response:', content)

//     // Try to extract JSON if the response contains additional text
//     let jsonStr = content
//     if (content.includes('{')) {
//       jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1)
//     }

//     try {
//       // Clean up the JSON string before parsing
//       jsonStr = jsonStr
//         .replace(/[""]|['']|[""]/g, '"') // Replace smart quotes with regular quotes
//         .replace(/\s+"/g, '"') // Remove extra spaces before quotes
//         .replace(/"\s+/g, '"') // Remove extra spaces after quotes
//         .replace(/\\+"/g, '"') // Remove escaped quotes
//         .replace(/\r?\n|\r/g, '') // Remove line breaks

//       const parsedCV = JSON.parse(jsonStr)

//       // Format the CV data
//       const formatCVData = (rawData) => {
//         // Extract email from contacts if exists
//         const email = rawData.email || ''

//         // Get most recent job title from experience
//         const jobTitle = rawData.experience?.[0]?.title || ''

//         return {
//           firstName: rawData.firstName || '',
//           lastName: rawData.lastName || '',
//           jobTitle: jobTitle,
//           email: email,
//           phone: rawData.phone || '',
//           location: rawData.location || '',
//           summary: rawData.summary || '',
//           skills: (rawData.skills || []).map((skill) => skill.trim()).filter(Boolean),
//           experience: (rawData.experience || []).map((exp) => ({
//             title: exp.title?.trim() || '',
//             company: exp.company?.trim() || '',
//             period: exp.period?.trim() || '',
//             description: exp.description?.trim().replace(/["']/g, '"') || ''
//           })),
//           education: (rawData.education || []).map((edu) => ({
//             degree: edu.degree?.trim() || '',
//             school: edu.school?.trim() || '',
//             year: edu.year?.split('-')[0]?.trim() || ''
//           }))
//         }
//       }

//       return formatCVData(parsedCV)
//     } catch (parseError) {
//       console.error('JSON Parse Error:', parseError)
//       console.error('Attempted to parse:', jsonStr)
//       throw new Error('Invalid JSON format in response')
//     }
//   } catch (error) {
//     console.error('Error parsing CV:', error)
//     throw new Error('Failed to parse CV data: ' + error.message)
//   }
// }
