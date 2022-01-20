import {default as Leaderboard} from '.'
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {store} from "../../redux/store/store.js";

describe('Home', () => {
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><Leaderboard /></Provider>, { wrapper: MemoryRouter });
    });

    test('it renders the title', () => {
        const heading = screen.getByRole('header')
        expect(heading.textContent).toContain('Leaderboard');
    });

    test("Leaderboard", () => {
        let leaderboard = screen.getByRole("leaderboard");
        expect(leaderboard).toBeInTheDocument()
    })
    
    
    test("clicking ascending",  () => {
        let ascending = screen.getByRole("Ascending");
        const handleClick = jest.fn();
        render(
        <button onClick={handleClick()} type="button">Sort by Ascending</button>
        );

        userEvent.click(ascending)

        expect(handleClick).toHaveBeenCalledTimes(1);
    })

    test("clicking descending", () => {
        let descending = screen.getByRole("Descending");
        const handleClick =  { target: {textContent: "Sort by Descending"}}
        const handle = { preventDefault: jest.fn()}
        
        render(
        <button onClick={() => handle(handleClick)} type="button">Sort by Descending</button>
        );


        expect(handleClick).toBeDefined()
    })


})
