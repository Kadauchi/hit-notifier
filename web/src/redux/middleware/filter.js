import { hitHistory } from '../actions';

function HIT_ADDED(store, next, action) {
  const state = store.getState();

  const mastersFilter = state.settings.filterMasters && action.payload.isMasters;
  const usOnlyFilter = state.settings.filterUsOnly && action.payload.isUsOnly;
  const payload = { ...action.payload, filter: mastersFilter || usOnlyFilter };

  return next({ ...action, payload });
}

function HIT_HISTORY(store, next, action) {
  const state = store.getState();

  const payload = action.payload.map((hit) => {
    const mastersFilter = state.settings.filterMasters && hit.isMasters;
    const usOnlyFilter = state.settings.filterUsOnly && hit.isUsOnly;
    return { ...hit, filter: mastersFilter || usOnlyFilter };
  });

  return next({ ...action, payload });
}

function SETTINGS_UPDATE(store, next, action) {
  const result = next(action);

  if (action.payload.hasOwnProperty(`filterMasters`) || action.payload.hasOwnProperty(`filterUsOnly`)) {
    const state = store.getState();
    store.dispatch(hitHistory(state.hits));
  }

  return result;
}

export default (store) => (next) => (action) => {
  switch (action.type) {
    case `HIT_ADDED`:
      return HIT_ADDED(store, next, action);
    case `HIT_HISTORY`:
      return HIT_HISTORY(store, next, action);
    case `SETTINGS_UPDATE`:
      return SETTINGS_UPDATE(store, next, action);
    default:
      return next(action);
  }
};
