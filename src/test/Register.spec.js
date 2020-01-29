import React from 'react';

import { render } from '@testing-library/react';

import Register from '../components/Splash/RegisterModal';


describe('Register Modal', () => {
	it('does not show the password', () => {
       
		const { getByPlaceholderText } = render(<Register />);

		const password = getByPlaceholderText('password');
		expect(password.type).toMatch(password);
	});
});
