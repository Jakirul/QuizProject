/**
 * @jest-environment jsdom
 */

 import {default as Navbar} from '.'
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom'
 import { MemoryRouter } from 'react-router-dom';
 import { Provider } from "react-redux";
 import {store} from "../../redux/store/store.js";

describe("NavBar", () => {
  let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><Navbar /></Provider>, { wrapper: MemoryRouter });
    });

    test('It renders the QuizSelect div', ()=> {
        let div = screen.getByRole('nav')
        expect(div).toBeInTheDocument();
    })

    test("it renders", () => {
      render(<NavBar />);
      const navigation = screen.getByRole("navigation");
      expect(navigation.textContent).toMatch(/nav-wrap/i);
  });
});

// describe("NavBar", () => {
//   beforeEach(() => {
//     render(<NavBar />);
//   });

//   test("it renders a nav tag", () => {});
// });

// // describe("NavBar", () => {
// //   test("it renders the navbar", () => {
// //     render(<NavBar />);
// //   });
// //   test("is rendered", () => {});
// // });
