import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  Grid,
  Heading,
  Image,
  Button,
  Input
} from '@chakra-ui/core';
import { useAuth } from '../contexts/auth';
import Calendar from '../components/Calendar';
import useTemplate from '../hooks/useTemplate';
import Template from '../components/Template';

const Dashboard = () => {
  const { googleApi, api } = useAuth();
  const { templateList, getTemplateList, addTemplate } = useTemplate();

  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  // state used by template for selected days
  const [selected, setSelected] = useState([]);

  const { currentUser, handleSignOut } = googleApi;

  // Submit for template form
  const onSubmit = formData => addTemplate(formData, currentUser);

  useEffect(() => {
    getTemplateList(currentUser);
  }, []);

  const applyTemplate = (summary, description, starttime, endtime) => {
    const eventList = selected.map(e => ({
      end: { dateTime: `${e}T${endtime}:00-08:00` },
      start: { dateTime: `${e}T${starttime}:00-08:00` },
      summary: summary,
      description: description
    }));

    console.log('eventList', eventList);
    eventList.forEach(event => api.addEvent(event));
  };

  return (
    <Box
      pos="relative"
      backgroundColor="brand.lightgray"
      p={[4, 16]}
      minHeight="100vh"
    >
      <Grid
        width="100%"
        gap={4}
        templateColumns={['1fr', '250px 1fr']}
        gridTemplateAreas={["'sidebar' 'main'", "'sidebar main'"]}
      >
        <Flex
          className="sidebar"
          gridArea="sidebar"
          direction="column"
          align="center"
        >
          <Flex
            className="profileInfo"
            direction="column"
            align="center"
            justify="center"
            w="100%"
            p={8}
            mb={4}
            backgroundColor="white"
            borderRadius="10px"
          >
            <Image
              rounded="full"
              size="150px"
              src={currentUser.photoUrl}
              alt="avatar"
              mb={2}
            />
            <Heading as="h4" fontSize="xl" fontWeight="medium" mb={2}>
              {currentUser.email}
            </Heading>
            <Button variantColor="red" onClick={handleSignOut} mb={2}>
              Sign out
            </Button>
          </Flex>
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
            <Heading as="h2">Templates</Heading>
            {templateList.map(t => (
              <Template
                key={t._id}
                id={t._id}
                starttime={t.starttime}
                endtime={t.endtime}
                summary={t.summary}
                description={t.description}
                selected={selected}
                templateFormOpen={templateFormOpen}
                setTemplateFormOpen={setTemplateFormOpen}
                applyTemplate={applyTemplate}
              />
            ))}
            <Button
              my={4}
              variantColor="teal"
              onClick={() => setFormOpen(!formOpen)}
            >
              Create Template
            </Button>
            {formOpen && (
              <div className="Form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    type="text"
                    placeholder="summary"
                    name="summary"
                    ref={register({ maxLength: 80 })}
                  />
                  <Input
                    type="text"
                    placeholder="description"
                    name="description"
                    ref={register({ maxLength: 100 })}
                  />
                  <Input
                    type="time"
                    name="starttime"
                    ref={register({ required: true })}
                  />
                  <Input
                    type="time"
                    name="endtime"
                    ref={register({ required: true })}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </div>
            )}
          </Flex>
        </Flex>
        <Box className="calendarArea" gridArea="main">
          <Calendar
            api={api}
            selected={selected}
            setSelected={setSelected}
            templateFormOpen={templateFormOpen}
            setTemplateFormOpen={setTemplateFormOpen}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;
