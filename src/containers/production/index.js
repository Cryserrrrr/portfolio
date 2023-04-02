import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, easeInOut, useAnimationControls } from 'framer-motion';
//Utils
import ui from '../../utils/theme';
import productions from '../../utils/production';
//Images
import arrow from '../../images/arrowWhite.svg';

const OverPage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${ui.primary};
  z-index: -1;
`;

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

const CarouselContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Carousel = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 500px;

  @media (max-width: 420px) {
    height: 400px;
  }
`;

const CarouselItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 400px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  margin: 0 20px;
  user-select: none;

  @media (max-width: 420px) {
    height: 300px;
    width: 300px;
  }
`;

const CarouselItemImg = styled(motion.img)`
  object-fit: cover;
  height: 100%;
  width: 100%;
  user-select: none;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  border-radius: 20px;
`;

const CarouselItemTitle = styled(motion.h2)`
  font-size: 4rem;
  color: ${ui.secondary};
  font-weight: 700;
  margin: 0;
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: center;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselTiles = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  width: 15%;
  overflow: hidden;
  margin-top: 20px;

  @media (max-width: 420px) {
    width: 30%;
  }
`;

const CarouselTile = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15px;
  width: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  user-select: none;

  @media (max-width: 768px) {
    background-color: ${props => props.current ? ui.primary : "white"};
`;

const CarouselSubTitle = styled(motion.h3)`
  font-size: 2rem;
  color: white;
  position: absolute;
  bottom: 20px;
`;

const Arrow = styled(motion.img)`
  height: 50px;
  width: 50px;
  transform: rotate(180deg);
`;

const Sequence = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const BackButton = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  font-size: 2rem;
  color: ${ui.primary};
