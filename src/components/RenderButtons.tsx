import React from "react";
import Button from "../components/Button";
import GenerateIcon from "../../public/assets/generate.svg";

type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
  icon?: string;
};

type RenderButtonsProps = {
  buttons: ButtonProps[];
  selectedButton: number;
};

const RenderButtons = ({ buttons, selectedButton }: RenderButtonsProps) => {
  return buttons.map((button, index) => (
    <Button
      key={index}
      text={button.text}
      onClick={button.onClick}
      className={button.className}
      icon={
        button.text === "Random fact" && selectedButton === 0
          ? GenerateIcon
          : null
      }
    />
  ));
};

export default RenderButtons;
