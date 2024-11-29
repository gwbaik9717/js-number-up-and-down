import { describe, expect, test, jest } from "@jest/globals";
import Output from "../src/Output";

describe("Output Unit test", () => {
  test.each([
    { diff: -1, answer: "다운" },
    { diff: 0, answer: "정답!" },
    { diff: 1, answer: "업" },
  ])(
    "대소 관계에 따라 콘솔에 '업', '다운', '정답!' 중 하나를 출력한다.",
    ({ diff, answer }) => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      Output.printDiffMessage(diff);
      expect(consoleSpy).toHaveBeenCalledWith(answer);
      consoleSpy.mockRestore();
    }
  );

  test("사용자가 지금까지 입력한 모든 추측들을 등록된 순으로 나열하여 보여준다.", () => {
    const history = [1, 2, 3, 4];
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    Output.showHistory(history);
    expect(consoleSpy).toHaveBeenCalledWith("이전 추측: 1, 2, 3, 4");
    consoleSpy.mockRestore();
  });
});
