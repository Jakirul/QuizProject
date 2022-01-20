import {default as Navbar} from '.'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";

describe('Navbar', () => {
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><Navbar /></Provider>, { wrapper: MemoryRouter });
    });

    test('It renders the QuizSelect div', ()=> {
        let div = screen.getByRole('nav')
        expect(div).toBeInTheDocument();
    })

    





})