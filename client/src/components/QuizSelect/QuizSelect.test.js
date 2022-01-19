import {default as QuizSelect} from '.'
import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";

describe('QuizSelect', () => {
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><QuizSelect /></Provider>, { wrapper: MemoryRouter });
    });

    test('It renders the QuizSelect div', ()=> {
        let div = screen.getByRole('outerDiv')
        expect(div).toBeInTheDocument();
    })

    test("contains form", () => {
        let form = screen.getByRole("set-game");
        fireEvent.submit(form, {preventDefault: jest.fn(), target: {categoryId: "1", difficulty: "easy", range: "25"}})

        expect(form).toBeInTheDocument()
    })




})