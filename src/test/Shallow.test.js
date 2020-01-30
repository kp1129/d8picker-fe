import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow';

import Login from '../components/Splash/LoginBar'

let realUseContext;
let useContextMock;
// Setup mock
beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
});
// Cleanup mock
afterEach(() => {
    React.useContext = realUseContext;
});

test.skip("mock hook", () => {
    useContextMock.mockReturnValue("Test Value");
    const element = new ShallowRenderer().render(
        <Login />
    );
    expect(element.props.children).toBe('Test Value');
});