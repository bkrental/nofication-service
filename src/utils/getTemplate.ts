import handlebars from 'handlebars';
import fs from 'fs';

interface VarsObj {
  [key: string]: any;
}

const getTemplate = (templateName: string, varsObj: VarsObj): string => {
  const template: string = fs.readFileSync(`src/templates/${templateName}.html`, 'utf8');

  const compiledTemplate: HandlebarsTemplateDelegate = handlebars.compile(template);
  return compiledTemplate(varsObj);
}

export default getTemplate;