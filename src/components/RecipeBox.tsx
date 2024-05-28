import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Button from "./Button";
import useFetch from "../hooks/useFetch";

type CloseButtonProps = {
  isRotated: boolean;
};

const RecipeWrapper = styled(motion.div)`
  position: absolute;
  width: 100vw;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border-radius: 25px 25px 0 0;
  padding: 2rem;
  background-color: #b2d2cd;
  transition: all 0.6s ease;
`;

const BoredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Header1 = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: 500;
  margin: 0;
`;

const ParagraphMedium = styled.p`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: 1rem;
  background-color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 50px;
`;

const ParagraphSmall = styled.p`
  font-size: 12px;
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const CloseButton = styled.img<CloseButtonProps>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 30px;
  cursor: pointer;
  transform: ${(props) =>
    props.isRotated ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.6s ease;
`;

type RecipeData = {
  meals: Recipe[];
};

type FetchedMeals = {
  data: RecipeData | null;
  error?: string;
};

type Recipe = {
  strMeal: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
};

function RecipeBox() {
  const [fetchNew, setFetchNew] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [isRotated, setIsRotated] = useState<boolean>(false);

  const recipeResponse: FetchedMeals = useFetch(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    [fetchNew]
  );

  const fetchedRecipe = recipeResponse?.data
    ? recipeResponse?.data?.meals[0]
    : "Loading...";

  console.log("fetched recipe", recipeResponse?.data?.meals[0]);

  const handleRecipeClick = () => {
    setFetchNew((prevFetchNew) => !prevFetchNew);
  };

  const handleCloseClick = () => {
    setIsClosed((prevIsClosed) => !prevIsClosed);
    setIsRotated((prevIsRotated) => !prevIsRotated);

    const contentElements =
      document.querySelectorAll<HTMLElement>(".content-element");

    contentElements.forEach((element) => {
      if (element !== closeButtonRef.current) {
        element.style.display = isClosed ? "flex" : "none";
      }
    });

    // Ensure closeButtonRef.current is not null before accessing its style
    if (closeButtonRef.current) {
      closeButtonRef.current.style.transform = isRotated
        ? "rotate(180deg)"
        : "rotate(0deg)";
    }
  };

  const closeButtonRef = React.useRef<HTMLImageElement>(null);

  return (
    <>
      <RecipeWrapper
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, height: isClosed ? "auto" : "auto" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <BoredContent>
          <CloseButton
            ref={closeButtonRef}
            onClick={handleCloseClick}
            src="/assets/close.svg"
            alt="close"
            isRotated={isRotated}
          />
          <Header1 className="content-element">Hmm.. You seem hungry</Header1>
          <p className="content-element">How about..</p>
          {typeof fetchedRecipe !== "string" && (
            <>
              <ParagraphMedium className="content-element">
                {/* Check if type of fetchedRecipe is Recipe */}
                {fetchedRecipe?.strMeal}
              </ParagraphMedium>
              <h2 className="content-element">Ingredients</h2>
              <div className="content-element">
                <ul>
                  <li>
                    {fetchedRecipe?.strMeasure1} {fetchedRecipe?.strIngredient1}
                  </li>
                  <li>
                    {fetchedRecipe?.strMeasure2} {fetchedRecipe?.strIngredient2}
                  </li>
                  <li>
                    {fetchedRecipe?.strMeasure3} {fetchedRecipe?.strIngredient3}
                  </li>
                </ul>
              </div>
              <p className="content-element">
                {fetchedRecipe?.strInstructions}
              </p>
            </>
          )}
          <ParagraphSmall className="content-element">
            Generate new activity
          </ParagraphSmall>
          <ButtonWrapper className="content-element">
            <Button text="Another recipe" onClick={() => handleRecipeClick()} />
          </ButtonWrapper>
        </BoredContent>
      </RecipeWrapper>
    </>
  );
}

export default RecipeBox;
