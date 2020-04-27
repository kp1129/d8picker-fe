import axios from 'axios';

export const convertTime = (time)=>{
    // code converts response.data.starttime to number

    
    if (time){

        let splitStartTime = time.split(':');
        let joinStartTime = splitStartTime.join('');
        let startTimeAsNumber = parseInt(joinStartTime, 10);
    
        // fn for converting response.data.starttime and/or endtime back to time string (from number)
        function convertToTime(value, index) {
          return value.substring(0, index) + ":" + value.substring(index);
        }
    
        // converts times from 24 hour to 12 hour format
        if (startTimeAsNumber >= 1300) {
          startTimeAsNumber -= 1200;
          let startTimeAsString = startTimeAsNumber.toString();
          let convertedStartTime = convertToTime(startTimeAsString, startTimeAsString.length - 2);
          return convertedStartTime + 'pm';
        } else {
          return time + 'am';
        }
    }
}

export const addTemplate = async (data, { googleId }) => {
  const template = { ...data, googleId };
  try {
    console.log('data', data)
    console.log('googleId', googleId)
    console.log('template', template)
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template`,
      template
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};


export const convertEvents = (selected, starttime, endtime, zone, summary, description) => {
  return selected.map(e => ({
    end: { dateTime: `${e}T${endtime}:00${zone}:00` },
    start: { dateTime: `${e}T${starttime}:00${zone}:00` },
    summary: summary,
    description: description
  }));
}

export const deleteTemplate = async id => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error); 
  }
};

export const handleDelete = async (id, deleteTemplate, templateList, setTemplateList, clearSelected, setTemplateFormOpen) => {
  await deleteTemplate(id);
  const templates = templateList.filter(template => template._id !== id);
  setTemplateList(templates);
  clearSelected();
  setTemplateFormOpen(false);
};

