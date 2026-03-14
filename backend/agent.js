const { getLeads } = require("./leads");
const { outreachPrompt } = require("./prompts");

async function runAgent(industry, location) {

  console.log("Searching leads...");

  const leads = await getLeads(industry, location);

  let results = [];

  for (let lead of leads) {

    console.log("Generating outreach for", lead.company);

    const email = outreachPrompt(lead);

    results.push({
      company: lead.company,
      founder: lead.founder,
      email
    });
  }

  return {
    leadsFound: leads.length,
    results
  };
}

module.exports = { runAgent };