import {default as QuizResults} from '.'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";

describe('QuizResults', () => {
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><QuizResults /></Provider>, { wrapper: MemoryRouter });
    });

    test("QuizResults", () => {
        let score = screen.getByRole("score");
        expect(score).toBeInTheDocument()
    })


})
