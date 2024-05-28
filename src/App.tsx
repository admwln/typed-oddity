import React, { useState } from "react";
import styled from "@emotion/styled";
import Header from "./components/Header";
import RecipeBox from "./components/RecipeBox";
import Main from "./components/Main";
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

//onClick is typed as a function that takes no arguments and returns void
export type ButtonProps = {
  text: string;
  onClick: () => void;
  className: string;
};

//App is inferred to return a React.JSX.Element
function App() {
  const [selectedFact, setSelectedFact] = useState<"daily" | "random">("daily"); //Union type
  const [randomClickCount, setRandomClickCount] = useState<number>(0);
  const [selectedButton, setSelectedButton] = useState<number>(1);

  const handleRandomButtonClick = (): void => {
    setSelectedFact("random");
    setRandomClickCount((prevCount) => prevCount + 1);
    setSelectedButton(0);
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
        <Main
          selectedFact={selectedFact}
          randomClickCount={randomClickCount}
          buttons={buttons}
          selectedButton={selectedButton}
        />
      </Section>
      {randomClickCount >= 5 && <RecipeBox />}
    </>
  );
}

export default App;
