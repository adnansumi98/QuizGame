import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafbfe;
`;

export const Heading = styled.h1`
  color: ${(props) => (props.color ? props.color : "#475569")};
  font-family: Roboto;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
`;

export const Text = styled.p`
  color: ${(props) => (props.color ? props.color : "#64748b")};
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
`;
