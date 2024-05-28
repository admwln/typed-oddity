import React from "react";
import BodyWrapper from "../components/BodyWrapper";
import FactBox from "../components/FactBox";
import { ButtonProps } from "../App";
import ButtonContainer from "../components/ButtonContainer";
import RenderButtons from "./RenderButtons";

export type MainProps = {
  selectedFact: "daily" | "random";
  randomClickCount: number;
  buttons: ButtonProps[];
  selectedButton: number;
};

const Main = ({
  selectedFact,
  randomClickCount,
  buttons,
  selectedButton,
}: MainProps) => {
  return (
    <BodyWrapper>
      <ButtonContainer>
        <RenderButtons buttons={buttons} selectedButton={selectedButton} />{" "}
      </ButtonContainer>{" "}
      <FactBox
        selectedFact={selectedFact}
        randomClickCount={randomClickCount}
      />
    </BodyWrapper>
  );
};

export default Main;
