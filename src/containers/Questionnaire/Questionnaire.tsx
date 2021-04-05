import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  selectAnswers,
  clearAnswers,
  saveAnswers,
  IItem,
  ISavedAnswers
} from './questionnaireSlice';
import { isLast } from './helper';
import { SINGLE_TYPE } from './const';
import { dark, light } from '../../theme/theme';

import Button from '../../components/Button';
import AnswerOption from './components/AnswerOption';
import QuestionBlock from './components/QuestionBlock';

interface IAnswerListHolderProps {
  id: number;
  type: string;
  items: Array<IItem>;
}

export const Questionnaire: React.FC = () => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const questions = useSelector(selectAnswers);

  useEffect(() => {
    setError(false);
  }, [questions]);

  const AnswerListHolder: React.FC<IAnswerListHolderProps> = ({
    id,
    type,
    items,
  }) => {
    return (
      <div className="answers-holder">
        {
          items.map((item, idx) => {
            return (
              <div key={`${idx}_${item}_${type}`} className="answer-holder">
                <AnswerOption
                  id={id}
                  type={type}
                  item={item}
                />
              </div>
            )
          })
        }
      </div>
    )
  };

  const handleSaveAnswers = () => {
    setError(false);
    let requiredFieldsLengths: number[] = [];

    const arr: Array<ISavedAnswers> = questions.map(i => {
      const answers = i.answers.filter(a => a.isChecked);
      const isRequiredField = i.type === SINGLE_TYPE;

      if (isRequiredField) {
        requiredFieldsLengths.push(answers.length);
      }

      return {
        title: i.title,
        answers,
      };
    });

    const isSomeRequiredFieldEmpty = requiredFieldsLengths.some(i => i === 0);

    if (isSomeRequiredFieldEmpty) {
      setError(true);

      return;
    }

    dispatch(saveAnswers(arr));
    history.push('report');
  };

  const handleClearAnswers = () => {
    dispatch(clearAnswers());
  };

  return (
    <QuestionniareWrapper>
      <div className="questionniare-title">
        Пройдите опрос
      </div>

      <div>
        {
          questions.map((question, index) => {
            const {
              type,
              title,
              answers,
            } = question;

            const sliceIndex = Math.ceil(answers.length / 2);
            const leftColumn = answers.slice(0, sliceIndex);
            const rightColumn = answers.slice(sliceIndex);
            const hasRightColumn = rightColumn.length !== 0;

            return (
              <QuestionBlock
                key={index}
                index={index + 1}
                title={title}
                isLast={isLast(index, questions)}
              >
                <>
                  <AnswerListHolder
                    id={index}
                    type={type}
                    items={leftColumn}
                  />
                  { hasRightColumn &&
                    <AnswerListHolder
                      id={index}
                      type={type}
                      items={rightColumn}
                    />
                  }
                </>
              </QuestionBlock>
            );
          })
        }
      </div>

      { error &&
        <div className="error">
          Один или несколько вопросов требует ответа
        </div>
      }

      <div className="footer-action-buttons">
        <Button
          type="button"
          theme={light}
          handleClick={handleClearAnswers}
        >
          Сбросить ответы
        </Button>

        <Button
          type="button"
          theme={dark}
          handleClick={handleSaveAnswers}
        >
          Подсчитать результаты
        </Button>
      </div>
    </QuestionniareWrapper>
  )
};

const QuestionniareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;

  .questionniare-title {
    margin-bottom: 40px;
    font-size: 30px;
  }

  .answers-holder {
    display: flex;
    flex-direction: column;
    margin-right: 40px;

    .answer-holder {
      padding: 5px 10px;
      margin-bottom: 10px;

      &:hover {
        border-radius: 5px;
        background: #e2e2e2;
        box-shadow: 1px 1px 1px #a7a7a7;
      }
    }
  }
  
  .error {
    margin-bottom: 10px;
    color: #ff7272;
  }
  
  .footer-action-buttons button:first-child {
    margin-right: 20px;
  }
`;

export default Questionnaire;
