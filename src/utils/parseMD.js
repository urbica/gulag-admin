export default md => md
  .split('\n')
  .reduce((acc, str) => {
    const lastElem = acc[acc.length - 1];

    switch (str) {
      case 'НАЧАЛО_ВРЕЗКИ':
        acc.push({ type: 'incut', payload: '', isClosed: false });
        return acc;
      case 'КОНЕЦ_ВРЕЗКИ':
        lastElem.isClosed = true;
        return acc;
      case 'НАЧАЛО_ГАЛЕРЕИ':
        acc.push({ type: 'gallery', payload: '', isClosed: false });
        return acc;
      case 'КОНЕЦ_ГАЛЕРЕИ':
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

