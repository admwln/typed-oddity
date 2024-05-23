import React from "react";
import styled from "@emotion/styled";
import Header from "./components/Header";
import BoredBox from "./components/BoredBox";
import { useState } from "react";
import RenderMainContent from "./components/RenderMainContent";

import "./App.css";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  display: none;
  @media (min-width: 768px) {
    display: block;
    border-radius: 90px 90px 5px 5px;
    width: 250px;
    height: 350px;
  }
`;

function App() {
  const [selectedFact, setSelectedFact] = useState("daily");
  const [randomClickCount, setRandomClickCount] = useState(0);
  const [selectedButton, setSelectedButton] = useState(1);

  const handleRandomButtonClick = (): void => {
    setSelectedFact("random");
    setRandomClickCount((prevCount) => prevCount + 1);
    setSelectedButton(0);
  };

  type ButtonProps = {
    text: string;
    onClick: () => void;
    className: string;
  };

  const buttons: ButtonProps[] = [
    {
      text: "Today's fact",
      onClick: () => {
        setSelectedFact("daily");
        setSelectedButton(1);
      },
      className: selectedButton === 1 ? "selectedButton" : "",
    },
    {
      text: "Random fact",
      onClick: handleRandomButtonClick,
      className: selectedButton === 0 ? "selectedButton" : "",
    },
  ];

  return (
    <>
      <Header />
      <Section>
        <Image src="/assets/images/desert.jpg" alt="desert" />
        <RenderMainContent
          selectedFact={selectedFact}
          randomClickCount={randomClickCount}
          buttons={buttons}
          selectedButton={selectedButton}
        />
      </Section>
      {randomClickCount >= 5 && <BoredBox />}
    </>
  );
}

export default App;
