import { Parser, HtmlRenderer } from 'commonmark';

export default (md) => {
  const reader = new Parser();
  const writer = new HtmlRenderer();
  const parsed = reader.parse(md);
  const result = writer.render(parsed);

  const html = result.replace(/<p>НАЧАЛО_ВРЕЗКИ<\/p>/g, '<div class="incut">')
    .replace(/<p>КОНЕЦ_ВРЕЗКИ<\/p>/g, '</div>');

  return html;
};
