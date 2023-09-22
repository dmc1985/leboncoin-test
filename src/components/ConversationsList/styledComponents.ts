import styled from "styled-components";

export const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
