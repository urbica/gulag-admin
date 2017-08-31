export default (md) => {
  // const parse = md.match(/(<Incut>)([\s\S]*?)(<\/>)/g);

  const newMd =
    md.replace(/<Incut>/g, '<div class="incut">')
      .replace(/<\/>/g, '</div>');

  // console.log(parse);

  return newMd;
};
