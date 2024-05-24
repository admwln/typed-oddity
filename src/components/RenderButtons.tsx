import React from "react";
import Button from "../components/Button";

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

const RenderButtons = ({ buttons }: RenderButtonsProps) => {
  return buttons.map((button, index) => (
    <Button
      key={index}
      text={button.text}
      onClick={button.onClick}
      className={button.className}
    />
  ));
};

export default RenderButtons;
