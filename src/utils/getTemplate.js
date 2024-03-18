const handlebars = require('handlebars');
const fs = require('fs');

const getTemplate = (templateName, varsObj) => {
  const template = fs.readFileSync(`src/templates/${templateName}.html`, 'utf8');

  const compiledTemplate = handlebars.compile(template);
  return compiledTemplate(varsObj);
}

module.exports = { getTemplate };