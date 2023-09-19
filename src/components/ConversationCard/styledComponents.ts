import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-self: center;
  width: 100%;
  justify-content: space-around;
  margin: 0.5rem;
  flex-basis: 45%;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid lightgrey;
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: blue;
  border-radius: 50%;
  width: 2rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
