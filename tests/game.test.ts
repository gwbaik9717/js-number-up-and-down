import { describe, expect, test, jest } from "@jest/globals";
import { Game } from "../src/domain/Game";
import ErrorMessage from "../src/error";

const MIN_ALLOWED_NUMBER = 1;
const MAX_ALLOWED_NUMBER = 50;
const MAX_RETRIES = 5;
describe("게임 Unit test", () => {
  test("게임을 시작하면 컴퓨터는 주어진 범위 안에서 랜덤 숫자를 생성한다.", () => {
    const game = new Game(MIN_ALLOWED_NUMBER, MAX_ALLOWED_NUMBER, MAX_RETRIES);

    const answer = game.answer;
    expect(answer).toBeGreaterThanOrEqual(MIN_ALLOWED_NUMBER);
    expect(answer).toBeLessThanOrEqual(MAX_ALLOWED_NUMBER);
  });

  test("사용자가 입력한 숫자는 History에 저장되어야 한다.", () => {
    const userInputs = [1, 2, 3, 4, 5];

    const game = new Game(MIN_ALLOWED_NUMBER, MAX_ALLOWED_NUMBER, MAX_RETRIES);

    for (const userInput of userInputs) {
      game.addToHistory(userInput);
    }

    const history = game.history;
    expect(history).toEqual(userInputs);
  });

  test(`사용자는 최대 ${MAX_RETRIES}번까지 정답을 맞출 수 있다.`, () => {
    const game = new Game(MIN_ALLOWED_NUMBER, MAX_ALLOWED_NUMBER, MAX_RETRIES);
    const userInputs = Array.from({ length: MAX_RETRIES }, (_, i) => i + 1);

    for (let i = 0; i < MAX_RETRIES; i++) {
      const userInput = userInputs[i];
      game.addToHistory(userInput);
    }

    const history = game.history;

    expect(history.length).toBe(MAX_RETRIES);
  });

  test("사용자가 정한 재시도 횟수를 초과할 경우 에러가 발생한다.", () => {
    const game = new Game(MIN_ALLOWED_NUMBER, MAX_ALLOWED_NUMBER, MAX_RETRIES);
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

    expect(startGame).toThrow(ErrorMessage.game.EXCEED_MAX_RETRIES);
  });
});
