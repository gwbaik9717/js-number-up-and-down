import { describe, expect, test, jest } from "@jest/globals";
import Output from "../src/Output";
import { MAX_RETRIES } from "../src/constants";

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

    Output.printHistory(history);
    expect(consoleSpy).toHaveBeenCalledWith("이전 추측: 1, 2, 3, 4");
    consoleSpy.mockRestore();
  });

  test("사용자가 입력한 숫자가 정답과 같으면 '정답!' 과 몇 회만에 맞췄는지 출력한다.", () => {
    const count = 5;
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    Output.printSuccessMessage(count);
    expect(consoleSpy).toHaveBeenCalledWith("정답!");
    expect(consoleSpy).toHaveBeenCalledWith(
      `축하합니다! ${count}번 만에 숫자를 맞추셨습니다.`
    );
    consoleSpy.mockRestore();
  });

  test(`${MAX_RETRIES}회 이내에 맞추지 못하면 '${MAX_RETRIES}회 초과! 숫자를 맞추지 못했습니다. (정답: 00)'를 출력한다.`, () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const answer = 1;

    Output.printExceedRetriesCountMessgae(answer);
    expect(consoleSpy).toHaveBeenCalledWith(
      `${MAX_RETRIES}회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`
    );
    consoleSpy.mockRestore();
  });
});
