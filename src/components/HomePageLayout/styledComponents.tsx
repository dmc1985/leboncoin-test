import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4rem;
  @media (max-width: 600px) {
    flex-direction: column;
    margin: 0.5rem;
  }
`;

export const Title = styled.h2``;

export const PortfolioLink = styled.a`
  color: blue;
`;
