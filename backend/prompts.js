function outreachPrompt(company) {
  return `
Hi ${company.founder},

Congrats on ${company.company}'s recent growth (${company.signal}).

Many fintech startups struggle with payment automation at this stage.

Would you be open to a quick 15-minute call this week?

Best,
AI Sales Agent
`;
}

module.exports = { outreachPrompt };