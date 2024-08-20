import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import CloseIcon from '../../assets/close.png';
import getCategoryBackgroundColor from '../../helpers/getCategoryBackgroundColor';
import { useModal } from '../../hooks/useModal';
import { useAppDispatch } from '../../hooks/useRedux';
import ICategory from '../../interfaces/ICategory';
import IStatus from '../../interfaces/IStatus';
import { addCard, updateOneCard } from '../../store/slices/cards.slice';
import { updateColumns } from '../../store/slices/columns.slice';
import { 
  Container, 
  Input, 
  Button,
  ModalContent, 
  MultilineInput, 
  CategoriesContainer, 
  LabelContainer,
  ErrorMessage
} from './styles';

const Modal = ({ visible }) => {
  const { toggleVisibility, selectedCard } = useModal();
  const theme = useContext(ThemeContext); 

  const [title, setTitle] = useState(selectedCard?.title || '');
  const [description, setDescription] = useState(selectedCard?.description || '');
  const [cardCategory, setCardCategory] = useState(selectedCard?.category || ICategory.FEATURE);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTitle(selectedCard?.title || '');
    setDescription(selectedCard?.description || '');
    setCardCategory(selectedCard?.category || ICategory.FEATURE);
  }, [selectedCard, visible]);

  const handleSave = () => {
    if (!title) {
      setErrorMessage("The title field can't be empty!");
      return;
    }

    setErrorMessage('');

    if (!selectedCard?.id) {
      const newCard = {
        id: uuidv4(),
        title,
        description,
        category: cardCategory,
        status: IStatus.BACKLOG,
        hidden: false,
      };
      dispatch(addCard(newCard));
      dispatch(updateColumns(newCard.id));
      toggleVisibility(undefined);
    } else {
      const updatedCard = {
        ...selectedCard,
        title,
        description,
        category: cardCategory
      };
      dispatch(updateOneCard(updatedCard));
      toggleVisibility(undefined);
    }
  };

  const handleCloseModal = () => {
    toggleVisibility(undefined);
    setTitle('');
    setDescription('');
    setCardCategory(ICategory.FEATURE);
    setErrorMessage('');
  };

  if (!visible) return null;

  return (
    <Container>
      <ModalContent>
        <img src={CloseIcon} alt="Close icon" onClick={handleCloseModal}/>

        <h3>Title</h3>
        <Input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          minLength={1} 
          maxLength={50} 
          containsError={!!errorMessage}
        />
        {errorMessage && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}

        <h3>Description</h3>
        <MultilineInput 
          aria-multiline 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          maxLength={300}
        />

        <CategoriesContainer>
          {Object.values(ICategory).map(category => (
            <LabelContainer 
              key={category} 
              color={() => getCategoryBackgroundColor(theme, category)}
            >
              <label>
                <input 
                  type='radio' 
                  name={category} 
                  value={category} 
                  checked={cardCategory === category}
                  onChange={(e) => setCardCategory(e.currentTarget.value)}
                />
                <i>{category}</i>
              </label>
            </LabelContainer>
          ))}
        </CategoriesContainer>
        <Button type='button' onClick={handleSave}>
          {selectedCard ? 'Save Changes' : 'Add card to Backlog'}
        </Button>

      </ModalContent>
    </Container>
  );
};

export default Modal;
