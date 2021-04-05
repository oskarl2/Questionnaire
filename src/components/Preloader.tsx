import React from 'react';
import styled from 'styled-components';

const Preloader: React.FC = () => (
  <PreloaderWrapper>
    <div className="preloader" />
  </PreloaderWrapper>
);

const PreloaderWrapper = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgb(16 16 16 / 50%);
  
  .preloader {  
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
    
    animation: 1s linear 0s normal none infinite running rot;
    -webkit-animation: 1s linear 0s normal none infinite running rot;
    
    @keyframes rot {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @-webkit-keyframes rot {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export default Preloader;
