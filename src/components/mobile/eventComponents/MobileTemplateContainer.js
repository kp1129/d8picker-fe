import React from 'react';
import {Flex, Heading, Button} from '@chakra-ui/core';
import MobileChooseDateForm from './MobileChooseDateForm';
import CreateTemplateForm from '../../dashboardComponents/CreateTemplateForm'



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
    currentUser} = props;


  return (
          <Flex
            className="templateArea"
            direction="column"
            align="center"
            justify="center"
            w="100%"
            p={8}
            mb={4}
            backgroundColor="white"
            borderRadius="10px"
          >
            <Heading as="h2">Events</Heading>
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
                />
                
              ))}
            {formOpen && <CreateTemplateForm setFormOpen={setFormOpen} setTemplateList={setTemplateList} currentUser={currentUser} formOpen={formOpen}/>}
          </Flex>
  );
};

export default MobileTemplateContainer;
