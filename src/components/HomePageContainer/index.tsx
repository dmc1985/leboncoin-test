import styled from "styled-components";

export default styled.div`
  min-height: 100vh;
  width: 80%;
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
  }
`;
