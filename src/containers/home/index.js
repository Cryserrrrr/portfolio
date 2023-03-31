import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { easeIn, motion, useMotionValue, useTransform , useAnimationControls, easeOut, easeInOut} from "framer-motion";
//Theme
import ui from "../../utils/theme";
//Image
import logo from "../../images/Cryser.png";
import icon from "../../images/arrow.svg";
import iconWhite from "../../images/arrowWhite.svg";
import iconDown from "../../images/arrowDown.svg";

const OverPage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${ui.secondary};
  z-index: -1;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(90deg, ${ui.primary} 50%, ${ui.secondary} 100%);
  overflow: hidden;
  overflow-x: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    background: linear-gradient(180deg, ${ui.primary} 55%, ${ui.secondary} 100%);
  }
`;

const TitleContainer = styled.div`
  display: ${props => props.removed ? 'none' : 'flex'};
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: 100%;
  width: 50%;
  padding: 0 50px;
  user-select: none;

  @media (max-width: 768px) {
    width: 80%;
    align-items: center;
  }

  @media (max-width: 475px) {
    width: 90%;
  }

  @media (max-width: 420px) {
    width: 95%;
    margin-top: 20px;
  } 
`;

const Title = styled(motion.h1)`
  font-size: 7.4rem;
  color: ${ui.secondary};
  font-weight: 700;
  margin: 0;

  @media (max-width: 1144px) {
    font-size: 6rem;
  }

  @media (max-width: 420px) {
    font-size: 5rem;
  }
