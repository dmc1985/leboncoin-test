import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 80%;
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`;
