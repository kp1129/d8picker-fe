import React from 'react';
import { useForm } from 'react-hook-form';

// INSERT INTO CREATE_EVENT_MODAL

export default function AddEventForm() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <input type="date" placeholder="Start Date" name="Start Date" ref={register({required: true, maxLength: 80})} />
    <input type="time" placeholder="Start Time" name="Start Time" ref={register({required: true, maxLength: 80})} />
    <input type="date" placeholder="End Date" name="End Date" ref={register({required: true, maxLength: 80})} />
    <input type="time" placeholder="End Time" name="End Time" ref={register({required: true, maxLength: 80})} />
    <input type="text" placeholder="Summary" name="Summary" ref={register} />
    <textarea name="Description" ref={register} />

      <input type="submit" />
    </form>
  );
}