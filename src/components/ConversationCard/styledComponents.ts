import styled from "styled-components";
import Link from "next/link";

export const Container = styled(Link)`
  display: flex;
  margin: 0.5rem;
  border-radius: 8px;
  border: 1px solid lightgrey;
  width: 100%;
  padding: 1.5rem;
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: blue;
  border-radius: 50%;
  width: 2.5rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
`;

export const NameText = styled.span`
  font-size: 18px;
  margin-bottom: 0.5rem;
`;

export const DateText = styled.span`
  color: grey;
  font-size: 12px;
`;
