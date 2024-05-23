import React from "react";
import styled from "@emotion/styled";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 2rem;
`;

const StyledH1 = styled.h1`
  font-size: 32px;
  font-weight: 400;
`;

function Header(): React.ReactElement {
  return (
    <StyledHeader>
      <StyledH1>Oddity Oasis</StyledH1>
    </StyledHeader>
  );
}

export default Header;
