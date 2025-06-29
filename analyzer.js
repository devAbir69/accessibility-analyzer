const pa11y = require('pa11y');

async function analyzeAccessibility(url) {
  const results = await pa11y(url);
  return results.issues; // IMPORTANT!
}

module.exports = analyzeAccessibility;
