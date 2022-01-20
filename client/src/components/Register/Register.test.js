import {default as Register} from '.'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
// import Adapter from 'enzyme-adapter-react-16';
// import { shallow, configure } from 'enzyme';

// configure({adapter: new Adapter()});
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";

describe('Register', () => {
    let mockFunction;
    let renderRegister;
    const testValues = {
        email: 'test@gmail.com',
        username: 'test',
        password: 'test',
        handleSubmit: jest.fn(),
    };


    beforeEach(() => {
        mockFunction = jest.fn();
        renderRegister = render(<Provider store={store}><Register /></Provider>, { wrapper: MemoryRouter });
    });

    test("Register", () => {
        let register = screen.getByRole("register");
        expect(register).toBeInTheDocument()
    })

    test("form", () => {
        let register = screen.getByRole("register");
        fireEvent.submit(register, {preventDefault: jest.fn(), target: {username: "test", email: "test@test.com", password: "test"}})
        expect(register).toBeInTheDocument();
    })




})
