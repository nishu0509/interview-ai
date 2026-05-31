const { GoogleGenAI } = require("@google/genai")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription
}) {
  const prompt = `
Generate a detailed interview preparation report in JSON format.

The JSON must contain:

{
  "title": "",
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGaps": [
    {
      "skill": "",
      "severity": "low | medium | high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": [],
      "tasks": []
    }
  ]
}

Generate:
- title: short job title extracted from job description e.g. "Frontend Developer", "Backend Engineer at Google"
- 5 technical questions
- 5 behavioral questions
- 3 skill gaps
- 7 preparation plan days

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  })

  console.log("========= GEMINI RESPONSE =========")
  console.log(response.text)
  console.log("===================================")

  const cleanedResponse = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  return JSON.parse(cleanedResponse)
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  })
  const page = await browser.newPage()
  await page.setContent(htmlContent, { waitUntil: "networkidle0" })

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "10mm",
      bottom: "10mm",
      left: "10mm",
      right: "10mm"
    }
  })

  await browser.close()
  return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

  const prompt = `Generate a professional resume in HTML format for the following candidate:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}

                    Return a JSON object with a single field "html" containing the complete HTML resume.

                    DESIGN RULES - Copy this EXACT style:
                    
                    HEADER:
                    - Name: 22px, font-weight 700, color #111111, centered, ALL CAPS
                    - Designation below name: 12px, color #444444, centered, use "•" as separator between title parts
                    - Contact row: 10px, color #555555, centered, separated by " | "
                    - 1px solid #bbbbbb horizontal line after contact row
                    
                    SECTIONS:
                    - Section title: 11px, font-weight 700, ALL CAPS, color #111111, letter-spacing 0.5px, margin-bottom 4px
                    - 1px solid #bbbbbb horizontal line immediately after every section title
                    - Body text: 10.5px, color #222222, line-height 1.5
                    - Job title + Company: on same line, job title bold left, date right (10px, color #555555)
                    - Company name: on next line, 10px, color #444444, italic
                    - Bullet points: "•" character, margin-left 12px
                    - Skills section: two column table layout — category name bold left, skills plain text right
                    - Section spacing: 10px between sections
                    - NO colors except black and grays
                    - NO background colors, NO shadows, NO gradients, NO borders except section lines
                    - Font family: Arial, sans-serif
                    - Page padding: 28px sides, 20px top/bottom

                    SECTIONS ORDER:
                    1. Header (Name, Title, Contact)
                    2. Professional Summary
                    3. Technical Skills (two column: category | skills)
                    4. Work Experience
                    5. Projects
                    6. Education

                    CONTENT RULES:
                    - STRICTLY 1 PAGE ONLY - cut content if needed
                    - Use REAL candidate data - zero placeholders
                    - Max 3 bullet points per job
                    - ATS optimized

                    Return ONLY: { "html": "<complete html here>" }
                `

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  })

  console.log("========= RESUME PDF RESPONSE =========")
  console.log(response.text)
  console.log("=======================================")

  const cleanedResponse = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  const jsonContent = JSON.parse(cleanedResponse)
  const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
  return pdfBuffer
}

module.exports = { generateInterviewReport, generateResumePdf }