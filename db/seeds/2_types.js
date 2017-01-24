const seed = (knex) => {
  const types = [
    { id: 0, name: 'ИТЛ' },
    { id: 1, name: 'Особый лагерь' },
    { id: 2, name: 'Спецлагерь' },
    { id: 3, name: 'Лагерное отделение' }
  ];

  return knex('types').insert(types);
};

exports.seed = seed;
