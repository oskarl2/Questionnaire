import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

import theme, { dark } from '../../theme/theme';

import Button from '../../components/Button';

const About: React.FC = () => {
  const history = useHistory();

  const goTo = (route: string): void => {
    history.push(route);
  };

  return (
    <AboutWrapper>
      <div className="about-title">
        Пройдите опрос или посмотрите результаты
      </div>

      <div className="action-buttons">
        <div className="start">
          <Button
            type="button"
            theme={theme}
            handleClick={() => goTo('questionnaire')}
          >
            Начать опрос
          </Button>
        </div>

        <Button
          type="button"
          theme={dark}
          handleClick={() => goTo('report')}
        >
          Посмотреть результаты
        </Button>
      </div>

    </AboutWrapper>
  );
};

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  
  .about-title {
    margin-bottom: 40px;
    font-size: 30px;
  }
  
  .action-buttons {
    display: flex;
  
    .start {
      margin-right: 20px;
    }
  }
`;

export default About;
