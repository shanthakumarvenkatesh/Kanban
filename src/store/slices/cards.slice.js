import { createSlice } from '@reduxjs/toolkit';

import mockCards from '../../data/cards';
import ICategory from '../../interfaces/ICategory';

const initialState = {
  cards: mockCards,
  searchText: '',
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    addCard: (state, action) => {
      const card = action.payload;
      state.cards = [...state.cards, card];
    },
    updateOneCard: (state, action) => {
      const cardId = action.payload.id;
      state.cards = state.cards.map(card =>
        card.id === cardId ? action.payload : card
      );
    },
    filterCards: (state, action) => {
      const searchText = state.searchText;
      const categories = action.payload.categories || Object.values(ICategory);

      state.cards = state.cards.map(card => {
        if (searchText.length > 0) {
          if (card.title.toUpperCase().includes(searchText.toUpperCase()) && categories.includes(card.category)) {
            return { ...card, hidden: false };
          }
        } else if (categories.includes(card.category)) {
          return { ...card, hidden: false };
        }
        return { ...card, hidden: true };
      });
    },
    clearFilters: (state) => {
      state.cards = state.cards.map(card => ({
        ...card,
        hidden: false,
      }));
    },
  },
});

export const { setCards, updateOneCard, filterCards, clearFilters, addCard, setSearchText } = cardsSlice.actions;

export default cardsSlice.reducer;
