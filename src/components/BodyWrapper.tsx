import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: column;
    height: 500px;
  }
`;

type BodyWrapperProps = {
  children: React.ReactNode;
};

function BodyWrapper({ children }: BodyWrapperProps) {
  return <Wrapper>{children}</Wrapper>;
}

export default BodyWrapper;
