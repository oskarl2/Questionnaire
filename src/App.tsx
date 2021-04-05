import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector} from 'react-redux';

import { fetchQuestions, selectFetchStatus } from './containers/Questionnaire/questionnaireSlice';
import { PAGES } from './pages';

import Navbar from './components/Navbar';
import About from './containers/About/About';
import Questionnaire from './containers/Questionnaire/Questionnaire';
import Report from './containers/Report/Report';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectFetchStatus);

  const getQuestions = () => {
    dispatch(fetchQuestions());
  }

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Navbar pages={PAGES} />

      { loading === 'pending' &&
        <Preloader />
      }

      <PagesWrapper>
        <Switch>
          <Route path="/report">
            <Report />
          </Route>
          <Route path="/questionnaire">
            <Questionnaire />
          </Route>
          <Route path="/">
            <About />
          </Route>
        </Switch>
      </PagesWrapper>
    </Router>
  );
}

export default App;

const PagesWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
