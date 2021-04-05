import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import questionnaireReducer from '../containers/Questionnaire/questionnaireSlice';

export const store = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
