import { configureStore } from '@reduxjs/toolkit';

import columnsReducer from './slices/columns.slice';
import cardsReducer from './slices/cards.slice';

const store = configureStore({
  reducer: {
    columns: columnsReducer,
    cards: cardsReducer,
  },
});

export default store;
