import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Button from "./Button";

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

type FetchedRecipe<T> = {
  data: T | null;
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

type RecipeData = {
  meals: Recipe[];
};

function RecipeBox() {
  const [recipe, setRecipe] = useState<Recipe | null | undefined>(null);
  const [fetchNew, setFetchNew] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const fetchRecipe = async <T extends RecipeData>(): Promise<
    FetchedRecipe<T>
  > => {
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/random.php`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return {
        data: data,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: "Failed to fetch recipe",
      };
    }
  };

  useEffect(() => {
    const fetchAndSetRecipe = async () => {
      const fetchedRecipe = await fetchRecipe();
      if (typeof fetchedRecipe === "string") {
      } else {
        console.log(fetchedRecipe.data);
        setRecipe(fetchedRecipe.data?.meals[0]);
      }
    };
    fetchAndSetRecipe();
  }, [fetchNew]);

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
          <ParagraphMedium className="content-element">
            &#x2728; {recipe?.strMeal} &#x2728;
          </ParagraphMedium>
          <h2 className="content-element">Ingredients</h2>
          <div className="content-element">
            <ul>
              <li>
                {recipe?.strMeasure1} {recipe?.strIngredient1}
              </li>
              <li>
                {recipe?.strMeasure2} {recipe?.strIngredient2}
              </li>
              <li>
                {recipe?.strMeasure3} {recipe?.strIngredient3}
              </li>
            </ul>
          </div>

          <p className="content-element">{recipe?.strInstructions}</p>
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
