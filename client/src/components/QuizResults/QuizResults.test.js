import { default as QuizResults } from ".";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { store } from "../../redux/store/store.js";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

describe("Results", () => {
  let mockFunction;
  beforeEach(() => {
    mockFunction = jest.fn();
    render(
      <Provider store={store}>
        <QuizResults />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });
  test("it renders a title", () => {
    const heading = screen.getByRole("header");
    expect(heading.textContent).toContain("Games Scores:");
  });
});
