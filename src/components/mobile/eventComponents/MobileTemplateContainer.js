import React from 'react';
import {Flex, Heading, Button} from '@chakra-ui/core';
import MobileChooseDateForm from './MobileChooseDateForm';
import CreateTemplateForm from '../../dashboardComponents/CreateTemplateForm'
import styled from 'styled-components'



const MobileTemplateContainer = (props) => {
    const {
    setSelected,
    selected,
    templateFormOpen,
    setTemplateFormOpen,
    formOpen,
    setFormOpen,
    setTemplateList,
    templateList,
    currentUser,
    setNavState, 
    setToggleNav, 
    toggleNav,
    conStart, 
    setConStart, 
    conEnd, 
    setConEnd, 
    summ, 
    setSumm} = props;


  return (
          <>
          <Container>
            <Title as="h2">Events</Title>
            </Container>
            <EventDiv>
            {templateList &&
              templateList.map(t => (
                <MobileChooseDateForm
                  key={t._id}
                  id={t._id}
                  starttime={t.starttime}
                  endtime={t.endtime}
                  summary={t.summary}
                  description={t.description}
                  setSelected={setSelected}
                  selected={selected}
                  templateFormOpen={templateFormOpen}
                  setTemplateFormOpen={setTemplateFormOpen}
                  setTemplateList={setTemplateList}
                  templateList={templateList}
                  setNavState={setNavState}
                  formOpen={formOpen}
                  setFormOpen={setFormOpen}
                  setToggleNav={setToggleNav} 
                  toggleNav={toggleNav}
                  conStart={conStart} 
                  setConStart={setConStart} 
                  conEnd={conEnd} 
                  setConEnd={setConEnd} 
                  summ={summ} 
                  setSumm={setSumm}
                  
                />
                
              ))}
              </EventDiv>
          </>
  );
};

export default MobileTemplateContainer;



const Container = styled.div`
    width: 100%;
    display: flex; 
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #BDBDBD;
    padding: 5% 2.5% 2.5% 2.5%;
    position: fixed;
    top: 0;
    background: white; 
`;

const Title = styled.h1`
    width: 60%;
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 27px;
`;

const EventDiv = styled.div`
  margin-top: 20%;
`
