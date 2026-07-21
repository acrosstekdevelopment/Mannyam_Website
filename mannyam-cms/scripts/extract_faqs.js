const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const htmlPath = path.join(__dirname, '../../Building Blocks/Manyam frontend.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const faqs = {};

// Find all elements that look like FAQs.
// Usually they are in an <details> or an accordion structure.
// Or we can find headings that say "Common questions" or "FAQ".

$('h3, h2, h4').each((i, el) => {
  const text = $(el).text().trim().toLowerCase();
  if (text.includes('common questions') || text.includes('faq')) {
    const parentSection = $(el).closest('section, div.page-view, div[id]');
    const sectionId = parentSection.attr('id') || 'unknown';
    
    faqs[sectionId] = [];
    
    // Look for <details> tags or similar FAQ blocks
    parentSection.find('details, .faq-item, .accordion-item').each((j, faqEl) => {
      const q = $(faqEl).find('summary, .faq-question, .accordion-header').text().trim() || $(faqEl).find('h4, h5, strong').first().text().trim();
      let a = $(faqEl).find('p, .faq-answer, .accordion-content').text().trim();
      if (!a) {
        a = $(faqEl).text().replace(q, '').trim();
      }
      if (q && a) {
        faqs[sectionId].push({ q, a });
      }
    });
  }
});

console.log(JSON.stringify(faqs, null, 2));
