async function getLeads(industry, location) {
  return [
    {
      company: "FinStack",
      founder: "Neha Gupta",
      signal: "Raised Seed Funding"
    },
    {
      company: "PayFlow",
      founder: "Rahul Sharma",
      signal: "Hiring engineers"
    }
  ];
}

module.exports = { getLeads };