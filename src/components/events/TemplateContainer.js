import React from 'react';
import ChooseDateForm from './ChooseDateForm';
import styled from 'styled-components'



const TemplateContainer = ({templateList}) => {


  return (
          <>
          <Container>
            <Title as="h2">Events</Title>
            </Container>
            <EventDiv>
            {templateList &&
              templateList.map(t => (
                <ChooseDateForm
                  key={t._id}
                  id={t._id}
                  starttime={t.starttime}
                  endtime={t.endtime}
                  title={t.title}
                  notes={t.notes}
                  templateList={templateList}/>
                
              ))}
              </EventDiv>
          </>
  );
};

export default TemplateContainer;



const Container = styled.div`
    width: 100%;
    display: flex; 
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
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
