require("dotenv").config()

const express = require("express")
const axios = require("axios")

const cors = require("cors")

const app = express()

app.use(cors({
  origin:"http://localhost:5173"
}))

app.use(express.json())

app.post("/run-agent", async (req,res)=>{

  const { industry, location } = req.body

  try{

    // STEP 1 - Fetch leads from Crustdata
      const options = {
          method: 'POST',
          url: 'https://api.crustdata.com/screener/person/search',
          headers: {
              Authorization: `Bearer ${process.env.CRUSTDATA_KEY}`
          },
          data: {
              filters: [
                  { filter_type: 'REGION', type: 'in', value: ['United States'] },
                  {filter_type: 'INDUSTRY', type: 'in', value: ['Software Development']}
              ],
              limit: 10,
              page: 100
          }
      };

      let leads = []

      try {
          const { data } = await axios.request(options);
          console.log(data);
          leads = data;
      } catch (error) {
          console.error(error);
      }

    // const companies = leads.profiles.slice(0,5)
    return leads;

    let results = []

    for(const company of companies){

      // STEP 2 - AI reasoning via Emergent AI
      const aiResponse = await axios.post(
        "https://api.emergent.ai/agent",
        {
          prompt:`Generate outreach email for ${company.name}`
        },
        {
          headers:{
            Authorization:`Bearer ${process.env.EMERGENT_KEY}`
          }
        }
      )

      const email = aiResponse.data.output

      // STEP 3 - Send via Concierge
      await axios.post(
        "https://api.concierge.ai/send",
        {
          to:company.email,
          message:email
        },
        {
          headers:{
            Authorization:`Bearer ${process.env.CONCIERGE_KEY}`
          }
        }
      )

      results.push({
        company:company.name,
        email
      })
    }

    res.json({
      leadsFound:companies.length,
      results
    })

  }catch(err){

    console.error(err)
    res.status(500).json({error:"Agent failed"})
  }

})

app.listen(5000,()=>{
  console.log("Agent running on port 5000")
})