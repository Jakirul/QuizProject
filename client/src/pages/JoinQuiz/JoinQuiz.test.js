/**
 * @jest-environment jsdom
 */
import { default as JoinQuiz } from "../JoinQuiz";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("JoinQuiz", () => {
  beforeEach(() => {
    render(<JoinQuiz />);
  });
  test("it renders a form", () => {
    let form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
});
