/**
 * @jest-environment jsdom
 */


import {default as JoinQuiz} from '.'

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import {shallow, configure,mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";
global.fetch = require("jest-fetch-mock");

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('JoinQuiz', () => {

    const handle = jest.fn()
    configure({ adapter: new Adapter() });
    beforeEach(() => {
        render(<Provider store={store}><JoinQuiz onSubmit={handle()}/></Provider>, { wrapper: MemoryRouter });
    });

    test("JoinQuiz", () => {
        let join = screen.getByRole("join");
        expect(join).toBeInTheDocument()
    })

    test("expect join quiz to be defined", async () => {

        expect(shallow(
            <BrowserRouter>
              <JoinQuiz />
            </BrowserRouter>
          ).length).toEqual(1);


    })

    test("submit form", async () => {
        let join = screen.getByRole("go");
        userEvent.click(join)
        expect(join).toBeInTheDocument()
    })

   

})
