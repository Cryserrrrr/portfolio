import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, easeOut, easeInOut} from "framer-motion";
//Utils
import ui from "../../utils/theme";
import skills from "../../utils/skills";

const OverPage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.changingPage ? ui.primary : ui.secondary};
  z-index: -1;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(90deg, ${ui.secondary} 0%, ${ui.primary} 50%);
  overflow: hidden;

  @media (max-width: 768px) {
    background: linear-gradient(180deg, ${ui.secondary} 0%, ${ui.primary} 25%);
    flex-direction: column;
    flex-direction: column-reverse;
    justify-content: space-between;
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
  color: ${ui.secondary};
  font-weight: 700;
  margin: 0;

  @media (max-width: 1144px) {
    font-size: 6rem;
  }

  @media (max-width: 768px) {
    color: ${ui.primary};
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
    height: 75%;
  }
`;

const Row = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  width: 80%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const SkillContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-color: white;
  color: ${ui.primary};
`;

const Logo = styled(motion.img)`
  height: 60px;
  width: 60px;
`;

const CustomCursor = styled(motion.div)`
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  pointer-events: none;
  user-select: none;
  left: ${props => props.mousePosition.x}px;
  top: ${props => props.mousePosition.y}px;
  background-color: ${ui.primary};
`;

const HoverContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90%;
  width: 95%;
  border-radius: 20px;
  border: 4px solid ${ui.secondary};

  @media (max-width: 768px) {
    width: 85%
  }
`;

const HoverTitle = styled(motion.h2)`
  font-size: 2.4rem;
  color: ${ui.primary};
  font-weight: 700;
  margin: 0;
  margin-top: 40px;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 80px;
  }
`;

const HoverDescription = styled(motion.p)`
  font-size: 1.6rem;
  color: ${ui.primary};
  font-weight: 400;
  margin: 0;
  text-align: center;
`;

const HoverMobile = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 70%;
  width: 95%;
  border-radius: 20px;
  position: absolute;
  background-color: white;
  bottom: 10px;
`;

const HoverFooter = styled(motion.div)`
  display: flex;
  align-items: end;
  justify-content: center;
  height: 10%;
  width: 100%;
  color: ${ui.tertiary};
  margin-bottom: 10px;
  text-align: center;
`;


