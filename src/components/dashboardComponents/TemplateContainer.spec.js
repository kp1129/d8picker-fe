import React from 'react';
import { shallow} from 'enzyme';
import TemplateContainer from './TemplateContainer'
import ChooseDateForm from './ChooseDateForm'



describe('templates', ()=>{
    it('should render 2 ChooseDateForm components', async ()=>{
      let templates = [
        {
            _id: 5020102021,
            summary: "test template",
            description: "test description",
            starttime: "13:00",
            endtime: "14:00"
        },
        {
            _id: 5020102022,
            summary: "test template2",
            description: "test description2",
            starttime: "13:05",
            endtime: "14:05"
        }
      ]
  
      const wrapper = shallow(<TemplateContainer templateList={templates}/>);
      
      let chooseDates = wrapper.find(ChooseDateForm);
      expect(chooseDates).toHaveLength(2);
    })
  })