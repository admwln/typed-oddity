import React from "react";
import BodyWrapper from "../components/BodyWrapper";
import FactBox from "../components/FactBox";
import ButtonContainer from "../components/ButtonContainer";
import RenderButtons from "./RenderButtons";

const RenderMainContent = ({
  selectedFact,
  randomClickCount,
  buttons,
  selectedButton,
}) => {
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

export default RenderMainContent;
