import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {MOCK} from "../../mock";

export interface IItem {
  value: number | string;
  title: string;
  isChecked?: boolean;
}

export interface IQuestions {
  type: string,
  title: string,
  answers: Array<IItem>
}

export interface ICheckedEntityMultipleType {
  id: number;
  answerId: number;
  isChecked?: boolean;
}

export interface ICheckedEntitySingleType extends ICheckedEntityMultipleType{
  prevAnswerId: number;
}

export interface ISavedAnswers {
  title?: string;
  answers: Array<IItem>
}

type LoadingState = 'idle' | 'pending';
interface QuestionnaireState {
  questionnaireData: Array<IQuestions>;
  questionnaireAnswers: Array<IQuestions>;
  questionnaireReport: Array<ISavedAnswers>;
  loading: LoadingState;
  error: boolean;
}

const initialState: QuestionnaireState = {
  questionnaireData: [],
  questionnaireAnswers: [],
  questionnaireReport: [],
  loading: 'idle',
  error: false,
};

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve(MOCK);
  }, 1000);
});

export const fetchQuestions = createAsyncThunk(
  '',
  async () => {
    return await promise;
  },
);

export const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    storeQuestions: (state, action: PayloadAction<Array<IQuestions>>) => {
      state.questionnaireData = action.payload;
      state.questionnaireAnswers = action.payload;
    },
    saveAnswers: (state, action: PayloadAction<Array<ISavedAnswers>>) => {
      state.questionnaireReport = action.payload;
    },
    clearAnswers: (state) => {
      state.questionnaireAnswers = state.questionnaireData;
    },
    clearReport: (state) => {
      state.questionnaireReport = [];
      state.questionnaireAnswers = state.questionnaireData;
    },
    checkAnswerByMultipleType: (state, action: PayloadAction<ICheckedEntityMultipleType>) => {
      const { id, answerId, isChecked }: ICheckedEntityMultipleType = action.payload;

      state.questionnaireAnswers[id].answers[answerId].isChecked = isChecked;
    },
    checkAnswerBySingleType: (state, action: PayloadAction<ICheckedEntitySingleType>) => {
      const { id, answerId, prevAnswerId, isChecked }: ICheckedEntitySingleType = action.payload;
      const hasPrevAnswerId = prevAnswerId !== -1;

      if (hasPrevAnswerId) {
        state.questionnaireAnswers[id].answers[prevAnswerId].isChecked = false;
      }

      state.questionnaireAnswers[id].answers[answerId].isChecked = isChecked;
    },
    incrementByAmount: (state, action: PayloadAction<Array<IQuestions>>) => {
      state.questionnaireAnswers = action.payload;
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchQuestions.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.questionnaireData = action.payload;
        state.questionnaireAnswers = action.payload;
        state.loading = 'idle'
      }
    },
    // @ts-ignore
    [fetchQuestions.pending]: (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    // @ts-ignore
    [fetchQuestions.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = action.error;
      }
    },
  }
});

export const {
  checkAnswerByMultipleType,
  checkAnswerBySingleType,
  storeQuestions,
  saveAnswers,
  clearReport,
  clearAnswers,
} = questionnaireSlice.actions;

export const selectAnswers = (state: RootState) => state.questionnaire.questionnaireAnswers;
export const selectQuestionnaireReport = (state: RootState) => state.questionnaire.questionnaireReport;
export const selectQuestionnaireData = (state: RootState) => state.questionnaire.questionnaireData;
export const selectFetchStatus = (state: RootState) => state.questionnaire.loading;

export default questionnaireSlice.reducer;
