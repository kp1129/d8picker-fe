import React from 'react';
// import ReactDOM from 'react-dom';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Register from '../components/Splash/RegisterModal';

// import { Modal } from '@material-ui/core';

afterEach(cleanup)

describe('Register Modal', () => {
	
	it.skip('does not show the password', () => {
		const { getByTestId } = render(<Register />);

		const password = getByTestId("registerPassword");
		expect(password.type).toMatch(password);
	});

	it('displays the register from when clicked', () => {
		
		const { getByTestId } = render(<Register />)
		const modal = getByTestId("DeAndre")
		const modalBtn = getByTestId("regModalBtn")
		fireEvent.click(modalBtn)
		expect(modal.open).toBe(true)
	})
});


// it('renders without crashing', () => {
// 	const div = document.createElement('div');
// 	ReactDOM.render(<Modal open={open} onClose={handleClose}></Modal>, div);
