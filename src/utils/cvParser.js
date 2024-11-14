export const parseTextToCV = async (text) => {
  try {
    const response = await fetch('https://api.arliai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ARLIAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'Meta-Llama-3.1-8B-Instruct',
        messages: [
          {
            role: 'system',
            content: `You are a CV parser that extracts information from CV text into structured JSON format.
            You must ONLY return a valid JSON object with the following structure, no other text:
            {
              "firstName": string,
              "lastName": string,
              "jobTitle": string,
              "email": string,
              "phone": string,
              "location": string,
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
            }
            
            Instructions for parsing:
            - Extract email from contacts array and put it in email field
            - Create jobTitle from the most recent experience title
            - Format phone number if found in the text
            - Convert education periods to just the year
            - Ensure experience has both company and description fields
            - Keep skills as an array of individual skills
            
            Do not include any explanatory text, only return the JSON object.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.1,
        max_tokens: 1024,
        stream: false
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content.trim()

    // Log the raw content for debugging
    console.log('Raw API response:', content)

    // Try to extract JSON if the response contains additional text
    let jsonStr = content
    if (content.includes('{')) {
      jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1)
    }

    try {
      // Clean up the JSON string before parsing
      jsonStr = jsonStr
        .replace(/[""]|['']|[""]/g, '"') // Replace smart quotes with regular quotes
        .replace(/\s+"/g, '"') // Remove extra spaces before quotes
        .replace(/"\s+/g, '"') // Remove extra spaces after quotes
        .replace(/\\+"/g, '"') // Remove escaped quotes
        .replace(/\r?\n|\r/g, '') // Remove line breaks

      const parsedCV = JSON.parse(jsonStr)

      // Format the CV data
      const formatCVData = (rawData) => {
        // Extract email from contacts if exists
        const email = rawData.email || ''

        // Get most recent job title from experience
        const jobTitle = rawData.experience?.[0]?.title || ''

        return {
          firstName: rawData.firstName || '',
          lastName: rawData.lastName || '',
          jobTitle: jobTitle,
          email: email,
          phone: rawData.phone || '',
          location: rawData.location || '',
          summary: rawData.summary || '',
          skills: (rawData.skills || []).map((skill) => skill.trim()).filter(Boolean),
          experience: (rawData.experience || []).map((exp) => ({
            title: exp.title?.trim() || '',
            company: exp.company?.trim() || '',
            period: exp.period?.trim() || '',
            description: exp.description?.trim().replace(/["']/g, '"') || ''
          })),
          education: (rawData.education || []).map((edu) => ({
            degree: edu.degree?.trim() || '',
            school: edu.school?.trim() || '',
            year: edu.year?.split('-')[0]?.trim() || ''
          }))
        }
      }

      return formatCVData(parsedCV)
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      console.error('Attempted to parse:', jsonStr)
      throw new Error('Invalid JSON format in response')
    }
  } catch (error) {
    console.error('Error parsing CV:', error)
    throw new Error('Failed to parse CV data: ' + error.message)
  }
}
