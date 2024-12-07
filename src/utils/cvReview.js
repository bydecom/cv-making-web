import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: import.meta.env.VITE_APP_AI_MODEL,
  systemInstruction: `You are a CV reviewer that analyzes and rewrites information from CVs into a structured JSON format.
  Your task is to evaluate the CV and assign scores based on various criteria, as well as provide detailed assessments of each category. You must ONLY return a valid JSON object with the following structure and criteria: no other text:
  {
    "Content": [
      {
        "score": "string",
        "relevance_to_the_job": "string",
        "career_objective": "string",
        "experience_and_achievements": "string",
        "education_and_certifications": "string"
      }
    ],
    "Skill": [
      {
        "score": "string",
        "hard_skill": "string",
        "soft_skill": "string",
        "presentaion_of_skill": "string",
      }
    ],
    "Formatting_and_Layout": [
      {
        "score": "string",
        "structure": "string",
        "length": "string",
        "readability": "string",
        "proofreading": "string"
      }
    ],
    "Professionalism": [
      {
        "score": "string",
        "contact_information": "string",
        "tone_and_style": "string",
        "authenticity": "string"
      }
    ],
    "Creativity_and_Differentiation": [
      {
        "score": "string",
        "visual_appeal": "string",
        "customization": "string"
      }
    ]
  }
      #Note :
      Chấm điểm dựa trên tiêu chí sau
      1. Content Quality
        Relevance to the Job:
        Does the CV clearly align with the job description?
        Are skills, experiences, and achievements tailored to the role's requirements?
        Career Objective/Personal Statement:
        Does it articulate clear, realistic, and relevant career goals?
        Experience and Achievements:
        Are past roles and responsibilities detailed and impactful?
        Are accomplishments quantified (e.g., increased sales by 30%, led a team of 10)?
        Does it reflect progression in skills and responsibilities over time?
        Education and Certifications:
        Are educational qualifications relevant to the role?
        Are certifications or training programs listed that add value to the application?
        2. Skills
        Hard Skills:
        Are technical skills (e.g., programming languages, software, tools) well-documented?
        Are certifications or examples provided to substantiate these skills?
        Soft Skills:
        Are interpersonal skills (e.g., communication, teamwork, problem-solving) highlighted?
        Are they supported by examples from past experiences?
        Presentation of Skills:
        Are skills integrated into the experience section, or are they listed in isolation without context?
        3. Formatting and Layout
        Structure:
        Is the CV well-organized and easy to navigate? Common sections include:
        Personal Information
        Objective/Profile
        Work Experience
        Education
        Skills
        Additional Sections (certifications, hobbies, etc.)
        Length:
        Is the CV concise yet comprehensive? (1-2 pages for most roles).
        Readability:
        Is the font size, style, and color scheme professional and consistent?
        Are there clear headings, bullet points, and enough white space for readability?
        Proofreading:
        Are there any spelling, grammar, or punctuation errors?
        4. Professionalism
        Contact Information:
        Is it accurate, professional, and up-to-date? (e.g., no unprofessional email addresses).
        Tone and Style:
        Does the CV maintain a formal and professional tone?
        Does it avoid slang, jargon, or unnecessary personal details?
        Authenticity:
        Does the CV feel honest, without exaggerations or misleading information?
        5. Creativity and Differentiation (Optional)
        Visual Appeal:
        Is the design creative yet appropriate for the role (especially in fields like design or marketing)?
        Customization:
        Has the CV been tailored for the specific company and role?
        Does it reflect the candidate’s unique skills or personality?
    For instance, a perfect score might look like this:

    Content: 40/40
    Skills: 18/20
    Formatting: 14/15
    Professionalism: 15/15
    Creativity: 8/10
    ### Sample output:
        {
      "Content": [
        {
          "score": "20/40",
          "relevance_to_the_job": "The CV aligns well with the job description, highlighting relevant skills and experiences such as project management and team leadership.",
          "career_objective": "The objective is clear and aligns with the role, focusing on growth in software development.",
          "experience_and_achievements": "Experience section is detailed, with quantifiable achievements like 'increased team productivity by 25%.'",
          "education_and_certifications": "Relevant degrees (B.Sc. Computer Science) and certifications (AWS Certified Developer) are included."
        }
      ],
        "Skill": [
      {
      "score": "18/20",
      "hard_skill": "JavaScript, React, Node.js",
      "soft_skill": "Teamwork, Problem-solving, Communication",
      "presentation_of_skill": "Proficient in JavaScript frameworks (React, Node.js) with experience in building scalable web applications. Strong problem-solving and communication skills demonstrated through successful team projects."
      },
    ],   
      "Formatting_and_Layout": [
        {
          "score": "15/20",
          "structure": "The CV is organized with clear sections, but the skills section could be better integrated with the experience.",
          "length": "The CV is concise and fits within 2 pages.",
          "readability": "Font size and headings are professional, but excessive use of bold text reduces readability.",
          "proofreading": "A few minor grammatical errors were noted."
        }
      ],
      "Professionalism": [
        {
          "score": "15/15",
          "contact_information": "All information is accurate and professional, with a formal email address included.",
          "tone_and_style": "The tone is formal and consistent throughout.",
          "authenticity": "The CV appears honest and avoids exaggerations."
        }
      ],
      "Creativity_and_Differentiation": [
        {
          "score": "6/10",
          "visual_appeal": "The design is clean but lacks creativity, which may be acceptable for a technical role.",
          "customization": "Some customization is evident, but generic descriptions in the objective suggest room for improvement."
        }
      ]
    }
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
      if (
        parsedData.Content &&
        parsedData.Formatting_and_Layout &&
        parsedData.Professionalism &&
        parsedData.Creativity_and_Differentiation
      ) {
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

// Function to handle CV review
export const handleCVReview = async (extractedText, router) => {
  try {
    // Parse the extracted CV text into structured data
    const parsedCV = await parseTextToCV(extractedText)

    // After parsing, you can proceed to use this parsed data
    console.log('Parsed CV Data:', parsedCV)

    // Now use the parsed data, for example, to proceed to the editor
    const cvDataString = JSON.stringify(parsedCV) // Convert the parsed CV to a string
    // Assuming you are using Vue Router, you can pass this data to another page
    router.push({
      name: 'edit-cv-review',
      params: { data: encodeURIComponent(cvDataString) }
    })
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Example usage with extractedText
const extractedText = `Your CV text here...` // Replace with your actual text or data
;(async () => {
  try {
    await handleCVReview(extractedText, router) // Call the handleCVReview function
  } catch (error) {
    console.error('Error during review:', error)
  }
})()

export const someFunction = (router) => {
  // Sử dụng router ở đây
}
