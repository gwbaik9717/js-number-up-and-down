import { describe, expect, test, jest } from "@jest/globals";
import Game from "../src/domain/Game";
import { MAX_ALLOWED_NUMBER, MAX_RETRIES } from "../src/constants";
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

  test(`사용자는 최대 ${MAX_RETRIES}번까지 정답을 맞출 수 있다.`, () => {
    const game = new Game();
    const userInputs = Array.from({ length: MAX_RETRIES }, (_, i) => i + 1);

    for (let i = 0; i < MAX_RETRIES; i++) {
      const userInput = userInputs[i];
      game.addToHistory(userInput);
    }

    const history = game.getHistory();

    expect(history.length).toBe(MAX_RETRIES);
  });

  test("사용자가 5번 초과 시도를 할 경우 에러가 발생한다.", () => {
    const game = new Game();
    const overflowedRetries = MAX_RETRIES + 1;
    const userInputs = Array.from(
      { length: overflowedRetries },
      (_, i) => i + 1
    );

    const startGame = () => {
      for (let i = 0; i < overflowedRetries; i++) {
        const userInput = userInputs[i];
        game.addToHistory(userInput);
      }
    };

    expect(startGame).toThrow(`최대 시도 횟수는 ${MAX_RETRIES}번 입니다.`);
  });
});
