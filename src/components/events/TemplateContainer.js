import React, { useContext } from 'react';
import { Context } from '../../contexts/Contexts';
import ChooseDateForm from './ChooseDateForm';
import styled from 'styled-components';
import NewEventForm from '../events/NewEventForm';

const TemplateContainer = () => {
  const { templateList, width, navState } = useContext(Context);

  console.log(templateList);
  return (
    <div style={{ border: '2px solid green' }}>
      {/* {width >= 768 && navState === 3 ? <NewEventForm /> : ''} */}

      <Title as="h2">Events</Title>

      <EventDiv>
        {templateList &&
          templateList.map(t => (
            <ChooseDateForm
              key={t.id}
              id={t.id}
              starttime={t.starttime}
              endtime={t.endtime}
              title={t.title}
              notes={t.notes}
              group={
                t.groups[0] ? t.groups[0] : { groupColor: '', groupIcon: '' }
              }
            />
          ))}
      </EventDiv>
    </div>
  );
};

export default TemplateContainer;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 27px;
`;

const EventDiv = styled.div`
  margin-top: 20%;
`;
