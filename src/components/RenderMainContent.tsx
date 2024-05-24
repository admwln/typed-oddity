import React from "react";
import BodyWrapper from "../components/BodyWrapper";
import FactBox from "../components/FactBox";
import ButtonContainer from "../components/ButtonContainer";
import RenderButtons from "./RenderButtons";

type ButtonProps = {
  text: string;
  onClick: () => void;
  className: string;
};

export type RenderMainContentProps = {
  selectedFact: "daily" | "random";
  randomClickCount: number;
  buttons: ButtonProps[];
  selectedButton: number;
};

const RenderMainContent = ({
  selectedFact,
  randomClickCount,
  buttons,
  selectedButton,
}: RenderMainContentProps): React.ReactElement => {
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
