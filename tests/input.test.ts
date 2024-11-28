import { describe, expect, test, jest } from "@jest/globals";
import Input from "../src/Input";

describe("Input Unit test", () => {
  test("사용자의 입력값이 숫자가 아니라면 '숫자를 입력해주세요' 에러 메시지를 출력하고, 다른 입력을 받는다.", async () => {
    const mockReadLineAsync = jest
      .fn()
      .mockReturnValueOnce("가") // Invalid input
      .mockReturnValueOnce("abc") // Invalid input
      .mockReturnValueOnce("1");

    jest.mock("../src/utils/readLineAsync", () => ({
      readLineAsync: mockReadLineAsync,
    }));

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    Input.getUserInput().then((value) => {
      expect(mockReadLineAsync).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledWith("숫자를 입력해주세요.");
      expect(value).toBe(1);

      consoleSpy.mockRestore();
    });
  });
});
