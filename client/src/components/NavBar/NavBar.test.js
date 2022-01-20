/**
 * @jest-environment jsdom
 */

import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { default as NavBar } from "../NavBar";

describe("NavBar", () => {
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
