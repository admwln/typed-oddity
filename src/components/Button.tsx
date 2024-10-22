import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledButton = styled(motion.button)`
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 5px;
  border: 2px solid #29211d;
  color: #29211d;
  align-items: center;
  background-color: transparent;
  display: flex;
  justify-content: center;
  text-align: center;
  &:hover {
    background-color: #29211d;
    border: 2px solid #29211d;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;

const StyledIcon = styled.img`
  margin-left: 8px;
  height: 20px;
`;

type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
  icon?: string | null;
};

const imageUrl = "/assets/generated.png";

function Button({ text, onClick, className }: ButtonProps) {
  return (
    <StyledButton
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      onClick={onClick}
      className={className}
    >
      {text}
      {text === "Random fact" && className === "selectedButton" && (
        <StyledIcon src={imageUrl} alt="Icon" />
      )}
    </StyledButton>
  );
}

export default Button;
