require("dotenv").config()

const express = require("express")
const axios = require("axios")

const cors = require("cors")

const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())

app.post("/run-agent", async (req, res) => {

    const { industry, location } = req.body

    try {

        // STEP 1 - Fetch leads from Crustdata
        const options = {
            method: 'POST',
            url: 'https://api.crustdata.com/screener/company/search',
            headers: {
                Authorization: `Bearer ${process.env.CRUSTDATA_KEY}`
            },
            data: {
                filters: [
                    { filter_type: 'REGION', type: 'in', value: ['United States'] },
                    { filter_type: 'INDUSTRY', type: 'in', value: ['Software Development'] }
                ],
                limit: 10,
                page: 1
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

        res.json({
            data: companies
        })

    } catch (err) {

        console.error(err)
        res.status(500).json({ error: "Agent failed" })
    }

})

app.listen(5000, () => {
    console.log("Agent running on port 5000")
})