import React from 'react';

import { render } from '@testing-library/react';

import Register from '../components/Splash/RegisterModal';


describe ('Register Modal', () => {
	it('does not show the password', () => {
       
		const { getByLabelText } = render(<Register />);

		const password = getByLabelText('password');
		expect(password.type).toMatch(password);
	});
});
