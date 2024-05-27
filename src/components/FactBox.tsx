import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { RenderMainContentProps } from "./RenderMainContent";
import useFetch from "../hooks/useFetch";

const StyledFactBoxContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 1rem 0;
  @media (min-width: 768px) {
    max-width: 750px;
    padding: 0 2rem;
  }
`;

const StyledHeading1 = styled.h1`
  font-size: 52px;
  font-weight: 300;
  line-height: 1.2;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 78px;
  }
`;

const StyledParagraph = styled.p`
  font-size: 24px;
  line-height: 1.4;
  max-width: 750px;
  margin-top: 1rem;
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

type FactBoxProps = Pick<
  RenderMainContentProps,
  "selectedFact" | "randomClickCount"
>;

function FactBox({ selectedFact, randomClickCount }: FactBoxProps) {
  const {
    data: randomFact,
    loading: randomLoading,
    error: randomError,
  } = useFetch("https://uselessfacts.jsph.pl/random.json?language=en", [
    randomClickCount,
  ]);

  const {
    data: dailyFact,
    loading: dailyLoading,
    error: dailyError,
  } = useFetch("https://uselessfacts.jsph.pl/api/v2/facts/today");

  return (
    <StyledFactBoxContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <StyledHeading1>
        {selectedFact === "random" ? "Random Fact" : "Daily Fact"}{" "}
      </StyledHeading1>
      <StyledParagraph>
        {selectedFact === "random" ? randomFact : dailyFact}
      </StyledParagraph>
    </StyledFactBoxContainer>
  );
}

export default FactBox;
