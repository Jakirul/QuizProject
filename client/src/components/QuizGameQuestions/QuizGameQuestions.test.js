import {default as QuizGameQuestions} from '.'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";

describe('QuizGameQuestions', () => {
    const questions = ["test"]
    // const realUseState = React.useState
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><QuizGameQuestions options={questions}/></Provider>, { wrapper: MemoryRouter })

        // const stubInitialState = "test"

        // // Mock useState before rendering your component
        // jest
        // .spyOn(React, 'useState')
        // .mockImplementationOnce(() => setSelectedOption(stubInitialState))
            });

    test("QuizGameQuestions", () => {
        let QuizGameQuestions = screen.getByRole("QuizGameQuestions");
        expect(QuizGameQuestions).toBeInTheDocument()
    })

    // test('QuizGameQuestions', ()=> {
    //     let btn = screen.getByRole('btn')
    //     userEvent.click(btn)
    //     expect(btn).toBeInTheDocument();
    // })


})