`;

const TitlePart = styled(motion.span)`
`;

const Production = ({ setDisplay, goBack, setGoBack }) => {

  const isBrowser = () => typeof window !== "undefined"
  const outerWidth = isBrowser() ? window.outerWidth : null;

  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [current, setCurrent] = useState(0);
  const [hoverBlack, setHoverBlack] = useState(false);
  const [hovertiles, setHoverTiles] = useState(false);
  const [hoverItem, setHoverItem] = useState(false);
  const [hoverTitle, setHoverTitle] = useState(false);

  const control = useAnimationControls();
  const controlTwo = useAnimationControls();

  const onMouseMove = (e) => {
    setMousePosition({ x: e.clientX - 30, y: e.clientY - 30 });
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleGoBack = () => {
    setGoBack(true);
    setTimeout(() => {
      setDisplay(1);
    }, 2000);
  };

  useEffect(() => {
    hoverSequence();
  }, [hoverTitle]);

  const hoverSequence = async () => {
    if (hoverTitle) {
      await control.start({
        opacity: 0,
        transition: { duration: 0.5, ease: easeInOut }
      });
      control.start({
        display: "none",
        transition: { duration: 0.5, ease: easeInOut }
      });
      await controlTwo.start({
        display: "inline",
        transition: { duration: 0.5, ease: easeInOut }
      });
      await controlTwo.start({
        opacity: 1,
        transition: { duration: 0.5, ease: easeInOut }
      });
    } else {
      await controlTwo.start({
        opacity: 0,
        transition: { duration: 0.5, ease: easeInOut }
      });
      controlTwo.start({
        display: "none",
        transition: { duration: 0.5, ease: easeInOut }
      });
      control.start({
        display: "inline",
        transition: { duration: 0.5, ease: easeInOut }
      });
      await control.start({
        opacity: 1,
        transition: { duration: 0.5, ease: easeInOut }
      });
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <OverPage />
      <Container
        initial={{ x: outerWidth > 768 ? 1000 : 0, y: outerWidth > 768 ? 0 : 1000 }}
        animate={{ x: goBack ? outerWidth > 768 ? 1000 : 0 : 0, y: goBack ? outerWidth > 768 ? 0 : 1000 : 0 }}
        transition={{ duration: 2, ease: easeInOut }}
      >
        <CustomCursor
          mousePosition={mousePosition}
          animate={{ 
            backgroundColor: hoverBlack ? hoverItem ? 'unset' : ui.secondary : ui.primary,
            scale: hovertiles ? 0.3 : hoverItem ? 1.5 : 1,
            border: hoverItem ? '2px solid white' : 'unset',
            backdropFilter: hoverItem ? 'brightness(0.3)' : 'unset',
          }}
          transition={{ duration: 0.2, ease: easeInOut }}
        >
          {hoverItem && "Drag Me"}
          {hoverTitle && <Arrow src={arrow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />}
        </CustomCursor>
        <LeftContainer 
          onMouseEnter={() => setHoverBlack(true)}
          onMouseLeave={() => setHoverBlack(false)}
        >
          <CarouselContainer
            initial={{ x: outerWidth > 768 ? 1500 : 0, y: outerWidth > 768 ? 0 : 1000}}
            animate={{ x: goBack ? outerWidth > 768 ? 1000 : 0 : 0, y: goBack ? outerWidth > 768 ? 0 : 1000 : 0 }}
            transition={{ duration: 2.5, ease: easeInOut }}
          >
            <Carousel
              initial={{ x: 0 }}
              animate={{ x: (outerWidth <= 420 ? 340 : 440) * (-current + 1) }}
              transition={{ duration: 0.5, ease: easeInOut }}
              drag="x"$
              onDragEnd={(e, info) => {
                if (info.offset.x > 0) {
                  if (current === 0) {
                    setCurrent(productions.length - 1);
                  } else {
                    setCurrent(current - 1);
                  }
                } else {
                  if (current === productions.length - 1) {
                    setCurrent(0);
                  } else {
                    setCurrent(current + 1);
                  }
                }
              }}
            >
              {productions.map((item, index) => (
                <CarouselItem
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === current ? 1 : 0 }}
                  whileHover={{ scale: 1.05}}
                  transition={{ duration: 0.2, ease: easeInOut }}
                  onMouseEnter={() => setHoverItem(item.name)}
                  onMouseLeave={() => setHoverItem(false)}
                  onDoubleClick={() => window.open(item.link, "_blank")}
                >
                  <CarouselItemImg src={item.image} alt={item.name} animate={{ filter: hoverItem === item.name ? "brightness(0.4)" : "none" }} />
                  {hoverItem === item.name && <CarouselItemTitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} >{item.name}</CarouselItemTitle>}
                  {hoverItem === item.name && <CarouselSubTitle initial={{ opacity: 0 }} animate={{ opacity: 1 }} >Double cliquez pour acceder au projet</CarouselSubTitle>}
                </CarouselItem>
              ))}
            </Carousel>
            <CarouselTiles
              onMouseEnter={() => setHoverTiles(true)}
              onMouseLeave={() => setHoverTiles(false)}
            >
              {productions.map((item, index) => (
                <CarouselTile
                  key={index}
                  onClick={() => setCurrent(index)}
                  animate={{ backgroundColor: current === index ? outerWidth <= 768 ? ui.primary : ui.secondary : "white" }}
                  whileHover={{ scale: 1.3, transition: { duration: 0.2, ease: easeInOut } }} 
                  transition={{ duration: 1 , ease: easeInOut }}
                ></CarouselTile>
              ))}
            </CarouselTiles>
          </CarouselContainer>
          {outerWidth < 768 && <BackButton onClick={() => handleGoBack()}>Retour</BackButton>}
        </LeftContainer>
        <TitleContainer
        >
          <Title
            initial={{ x: outerWidth > 768 ? 1000 : 0, y: outerWidth > 768 ? 0 : 1000 }}
            animate={{ x: goBack ? outerWidth > 768 ? 1000 : 0 : hoverTitle ? 10 : 0, y: goBack ? outerWidth > 768 ? 0 : 1000 : 0 }}
            transition={{ duration: 2, ease: easeInOut }}
            onMouseEnter={() => outerWidth > 768 && setHoverTitle(true)}
            onMouseLeave={() => outerWidth > 768 && setHoverTitle(false)}
            onClick={() => outerWidth > 768 && handleGoBack()}
          >
            <Sequence>
              R
               <TitlePart animate={controlTwo}>etour</TitlePart> 
                <TitlePart animate={control}>éalisations</TitlePart>
            </Sequence>
          </Title>
        </TitleContainer>
      </Container>
    </div>
  );
};

export default Production;