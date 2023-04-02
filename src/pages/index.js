import React, { useState, useEffect } from "react";
import styled from "styled-components";
//Containers
import Home from "../containers/home";
import Skill from "../containers/skill";
import Production from "../containers/production";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IndexPage = () => {

  const [display, setDisplay] = useState(0);
  const [goBack, setGoBack] = useState(false);

  useEffect(() => {
    if (goBack) {
      setTimeout(() => {
        setGoBack(false);
      }, 2000);
    }
  }, [display]);

  return (
    <Main>
    {display === 0 && <Home setDisplay={setDisplay}/>}
    {display === 1 && <Skill setDisplay={setDisplay} goBack={goBack}/>}
    {display === 2 && <Production setDisplay={setDisplay} goBack={goBack} setGoBack={setGoBack}/>}
    </Main>
  )
}

export default IndexPage

export const Head = () => <title>Eliott Le Duc</title>
