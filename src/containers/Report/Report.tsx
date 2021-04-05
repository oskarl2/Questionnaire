import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import { dark } from '../../theme/theme';
import { ISavedAnswers, clearReport, selectQuestionnaireReport } from '../Questionnaire/questionnaireSlice';
import { isLast } from '../Questionnaire/helper';

import Button from '../../components/Button';
import QuestionBlock from '../Questionnaire/components/QuestionBlock';

const Report: React.FC = () => {
  const dispatch = useDispatch();
  const report = useSelector(selectQuestionnaireReport);
  const hasReport = report.length > 0;

  const Answers: React.FC<ISavedAnswers> = ({ answers }) => {
    return (
      <>
        {
          answers.map((answer: any, index: React.Key) => {
            return (
              <div key={index} className="answer-title">
                { answer.title }
              </div>
            );
          })
        }
      </>
    );
  }

  return (
    <ReportWrapper>
      { hasReport
        ? <>
            <div className="report-title">
              Отчет по опросу
            </div>

            <div>
              {
                report.map((question, index) => {
                  const hasAnswers = question.answers.length > 0;

                  return (
                    <QuestionBlock
                      key={index}
                      index={index + 1}
                      title={question.title}
                      isLast={isLast(index, report)}
                    >
                      { hasAnswers
                        ? <Answers answers={question.answers} />
                        : <>
                            Ответа нет
                          </>
                      }
                    </QuestionBlock>
                  );
                })
              }
            </div>

            <Button
              type="button"
              theme={dark}
              handleClick={() => dispatch(clearReport())}
            >
              Очистить отчет
            </Button>
          </>
        : <>
            Опрос еще не пройден
          </>
      }
    </ReportWrapper>
  )
};

const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  
  .report-title {
    margin-bottom: 40px;
    font-size: 30px;
  }
  
  .answer-title {
    padding-right: 10px;
  }
`;

export default Report;
