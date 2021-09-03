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

const Article = styled.article`
  padding: 3rem;
  border: 1px solid #000;

  & button:hover {
    font-size: 1.2rem;
  }
  &:hover {
    & button {
      transform: scale(1.3);
    }
  }
`;

export default function Button() {
  return (
    <>
      {/* <StyledBtn>Styled </StyledBtn>
      <button className={st.btn}>Module button</button>
      <GreenStyledButton>green style</GreenStyledButton>
      <StyledButtonCol color='tomato'>variable style</StyledButtonCol>
       */}
      <div>
        <Article>
          <StyledButtonCol color='violet'>variable style</StyledButtonCol>
        </Article>
        <StyledButtonCol color='tomato'>variable style</StyledButtonCol>
      </div>
    </>
  );
}