`;

const SubTitle = styled(motion.h2)`
  font-size: 4rem;
  color: white;
  font-weight: 100;
  margin: 0;

  @media (max-width: 1144px) {
    font-size: 3.5rem;
  }

  @media (max-width: 420px) {
    font-size: 2.5rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  padding: 0 50px;
  user-select: none;
`;

const Image = styled(motion.img)`
  height: 500px;
  width: 500px;
  object-fit: contain;
  border-radius: 70%;
  rotateX: ${props => props.x};
  rotateY: ${props => props.y};
  user-select: none;

  @media (max-width: 1144px) {
    height: 400px;
    width: 400px;
  }

  @media (max-width: 690px) {
    height: 250px;
    width: 250px;
  }
`;

const CustomCursor = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  pointer-events: none;
  user-select: none;
  left: ${props => props.mousePosition.x}px;
  top: ${props => props.mousePosition.y}px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Description = styled(motion.p)`
  font-size: 2rem;
  color: white;

  @media (max-width: 1144px) {
    font-size: 1.5rem;
    text-align: center; 
  }

  @media (max-width: 420px) {
  }
`

const EachWord = styled(motion.span)`
  display: inline-block;
`;

const Icon = styled(motion.img)`
  height: 50px;
  width: 50px;
  user-select: none;
`;
  

const Home = ({setDisplay}) => {

  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [page, setPage] = useState(0);
  const [changingPage, setChangingPage] = useState(false);
  const [isHoveringDesc, setIsHoveringDesc] = useState(false);
  const [imgSrc, setImgSrc] = useState(logo);
  const [clickable, setClickable] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [hoverBlack, setHoverBlack] = useState(false);

  const isBrowser = () => typeof window !== "undefined"
  const outerWidth = isBrowser() ? window.outerWidth : null;

  const animation = useAnimationControls()

  const changePage = () => {
    if (changingPage) return;
    if (clickable) return;
    setChangingPage(true);
    if (page === 0) {
      sequence();
    } else if (page === 1) {
      sequenceTwo();
    }
    setPage(page + 1);
    setTimeout(() => {
      setChangingPage(false);
      setIsHovering(false);
    }, 2000);
  };

  const onMouseMove = (e) => {
    setMousePosition({ x: e.clientX - 30, y: e.clientY - 30 });
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const rotateX = useTransform(x, [-500, 500], [-20, 20]);
  const rotateY = useTransform(y, [500, -500], [20, -20]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    x.set(distanceX);
    y.set(distanceY);
  }

  const sequence = async () => {
    setClickable(true);
    await animation.start({ y: 100, transition: { duration: 1, ease: easeInOut } });
    await animation.start({ y: outerWidth <= 768 ? outerWidth <= 768 ? 0 : -60 : 0, borderRadius: "10%", transition: { duration: 1, ease: easeInOut } });
    setTimeout(async () => {
      await animation.start({ y: 1000, transition: { duration: 1, ease: easeIn } });
      if (outerWidth <= 768) {
        setImgSrc(iconDown);
      } else {
        setImgSrc(icon);
      }
      setArrow(true);
      if (outerWidth >= 768) {
        await animation.start({ y: -1000, opacity: 0 , transition: { duration: 0 } });
      }
      await animation.start({ y: outerWidth <= 768 ? outerWidth <= 768 ? 0 : -80 : 0, opacity: 1, scale: outerWidth <= 375 ? 0.2 : 0.5, transition: { duration: 1, ease: easeOut } });
      setClickable(false);
    }, 5000);
  };

  const sequenceTwo = async () => {
    setTimeout(() => {
      setDisplay(1);
    }, 2000);
    animation.start({ x: outerWidth > 768 ? -2000 : 0, y: outerWidth <= 768 ? -1000 : 0 , transition: { duration: 2, ease: easeInOut } });
  };

  return (
    <div onMouseMove={!changingPage ? page !== 2 ? handleMouse : null : null}>
      <OverPage/>
      <Container
        animate={{ x: page === 2 && outerWidth > 768 ? -2000 : 0, y: page === 2 && outerWidth <= 768 ? -1000 : 0, transition: { duration: 2, ease: easeInOut } }}
      >
        <CustomCursor 
            mousePosition={mousePosition}
            animate={{ 
              scale: isHovering && !clickable ? arrow ? 0.8 : 1.5 : isHoveringDesc ? 0.3 : 1, 
              opacity: isHoveringText ? 0  : 1, 
              backgroundColor: isHovering && !arrow && !clickable? "unset" : hoverBlack ? ui.secondary : ui.primary, 
              border: isHovering && !clickable ?`2px solid ${ ui.secondary}` : "none", 
              backdropFilter: isHovering && !arrow ? "blur(2px)" : "none" }}
            transition={{ duration: 0.2 }}
          >{isHovering && (arrow ?  <Icon src={iconWhite} alt="arrow"/> : clickable ? null : "Click Me" )}</CustomCursor>
        <TitleContainer
          onMouseEnter={() => setHoverBlack(true)}
          onMouseLeave={() => setHoverBlack(false)}
        >
          <Title
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: page === 0 ? 1 : 0, y: page === 0 ? outerWidth <= 768 ?  100 : 200 : -1000 }}
            transition={{ duration: page === 0 ? 1 : 1.9, ease: page === 0 ? "easeOut" : "easeIn" }}
            onMouseEnter={() => setIsHoveringText(true)}
            onMouseLeave={() => setIsHoveringText(false)}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 }}}
          >Eliott Le Duc</Title>
          <SubTitle 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: page === 0 ? 1 : 0, y: page === 0 ? outerWidth <= 768 ? 100 : 200 : -1000 }}
            transition={{ delay: page === 0 ? 0.5 : 0, duration: page === 0 ? 1 : 2, ease: page === 0 ? "easeOut" : "easeIn" }}
            whileHover={{ }}
          >Front-end Developpeur</SubTitle>
          <Title
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: page === 1 ? outerWidth <= 768 ? outerWidth <= 375 ? -50 : -100 : 0 : page === 2 && outerWidth <= 768 ? -1000 : 1000, x: page > 1 && outerWidth > 768 ? -1000 : 0 }}
            transition={{ duration: page === 1 ? 2 : 1, ease: page === 1 ? "easeOut" : "easeIn" }}
            onMouseEnter={() => setIsHoveringText(true)}
            onMouseLeave={() => setIsHoveringText(false)}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 }}}
          >Qui suis-je ?</Title>
          <Description
            initial={{ opacity: 0, y: 1000 }}
            animate={{ opacity: 1, y: page > 0 ? outerWidth <= 768 ? outerWidth <= 375 ? -20: -50 : 0 : page === 2 && outerWidth <= 768 ? -1500 : 1000, x: page > 1 && outerWidth > 768 ? -1000 : 0  }}
            transition={{ delay: page > 1 ? 0 : 0.2, duration: page === 1 ? 2 : 1, ease: page === 1 ? "easeOut" : "easeIn" }}
            onMouseEnter={() => setIsHoveringDesc(true)}
            onMouseLeave={() => setIsHoveringDesc(false)}
          >
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>Junior </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>dans </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>le </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>developpement </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>web </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>et </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>mobile, </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>je </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>suis </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>pris </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>de </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>passion </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>pour </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>les </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>technologies </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>front-end </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>et </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>plus </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>particulièrement </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>ReactJs. </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>Actuellement </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>au </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>poste </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>de </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>developpeur </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>web </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>full </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>stack </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>chez </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>A2display </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>en </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>alternance, </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>j'aimerais </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>me </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>spécialiser </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>dans </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>le </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>developpement </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>front-end. </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>Je </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>suis </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>à </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>la </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>recherche </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>de </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>nouveaux </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>challenges </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>et </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>de </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>nouvelles </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>expériences </EachWord>
            {" "}
            <EachWord whileHover={{scale: 1.1, color: ui.secondary, transition: { duration: 0.2} }}>professionnelles. </EachWord>
          </Description>
        </TitleContainer>
        <ImageContainer> 
          <Image
            src={imgSrc}
            alt="Eliott Le Duc"
            whileHover={{ scale: arrow ? outerWidth <= 355 ? 0.2 : 0.5 : 1.1, borderRadius: "10%", transition: { duration: 0.2 } }}
            whileTap={{ scale: clickable ? arrow ? 0.1 : 1.1 : 0 }}
            initial={{ opacity: 1, y: outerWidth <= 768 ? -100 : 0, scale: arrow ? outerWidth <= 375 ? 0.2 : 0.5 : 1 }}
            animate={animation}
            style={{ x: rotateX, y: rotateY, scale: arrow ? outerWidth <= 375 ? 0.2 : 0.5 : 1 }}
            transition={{ duration: 1 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => changePage()}
          />
        </ImageContainer>
      </Container>
    </div>
  );
}

export default Home;