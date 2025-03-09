const { marked } = require("marked");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const hljs = require("highlight.js");

// DOMPurify for backend sanitization
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// using highlight.js for syntax highlighting
marked.setOptions({
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
    langPrefix: "hljs language-",
  });


  const processMarkdown = (input) => {
    const rawHtml = marked(input.trim());
    return DOMPurify.sanitize(rawHtml);
  };
  
  module.exports = { processMarkdown };