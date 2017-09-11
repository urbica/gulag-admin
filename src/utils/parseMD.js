import { Parser, HtmlRenderer } from 'commonmark';

export default (md) => {
  const reader = new Parser();
  const writer = new HtmlRenderer();

  const parsedMd =
    md
      .split('\n')
      .reduce((acc, str) => {
        const lastElem = acc[acc.length - 1];

        switch (str) {
          case 'НАЧАЛО_ВРЕЗКИ':
            acc.push({ type: 'incut', payload: '', isClosed: false });
            return acc;
          case 'НАЧАЛО_ГАЛЕРЕИ':
            acc.push({ type: 'gallery', payload: '', isClosed: false });
            return acc;
          case 'КОНЕЦ_ВРЕЗКИ' || 'КОНЕЦ_ГАЛЕРЕИ':
            lastElem.isClosed = true;
            return acc;
          default:
            if (lastElem.isClosed) {
              acc.push({ type: 'description', payload: '', isClosed: false });
            } else {
              lastElem.payload = lastElem.payload.concat(str, '\n');
            }
            return acc;
        }
      }, [{ type: 'description', payload: '', isClosed: false }]);


  const description = parsedMd.reduce((acc, elem) => {
    switch (elem.type) {
      case 'description': {
        const parsed = reader.parse(elem.payload);
        const result = writer.render(parsed);

        return acc.concat(result);
      }
      case 'incut': {
        const parsed = reader.parse(elem.payload);
        const result = writer.render(parsed);

        return acc.concat('<div class="incut">', result, '</div>');
      }
      default:
        return acc;
    }
  }, '');

  return { description };
};
