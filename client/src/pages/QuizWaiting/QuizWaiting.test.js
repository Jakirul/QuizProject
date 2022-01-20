/**
 * @jest-environment jsdom
 */
import { default as QuizWaiting } from ".";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store/store.js";

describe("QuizWaiting", () => {
  let mockFunction;
  beforeEach(() => {
    mockFunction = jest.fn();
    render(
      <Provider store={store}>
        <QuizWaiting />
      </Provider>,
      { wrapper: MemoryRouter }
    );
  });

  test("QuizWaiting", () => {
    let waiting = screen.getByRole("waiting");
    expect(waiting).toBeInTheDocument();
  });

  test("sendMessage", () => {
    let waiting = screen.getByRole("sendMessage");
    fireEvent.submit(waiting, {
      preventDefault: jest.fn(),
      target: { message: "test" },
    });
    expect(waiting).toBeInTheDocument();
  });
});
