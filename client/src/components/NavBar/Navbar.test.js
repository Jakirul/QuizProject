/**
 * @jest-environment jsdom
 */

 import {default as NavBar} from '.'
 import { render, screen } from '@testing-library/react';
 import '@testing-library/jest-dom'
 import { MemoryRouter } from 'react-router-dom';
 import { Provider } from "react-redux";
 import {store} from "../../redux/store/store.js";

describe("NavBar", () => {
  let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
        render(<Provider store={store}><NavBar /></Provider>, { wrapper: MemoryRouter });
    });

    test('It renders the QuizSelect div', ()=> {
        let div = screen.getByRole('nav')
        expect(div).toBeInTheDocument();
    })

    test("it renders", () => {
      const navigation = screen.getByRole("nav");
      expect(navigation.textContent).toMatch("LogininQUIZitiveHome ");
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
