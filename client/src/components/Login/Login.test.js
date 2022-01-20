import {default as Login} from '.'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";

describe('Login', () => {
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><Login /></Provider>, { wrapper: MemoryRouter });
    });

    test('It renders the QuizSelect div', ()=> {
        let login = screen.getByRole('login')
        expect(login).toBeInTheDocument();
    })

    test('It renders the QuizSelect div', ()=> {
        let login = screen.getByRole('login')
        fireEvent.submit(login, {target: {username: "test", password: "test"}})
        expect(login).toBeInTheDocument();
    })

    





})