import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const AddContactForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Tag>Name</Tag>
      <NameDiv>
        <Label htmlFor="fn">First Name</Label>
        <Input
          id="fn"
          type="text"
          placeholder="First name"
          name="fn"
          ref={register({ required: true, maxLength: 80 })}
        />
        <Label htmlFor="ln">First Name</Label>
        <Input
          id="ln"
          type="text"
          placeholder="Last name"
          name="ln"
          ref={register({ required: true, maxLength: 100 })}
        />
      </NameDiv>
      <Tag>Phone number</Tag>
      <Label htmlFor="phoneNumber">First Name</Label>
      <Input
        type="tel"
        placeholder="Phone number"
        name="phoneNumber"
        id="phoneNumber"
        ref={register({ required: true, maxLength: 12 })}
      />
      <Tag>Email</Tag>
      <Label htmlFor="email">First Name</Label>
      <Input
        type="text"
        placeholder="Email"
        name="email"
        id="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <Tag>Group</Tag>
      <Label htmlFor="group">First Name</Label>
      <select name="group" id="group" ref={register({ required: true })}>
        <option value="Group1">Group1</option>
        <option value="Group2">Group2</option>
      </select>
      <ButtonDiv>
        <CancelBtn>Cancel</CancelBtn>
        <SaveBtn>Save</SaveBtn>
      </ButtonDiv>
    </Form>
  );
};

// styled components
const size = {
  tablet: '768px',
  desktop: '1024px'
};
const device = {
  desktop: `(min-width: ${size.desktop})`
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;

  #fn,
  #ln {
    width: 45%;
  }
`;

const Tag = styled.p`
  font-size: 1.15rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const NameDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  border-bottom: 1px solid gray;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 5%;
`;

const SaveBtn = styled.div`
  width: 48%;
  background: #28807d;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 1.15rem;
  padding: 2%;
  margin: 2%; auto;
  border: 2px solid #28807d;
  border-radius: 5rem;
  &:hover {
    cursor: pointer;
  }
  @media ${device.desktop} {
    width: 30%; 
    padding: 2%;
    margin: 0;
    }
`;

const CancelBtn = styled.div`
  width: 48%;
  color: #28807d;
  background: white;
  text-align: center;
  font-weight: bold;
  font-size: 1.15rem;
  padding: 2%;
  margin: 2% auto;
  border: 1px solid #28807d;
  border-radius: 5rem;
  &:hover {
    cursor: pointer;
  }
  @media ${device.desktop} {
    width: 30%;
    padding: 2%;
    margin: 0;
  }
`;

// the code below makes the labels invisible
// so that they're hidden visually but
// still available to screen readers
const Label = styled.label`
    border: 0;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip; rect(1px, 1px, 1px, 1px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

export default AddContactForm;
