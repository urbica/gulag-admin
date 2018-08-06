import createImmutableSelector from 'create-immutable-selector';

const uiSelector = state => state.get('ui');

export const searchQuerySelector = createImmutableSelector(
  uiSelector,
  ui => ui.get('searchQuery')
);

export const campsSortASCSelector = createImmutableSelector(
  uiSelector,
  ui => ui.get('campsSortASC')
);

export const campsSortBySelector = createImmutableSelector(
  uiSelector,
  ui => ui.get('campsSortBy')
);
