import * as React from "react";
import styled from "styled-components";
//Containers
import Home from "../containers/home";
import Skill from "../containers/skill";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IndexPage = () => {

  const [display, setDisplay] = React.useState(0);

  return (
    <Main>
    {display === 0 && <Home setDisplay={setDisplay}/>}
    {display === 1 && <Skill setDisplay={setDisplay}/>}
    </Main>
  )
}

export default IndexPage

export const Head = () => <title>Eliott Le Duc</title>
