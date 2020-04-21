import React from 'react'
import { shallow} from 'enzyme';
import {Button, Input} from '@chakra-ui/core';
import CreateTemplateForm from './CreateTemplateForm'

var auth = require('../../contexts/auth');
auth.useAuth = jest.fn(
  () => {
    console.log("*** Mock useAuth **")

    return { googleApi: {
        currentUser: {photoUrl: 'myphoto'},
        handleSignOut: jest.fn()
    } }
  });


describe('CreateTemplateForm', ()=>{

    it('should call useAuth when button clicked', ()=>{
        const wrapper = shallow(<CreateTemplateForm />)
        let button = wrapper.find(Button)
        button.simulate('click');
        expect(auth.useAuth.mock.calls.length).toEqual(1);
    })

    // it('should not submit form', ()=>{
    //     const wrapper = shallow(<CreateTemplateForm formOpen={false}/>)
    //     let summary = wrapper.find('#summary');
    //     let description = wrapper.find('#description');
    //     let starttime = wrapper.find('#starttime');
    //     let endtime = wrapper.find('#endtime');

    //     summary.simulate('change', { target: { value: 'a' } })
    //     description.simulate('change', { target: { value: '' } })
    //     starttime.simulate('change', { target: { value: '13:00' } })
    //     endtime.simulate('change', { target: { value: '13:05' } })

    //     let button = wrapper.find(Button)
    //     button.simulate('click');

        
        
    // })
})


