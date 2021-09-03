import { props } from 'bluebird';
import styled from 'styled-components';
// npm i styled-components
import st from './Button.module.css';
// setElement()
// setElement`` template gal litteral - vanila javascript

const StyledBtn = styled.button`
  width: 200px;
  height: 50px;
  background-color: tomato;
  color: white;
  transition: all 0.2s;

  &:hover {
    font-size: 1.3rem;
  }

  &:active {
    background-color: rgb(210, 31, 0);
  }
`;

const GreenStyledButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: greenyellow;
  color: #333;
  transition: all 0.2s;
`;
const StyledButtonCol = styled.button`
  width: 200px;
  height: 50px;
  background-color: ${(props) => props.color};
  color: #333;
  transition: all 0.2s;
`;

export default function Button() {
  return (
    <>
      <StyledBtn>Styled </StyledBtn>
      <button className={st.btn}>Module button</button>
      <GreenStyledButton>green style</GreenStyledButton>
      <StyledButtonCol color='tomato'>variable style</StyledButtonCol>
      <StyledButtonCol color='violet'>variable style</StyledButtonCol>
    </>
  );
}
