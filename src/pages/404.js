import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { navigate } from "gatsby"
//Utils
import ui from "../utils/theme"

const Container = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(90deg, ${ui.primary} 50%, ${ui.secondary} 100%);
  overflow: hidden;

  @media (max-width: 768px) {
    background: linear-gradient(180deg, ${ui.primary} 25%, ${ui.secondary} 100%);
    flex-direction: column;
    flex-direction: column-reverse;
    justify-content: space-between;
  }
`;

const CustomCursor = styled(motion.div)`
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  pointer-events: none;
  user-select: none;
  left: ${props => props.mousePosition.x}px;
  top: ${props => props.mousePosition.y}px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${ui.secondary};

  @media (max-width: 768px) {
    display: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  height: 100%;
  width: 50%;
  padding: 0 50px;
  user-select: none;
  z-index: 1;

  @media (max-width: 768px) {
    width: 90%;
    align-items: center;
    height: 20%;
  }

  @media (max-width: 420px) {
    width: 90%;
  } 
`;

const Title = styled(motion.h1)`
  font-size: 7.4rem;
  color: ${ui.primary};
  font-weight: 700;
  margin: 0;
  width: 70%;
  text-align: end;

  @media (max-width: 1144px) {
    font-size: 6rem;
  }

  @media (max-width: 768px) {
    text-align: center;
    color: ${ui.secondary};
  }

  @media (max-width: 420px) {
    font-size: 4rem;
  }
`;

const LeftContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    height: 70%;
  }
`;

const Description = styled(motion.p)`
  color: ${ui.secondary};
  font-size: 3rem;
  font-weight: 700;

  @media (max-width: 768px) {
    color: ${ui.primary};
  }
`

const ButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  height: 50px;
  margin-top: 50px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: ${ui.secondary};
  color: ${ui.primary};
  font-size: 1.5rem;
  font-weight: 700;
  user-select: none;
  outline: none;
  cursor: none;

  @media (max-width: 768px) {
    background-color: ${ui.primary};
    color: ${ui.secondary};
  }
`;

const NotFoundPage = () => {

  const isBrowser = () => typeof window !== "undefined"
  const outerWidth = isBrowser() ? window.outerWidth : null;

  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [hoverBlack, setHoverBlack] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [wrongButton, setWrongButton] = useState(false);

  const onMouseMove = (e) => {
    setMousePosition({ x: e.clientX - 30, y: e.clientY - 30 });
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <Container>
      <CustomCursor 
        mousePosition={mousePosition}
        animate={{
          backgroundColor: hoverBlack ? hoverButton ? ui.primary : ui.secondary : ui.primary,
          scale: hoverButton ? 0.5 : 1,
        }}
      />
      <LeftContainer onMouseEnter={() => setHoverBlack(true)} onMouseLeave={() => setHoverBlack(false)} >
        <Description>
          Vous êtes perdu ?
        </Description>
        <ButtonContainer
          onMouseEnter={() => setHoverButton(true)}
          onMouseLeave={() => setHoverButton(false)}
        >
          <Button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.2 },
            }}
            onClick={() => navigate("/")}
          >
            {wrongButton ? "Non" : "Oui"}
          </Button>
          <Button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.2 },
            }}
            onMouseEnter={() => setWrongButton(true)}
            onMouseLeave={() => setWrongButton(false)}
            onClick={() => navigate("/")}
          >
            {wrongButton ? "Oui" : outerWidth > 768 ? "Non" : "Oui"}
          </Button>
        </ButtonContainer>
      </LeftContainer>
      <TitleContainer>
        <Title>404</Title>
      </TitleContainer>
    </Container>
  )
}

export default NotFoundPage

export const Head = () => <title>404</title>
