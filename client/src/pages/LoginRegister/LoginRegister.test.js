import {default as LoginRegister} from '.'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";

describe('LoginRegister', () => {
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><LoginRegister /></Provider>, { wrapper: MemoryRouter });
    });

    test("LoginRegister", () => {
        let logreg = screen.getByRole("login-register");
        expect(logreg).toBeInTheDocument()
    })

    test("simulate button click", () => {
        let btn = screen.getByRole("btn");
        // setRegisterForm
        userEvent.click(btn)
        expect(btn).toBeInTheDocument()
    })


})
