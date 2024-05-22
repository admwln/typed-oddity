import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

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

// Moved this outside of the component to avoid re-creating the function on each render
const fetchRandomFact = async (): Promise<string> => {
  try {
    const response = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error(error);
    return "Failed to fetch random fact";
  }
};

const fetchDailyFact = async (): Promise<string> => {
  try {
    const response = await fetch(
      "https://uselessfacts.jsph.pl/today.json?language=en"
    );
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error(error);
    return "Failed to fetch today's fact";
  }
};
///////////////////////////////////////////////////////////////////////

type FactBoxProps = {
  selectedFact: string;
  randomClickCount: number;
};

function FactBox({ selectedFact, randomClickCount }: FactBoxProps) {
  const [randomFact, setRandomFact] = useState<string | null>(null);
  const [dailyFact, setDailyFact] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetDailyFact = async () => {
      if (selectedFact === "random") {
        const fetchedRandomFact = await fetchRandomFact();
        setRandomFact(fetchedRandomFact);
      } else if (selectedFact === "daily") {
        const fetchedDailyFact = await fetchDailyFact();
        setDailyFact(fetchedDailyFact);
      }
    };
    fetchAndSetDailyFact();
  }, [selectedFact, randomClickCount]);

  return (
    <>
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
    </>
  );
}

export default FactBox;
