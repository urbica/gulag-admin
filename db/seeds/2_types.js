const seed = (knex) => {
  const types = [
    { id: 0, name: 'ИТЛ' },
    { id: 1, name: 'Особый лагерь' },
    { id: 2, name: 'Спецлагерь' },
    { id: 3, name: 'Лагерный пункт' },
    { id: 4, name: 'Другие объекты' }
  ];

  return knex('types').insert(types);
};

exports.seed = seed;
