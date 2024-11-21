import { describe, expect, test } from "@jest/globals";
import Game from "../src/domain/Game";
describe("게임 Unit test", () => {
  test("게임을 시작하면 컴퓨터는 1부터 50 사이의 랜덤 숫자를 생성한다.", () => {
    const game = new Game();

    const targetNumber = game.getTargetNumber();
    expect(targetNumber).toBeGreaterThanOrEqual(1);
    expect(targetNumber).toBeLessThanOrEqual(50);
  });
});
