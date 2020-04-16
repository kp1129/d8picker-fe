import React from 'react';
import { shallow, mount} from 'enzyme';
import {Button, Input} from '@chakra-ui/core';
import TemplateContainer from './TemplateContainer'
import ChooseDateForm from './ChooseDateForm'
import CreateTemplateForm from './CreateTemplateForm.js'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import theme from '../../utils/theme';

var auth = require('../../contexts/auth');
auth.useAuth = jest.fn(
  () => {
    console.log("*** Mock useAuth **")

    return { googleApi: {
        currentUser: {photoUrl: 'myphoto'},
        handleSignOut: jest.fn()
    } }
  });

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



    // it('should render not sure yet', async ()=>{
    //   const wrapper = shallow(<TemplateContainer formOpen={true}/>);
      
    //   let childTemplateForm = wrapper.find(CreateTemplateForm);
    //   // console.log('form', templateForm.debug())
    //   // expect(templateForm).toHaveLength(1);


    //   const templateForm = shallow(<CreateTemplateForm />)
    //     let summary = templateForm.find('#summary');
    //     let description = templateForm.find('#description');
    //     let starttime = templateForm.find('#starttime');
    //     let endtime = templateForm.find('#endtime');

    //     summary.simulate('change', { target: { value: 'a' } })
    //     description.simulate('change', { target: { value: '' } })
    //     starttime.simulate('change', { target: { value: '13:00' } })
    //     endtime.simulate('change', { target: { value: '13:05' } })

    //     let button = templateForm.find(Button)
    //     button.simulate('click');
        
    //     console.log('childTemplateForm', childTemplateForm.debug())



    // })

    it('should do something', ()=>{
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <CSSReset />
          <ColorModeProvider>
            <TemplateContainer formOpen={true} setFormOpen={jest.fn((formOpen)=>{!formOpen})}/>
          </ColorModeProvider>
        </ThemeProvider>
      )


      let tempCon = wrapper.find(TemplateContainer);
      // console.log('props', tempCon.props())
      let button = tempCon.find('#createEventChain');
      console.log('button', button.debug())
      // console.log(button.text())
      // button.simulate('click');
      // console.log('props', tempCon.props())
      // console.log('form should be open', tempCon.children().debug())


    })



})