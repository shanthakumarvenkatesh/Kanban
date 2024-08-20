import { createSlice } from '@reduxjs/toolkit'; // Import createSlice
import IStatus from '../../interfaces/IStatus'; // Import IStatus

import mockColumns from '../../data/columns'; // Assuming mockColumns is the initial column state

const initialState = { // Define initialState
  columns: mockColumns,
  updatedColumns: undefined,
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    updateColumns: (state, action) => {
      const { cardId, targetStatus } = action.payload;

      // Find the column that contains the card
      const currentColumn = state.columns.find(column =>
        column.cardsIds.includes(cardId)
      );

      // Define the workflow order
      const workflowOrder = [
        IStatus.BACKLOG,
        IStatus.TO_DO,
        IStatus.DOING,
        IStatus.IN_REVIEW
      ];

      const currentStatusIndex = workflowOrder.indexOf(currentColumn.id);
      const targetStatusIndex = workflowOrder.indexOf(targetStatus);

      // Prevent moving the card to a previous status in the workflow
      if (targetStatusIndex <= currentStatusIndex) {
        return; // Exit without making any changes
      }

      // Remove the card from the current column
      currentColumn.cardsIds = currentColumn.cardsIds.filter(id => id !== cardId);

      // Find the target column
      const targetColumn = state.columns.find(column => column.id === targetStatus);

      // Add the card to the target column
      if (targetColumn) {
        targetColumn.cardsIds.push(cardId);
      }
    },
  },
});

export const { setColumns, updateColumns } = columnsSlice.actions;

export default columnsSlice.reducer;