const Skill = ({ setDisplay }) => {

  const isBrowser = () => typeof window !== "undefined"
  const [nbItemsByRow, setNbItemsByRow] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [innerWidth, setInnerWidth] = useState(isBrowser() ? window.innerWidth : null);
  const [hoverBlack, setHoverBlack] = useState(false);
  const [hoverSkill, setHoverSkill] = useState(false);
  const [closeCard, setCloseCard] = useState(false);
  const [changingPage, setChangingPage] = useState(false);

  const outerWidth = isBrowser() ? window.outerWidth : null;

  const onMouseMove = (e) => {
    setMousePosition({ x: e.clientX - 30, y: e.clientY - 30 });
  };

  const onResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    countItemsByRow();
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    countItemsByRow();
  }, [innerWidth]);

  const countItemsByRow = () => {
    if (innerWidth <= 768) {
      const rowWidth = innerWidth * 0.9;
      const nbItems = Math.floor(rowWidth / 120);
      setNbItemsByRow(nbItems);
    } else {
      const rowWidth = (innerWidth / 2) * 0.7;
      const nbItems = Math.floor(rowWidth / 120);
      setNbItemsByRow(nbItems);
    }
  };


  const displaySkills = () => {
    const rows = [];
    let row = [];
    let i = 0;
    if (nbItemsByRow === null) {
      return null;
    }
    skills.forEach((skill, index) => { 
        row.push(
          <SkillContainer
            key={index}
            initial={{ x: outerWidth > 768 ? 1000 : 0, y: outerWidth > 768 ? 0 : 1000 }}
            animate={{ x:  outerWidth > 768 ? changingPage ? -2000 : 0 : 0, y: outerWidth > 768 ? 0 : changingPage ? -1000 : 0 }}
            transition={{ duration: 2, ease: easeInOut, delay: index * (changingPage ? 0.02 : 0.1) }}
            onMouseEnter={() => setHoverSkill(skill.name)}
            onMouseLeave={() => handkeHoverSkill()}
            onClick={() => handleSkillClick(skill)}
          >
            <Logo src={skill.image} whileHover={shake}/>
          </SkillContainer>
        );
      if (i < nbItemsByRow) {
        i++;
      } else {
        rows.push(
          <Row key={index} >
            {row}
          </Row>
        );
        row = [];
        i = 0;
      }
    });
    rows.push(
      <Row key={skills.length} style={{width: row.length * 100}} >
        {row}
      </Row>
    );
    return rows;
  };

  const shake = () => {
    if (innerWidth > 768) {
      return {
        rotate: [0, 5, -5, 5, -5, 5, -5, 5, -5, 0],
        transition: {
          duration: 0.5,
          ease: easeOut,
        }
      };
    }
  };

  const displayDetails = () => {
    const skill = skills.find(skill => skill.name === hoverSkill);
    const link = skill.link && skill.link.replace(/(^\w+:|^)\/\//, '').replace('www.', '').replace(/\/$/, '');
    if (innerWidth > 768) {
      return (
        <HoverContainer>
          <HoverTitle initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {skill.name}
          </HoverTitle>
          <HoverDescription initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {skill.description}
          </HoverDescription>
          <HoverFooter initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{skill.link && `Cliquez pour accéder à ${link}`}</HoverFooter>
        </HoverContainer>
      );
    } else {
      return (
        <HoverMobile 
          initial={{ opacity: 0, y: 1000 }}
          animate={{ opacity: 1, y: closeCard ? 1000 : 0 }}
          transition={{ duration: 0.5, ease: easeOut }}  
          onClick={() => !skill.link && handleChangingPage()}
        >
          <HoverContainer>
            <HoverTitle initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {skill.name}
            </HoverTitle>
            <HoverDescription initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {skill.description}
            </HoverDescription>
            <HoverFooter onClick={() => skill.link && window.open(skill.link, "_blank")}>{skill.link && `Cliquez ici pour accéder à ${link}`}</HoverFooter>
          </HoverContainer>
        </HoverMobile>
      );
    }
  };

  const handleSkillClick = (skill) => {
    if (innerWidth > 768) {
      if (skill.link) {
        window.open(skill.link, "_blank");
      } else {
        handleChangingPage();
      }
    } else {
      setHoverSkill(skill.name)
    }
  };

  const handleChangingPage = () => {
    setChangingPage(true);
    setTimeout(() => {
      setChangingPage(false);
      setDisplay(2);
    }, 2000);
  };

  const handkeHoverSkill = () => {
    if (innerWidth > 768) {
      setHoverSkill(false);
    } else {
      setCloseCard(true);
      setTimeout(() => {
        setHoverSkill(false);
        setCloseCard(false);
      }, 500);
    }
  };

  return (
    <div style={{ overflow: "hidden" }} >
      <OverPage changingPage={changingPage}/>
      <Container
        initial={{ x: outerWidth > 768 ? 2000 : 0, y: outerWidth > 768 ? 0 : 1000 }}
        animate={{ x:  outerWidth > 768 ? changingPage ? -2000 : 0 : 0, y: outerWidth > 768 ? 0 : changingPage ? -1000 : 0 }}
        transition={{ duration: 2, ease: easeInOut }}
      >
        <CustomCursor
          mousePosition={mousePosition}
          animate={{ 
            backgroundColor: hoverBlack ? ui.secondary : hoverSkill ? "white" : ui.primary, 
            width: hoverSkill ? 600 : 40, 
            height: hoverSkill ? 300 : 40,
            borderRadius: hoverSkill ? 20 : 20,
            display: innerWidth <= 768 ? "none" : "flex",
          }}
          transition={{ duration: 0.2 }}
        >
          {hoverSkill && displayDetails()}
        </CustomCursor>
        <LeftContainer>
          {hoverSkill && innerWidth <= 768 && displayDetails()}
          {displaySkills()}
        </LeftContainer>
        <TitleContainer onMouseEnter={() => setHoverBlack(true)} onMouseLeave={() => setHoverBlack(false)}>
          <Title
            initial={{ x: outerWidth > 768 ? 1000 : 0, y: outerWidth > 768 ? 0 : 1000 }}
            animate={{ x:  outerWidth > 768 ? changingPage ? -1000 : 0 : 0, y: outerWidth > 768 ? 0 : changingPage ? -1000 : 0 }}
            transition={{ duration: 2, ease: easeInOut }}
          >
            Compétences
          </Title>
        </TitleContainer>
      </Container>
    </div>
  );
}

export default Skill