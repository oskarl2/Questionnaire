import React from "react";
import styled from "styled-components";
import { displayQuestionText } from "../helper";

interface IQuestionBlockProps {
  index: number;
  title?: string;
  readonly isLast?: boolean;
}

interface IBlockStyledProps {
  readonly isLast?: boolean;
}

const QuestionBlock: React.FC<IQuestionBlockProps> = ({
  index,
  title,
  isLast,
  children,
}) => {
  return (
    <QuestionBlockWrapper isLast={isLast}>
      <div>
        { displayQuestionText(index, title) }
      </div>

      <div className="block-answers">
        { children }
      </div>
    </QuestionBlockWrapper>
  )
};

const QuestionBlockWrapper = styled.div<IBlockStyledProps>`
  display: flex;
  flex-direction: column;
  width: 750px;
  padding: 20px 15px;
  margin-bottom: ${props => props.isLast ? 0 : 30}px;
  margin-bottom: 30px;
  background: rgb(255 213 151 / 22%);
  box-shadow: 0px 2px 4px rgb(128 128 128 / 63%);
  
  .block-answers {
    display: flex;
    margin-top: 20px;
  }
`;


export default QuestionBlock;
