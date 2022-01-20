import {default as QuizPage} from '.'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";

describe('QuizPage', () => {
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><QuizPage /></Provider>, { wrapper: MemoryRouter });
    });

    test("QuizPage", () => {
        let quizpage = screen.getByRole("quizpage");
        expect(quizpage).toBeInTheDocument()
    })


})
