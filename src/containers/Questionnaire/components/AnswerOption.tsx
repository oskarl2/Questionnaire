import React from "react";
import Checkbox from "../../../components/Checkbox";
import RadioButton from "../../../components/RadioButton";
import Label from "../../../components/Label";
import { MULTIPLE_TYPE, SINGLE_TYPE } from "../const";
import {
  checkAnswerByMultipleType,
  checkAnswerBySingleType,
  selectAnswers,
  IItem,
  ICheckedEntitySingleType,
  ICheckedEntityMultipleType
} from "../questionnaireSlice";
import {useDispatch, useSelector} from "react-redux";

interface IAnswerOptionProps {
  id: number;
  type: string,
  item: IItem;
}

const AnswerOption: React.FC<IAnswerOptionProps> = (props) => {
  const dispatch = useDispatch();
  const questions = useSelector(selectAnswers);

  const handleChangeAnswerByMultipleType = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const entity: ICheckedEntityMultipleType = {
      id: props.id,
      answerId: questions[props.id].answers.findIndex(item => item.value === props.item.value),
      isChecked: e.target.checked,
    }

    dispatch(checkAnswerByMultipleType(entity));
  }

  const handleChangeAnswerBySingleType = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const entity: ICheckedEntitySingleType = {
      id: props.id,
      answerId: questions[props.id].answers.findIndex(item => item.value === props.item.value),
      prevAnswerId: questions[props.id].answers.findIndex(item => item.isChecked),
      isChecked: e.target.checked,
    }

    dispatch(checkAnswerBySingleType(entity));
  }

  switch(props.type) {
    case MULTIPLE_TYPE:  
      return (
        <Label name={props.item.title}>
          <Checkbox
            isChecked={props.item.isChecked}
            value={props.item.value}
            name={props.item.title}
            onChange={handleChangeAnswerByMultipleType}
          />
        </Label>
    );
    case SINGLE_TYPE:
      return (
        <RadioButton
          name={props.item.title}
          label={props.item.title}
          value={props.item.value}
          isSelected={props.item.isChecked}
          handleChange={handleChangeAnswerBySingleType}
        />
      );
    default:
      return null;
  }
};

export default AnswerOption;
