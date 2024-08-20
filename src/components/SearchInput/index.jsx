import React, { useEffect } from 'react';
import SearchIcon from '../../assets/search.png';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { clearFilters, filterCards, setSearchText } from '../../store/slices/cards.slice';
import { Container } from './styles';

const SearchInput = () => {
  const { searchText } = useAppSelector(state => state.cards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchText.length === 0) {
      dispatch(clearFilters());
    } else {
      dispatch(filterCards({}));
    }
  }, [searchText, dispatch]);

  return (
    <Container>
      <input
        type='search'
        placeholder='Search for cards titles...'
        value={searchText}
        onChange={(e) => dispatch(setSearchText(e.target.value))}
      />
      <img src={SearchIcon} alt="Search icon"/>
    </Container>
  );
}

export default SearchInput;
