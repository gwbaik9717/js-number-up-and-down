import { describe, expect, test, jest } from "@jest/globals";
import Game from "../src/domain/Game";
describe("게임 Unit test", () => {
  test("게임을 시작하면 컴퓨터는 1부터 50 사이의 랜덤 숫자를 생성한다.", () => {
    const game = new Game();

    const answer = game.getAnswer();
    expect(answer).toBeGreaterThanOrEqual(1);
    expect(answer).toBeLessThanOrEqual(50);
  });

  test.each([
    { answer: 1, userInput: 2, expected: -1 },
    { answer: 1, userInput: 1, expected: 0 },
    { answer: 2, userInput: 1, expected: 1 },
  ])(
    "사용자가 입력한 숫자($userInput)와 정답($answer)을 비교하면 $expected를 반환해야 한다.",
    ({ answer, userInput, expected }) => {
      const mockGenerateAnswer = jest
        .spyOn(Game.prototype, "generateAnswer")
        .mockReturnValue(answer);

      const game = new Game();

      expect(mockGenerateAnswer).toHaveBeenCalled();
      expect(game.getAnswer()).toBe(answer);

      const diff = game.getDiffAnswer(userInput);
      expect(diff).toBe(expected);

      mockGenerateAnswer.mockRestore();
    }
  );

  test("사용자가 입력한 숫자는 History에 저장되어야 한다.", () => {
    const userInputs = [1, 2, 3, 4, 5];

    const game = new Game();

    for (const userInput of userInputs) {
      game.addToHistory(userInput);
    }

    const history = game.getHistory();
    expect(history).toEqual(userInputs);
  });
});
