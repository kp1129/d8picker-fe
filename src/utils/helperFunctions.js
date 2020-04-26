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