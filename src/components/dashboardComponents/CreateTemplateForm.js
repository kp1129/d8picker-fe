import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@chakra-ui/core';
import axios from 'axios';
import { useAuth } from '../../contexts/auth';


const addTemplate = async (data, { googleId }) => {
  const template = { ...data, googleId };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template`,
      template
    );

    // variable makes possible manipulation of object returned from response.data
    let newResponse;

    // code converts response.data.starttime to number
    let splitStartTime = response.data.starttime.split(':');
    let joinStartTime = splitStartTime.join('');
    let startTimeAsNumber = parseInt(joinStartTime, 10);

    // code converts response.data.endtime to number
    let splitEndTime = response.data.endtime.split(':');
    let joinEndTime = splitEndTime.join('');
    let endTimeAsNumber = parseInt(joinEndTime, 10);

    // fn for converting response.data.starttime and/or endtime back to time string (from number)
    function convertToTime(value, index) {
      return value.substring(0, index) + ":" + value.substring(index);
    }

    // converts times from 24 hour to 12 hour format
    if (startTimeAsNumber >= 1300) {
      startTimeAsNumber -= 1200;
      let startTimeAsString = startTimeAsNumber.toString();
      console.log(`event start time: ${convertToTime(startTimeAsString, startTimeAsString.length - 2)}`);
      let convertedStartTime = convertToTime(startTimeAsString, startTimeAsString.length - 2);
      newResponse = { ...response.data, starttime: convertedStartTime + 'pm' };
      if (endTimeAsNumber >= 1300) {
        endTimeAsNumber -= 1200;
        let endTimeAsString = endTimeAsNumber.toString();
        let convertedEndTime = convertToTime(endTimeAsString, endTimeAsString.length - 2);
        newResponse = { ...newResponse, endtime: convertedEndTime + 'pm' };
      } else {
        newResponse = { ...newResponse, endtime: newResponse.endtime + 'am' };
      }
    } else if (endTimeAsNumber >= 1300) {
      endTimeAsNumber -= 1200;
      let endTimeAsString = endTimeAsNumber.toString();
      let convertedEndTime = convertToTime(endTimeAsString, endTimeAsString.length - 2);
      newResponse = { ...response.data, starttime: response.data.starttime + 'am', endtime: convertedEndTime + 'pm' };
    } else {
      newResponse = { ...response.data, starttime: response.data.starttime + 'am', endtime: response.data.endtime + 'am' };
    }
    console.log(newResponse);
    return newResponse;
  } catch (error) {
    console.log(error);
  }
};

const CreateTemplateForm = (props) => {
  const { setFormOpen, setTemplateList, currentUser, formOpen } = props;
  const { googleApi, api } = useAuth();
  const { register, handleSubmit } = useForm();

  // Submit for template form
  const onSubmit = async formData => {
    const template = addTemplate(formData, currentUser);
    await setTemplateList(prevTemplates => [...prevTemplates, template]);
    setFormOpen(!formOpen);
  };

  return (

    <div className="Form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="title"
          name="summary"
          ref={register({ maxLength: 80, required: true })}
        />
        <Input
          type="text"
          placeholder="notes"
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

  );
};

export default CreateTemplateForm;
