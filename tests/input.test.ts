import { describe, expect, test, jest } from "@jest/globals";
import Input from "../src/domain/Input";
import ErrorMessage from "../src/error";

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

    Input.getUserNumber().then((value) => {
      expect(mockReadLineAsync).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledWith(
        ErrorMessage.input.WRONG_INPUT_TYPE
      );
      expect(value).toBe(1);

      consoleSpy.mockRestore();
    });
  });

  test("사용자가 1부터 50 사이의 숫자를 입력하지 않으면 '1부터 50 사이의 숫자를 입력해주세요'를 출력하고, 다른 입력을 받는다.", async () => {
    const mockReadLineAsync = jest
      .fn()
      .mockReturnValueOnce("0") // Invalid input
      .mockReturnValueOnce("-1") // Invalid input
      .mockReturnValueOnce("1");

    jest.mock("../src/utils/readLineAsync", () => ({
      readLineAsync: mockReadLineAsync,
    }));

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    Input.getUserNumber().then((value) => {
      expect(mockReadLineAsync).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledWith(
        ErrorMessage.input.WRONG_INPUT_RANGE
      );
      expect(value).toBe(1);

      consoleSpy.mockRestore();
    });
  });

  test.each([
    { userInput: "yes", expected: true },
    { userInput: "YES", expected: true },
    { userInput: "no", expected: false },
    { userInput: "NO", expected: false },
  ])(
    "게임이 종료되면 사용자에게 다시 게임을 할 것인지 물어보고, 'yes' 또는 'no'로 대답을 Input 으로 받는다.",
    async ({ userInput, expected }) => {
      const mockReadLineAsync = jest.fn().mockReturnValueOnce(userInput);
      jest.mock("../src/utils/readLineAsync", () => ({
        readLineAsync: mockReadLineAsync,
      }));
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      Input.getUserRetryOption().then((value) => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "게임을 다시 시작하시겠습니까? (yes/no):"
        );
        expect(value).toBe(expected);
      });
      consoleSpy.mockRestore();
    }
  );

  test.each([
    { userInput: "1" },
    { userInput: "YE" },
    { userInput: "" },
    { userInput: "nope" },
  ])(
    "재시도 여부에 'yes' or 'no' 이외의 값이 입력되면 에러 메시지를 출력한다.",
    async ({ userInput }) => {
      expect(() => {
        Input.validateUserRetryOption(userInput);
      }).toThrow(ErrorMessage.input.WRONG_RETRY_OPTION);
    }
  );
});
