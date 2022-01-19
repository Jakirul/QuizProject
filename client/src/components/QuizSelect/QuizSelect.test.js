import {default as QuizSelect} from '.'
import { render, screen } from '@testing-library/react';

describe('QuizSelect', () => {
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<QuizSelect />);
    });

    test('It renders the QuizSelect div', ()=> {
        let div=screen.getByRole('outerDiv')
        expect(div).toBeInDocument();
    })



})