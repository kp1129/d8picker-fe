import React from 'react'
import { shallow} from 'enzyme';
import ProfileInfo from './ProfileInfo'
import {Button} from '@chakra-ui/core';

var auth = require('../../contexts/auth');
auth.useAuth = jest.fn(
  () => {
    console.log("*** Mock useAuth **")

    return { googleApi: {
        currentUser: {photoUrl: 'myphoto'},
        handleSignOut: jest.fn()
    } }
  });


describe('profileinfo', ()=>{
    it('should call useAuth once on load', ()=>{
        const wrapper = shallow(<ProfileInfo setUserState={jest.fn()}/>)
        let button = wrapper.find(Button)
        expect(auth.useAuth.mock.calls.length).toEqual(1);
    })


    it('should call useAuth twice when button clicked', ()=>{
        const wrapper = shallow(<ProfileInfo setUserState={jest.fn()}/>)
        let button = wrapper.find(Button)
        button.simulate('click');
        expect(auth.useAuth.mock.calls.length).toEqual(2);
    })
})
