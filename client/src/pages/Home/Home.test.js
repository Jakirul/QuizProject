import {default as Home} from '.'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";

describe('Home', () => {
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><Home /></Provider>, { wrapper: MemoryRouter });
    });

    test("Home", () => {
        let home = screen.getByRole("home");
        expect(home).toBeInTheDocument()
    })


})
