/**
 * @jest-environment jsdom
 */
import { default as QuizResults } from "../QuizResults";
import { screen, render } from "@testing-library/react";

describe("Results", () => {
  test("it renders a title", () => {
    render(<QuizResults />);
    const heading = screen.getByRole("heading");
    expect(heading.textContent).toContain("Game Scores:");
  });
});
