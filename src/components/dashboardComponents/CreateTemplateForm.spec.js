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


})


