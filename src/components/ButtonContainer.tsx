import React from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const Buttons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  @media (min-width: 768px) {
    flex-direction: row;
    width: 100%;
    padding-left: 2rem;
    max-width: 500px;
  }
`;

type ButtonContainerProps = {
  children: React.ReactNode; //ReactNode represents all of the things React can render.
};
// We opted not to use the React.FC type, as this syntax is more concise
// and does not require the import of React.

const ButtonContainer = ({ children }: ButtonContainerProps) => {
  return (
    <Buttons initial="initial" animate="animate">
      {children}
    </Buttons>
  );
};

export default ButtonContainer;
