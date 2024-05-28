import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { MainProps } from "./Main";
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

// The following types represent what we expect to receive from the API
// In this specific case, we are only interested in the text property of the response
type Fact = {
  text: string;
};

// The FetchedFact type is used to represents what the useFetch hook returns
type FetchedFact = {
  data: Fact | null;
  error?: string;
};

// Here we have used the Pick utility type
// to create a new type FactBoxProps that only includes the selectedFact and randomClickCount
// properties from the MainProps type.
type FactBoxProps = Pick<MainProps, "selectedFact" | "randomClickCount">;

function FactBox({ selectedFact, randomClickCount }: FactBoxProps) {
  const randomFactResponse: FetchedFact = useFetch(
    "https://uselessfacts.jsph.pl/random.json?language=en",
    [randomClickCount]
  );

  const dailyFactResponse: FetchedFact = useFetch(
    "https://uselessfacts.jsph.pl/api/v2/facts/today"
  );

  const randomFact = randomFactResponse.data
    ? randomFactResponse.data.text
    : "Loading...";
  const dailyFact = dailyFactResponse.data
    ? dailyFactResponse.data.text
    : "Loading...";

  return (
    <StyledFactBoxContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <StyledHeading1>
        {selectedFact === "random" ? "Random Fact" : "Daily Fact"}
      </StyledHeading1>
      <StyledParagraph>
        {/* Display random fact if selected, otherwise display daily fact */}
        {selectedFact === "random" ? randomFact : dailyFact}
      </StyledParagraph>
    </StyledFactBoxContainer>
  );
}

export default FactBox;
