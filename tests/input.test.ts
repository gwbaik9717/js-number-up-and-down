import { describe, expect, test } from "@jest/globals";
import { Input } from "../src/domain/Input";
import ErrorMessage from "../src/error";

describe("Input Unit test", () => {
  test.each([
    {
      input: ["10", "1"],
      message: ErrorMessage.input.WRONG_ANSWER_RANGE_MIN_GREATER,
    },
    { input: ["1", "a2"], message: ErrorMessage.input.WRONG_ANSWER_RANGE_NAN },
  ])(
    "잘못된 양식으로 최소 값, 최대 값을 입력하면, 에러메시지를 출력한다.",
    ({ input, message }) => {
      expect(() => {
        Input.validateUserAnswerRange(input[0], input[1]);
      }).toThrow(message);
    }
  );

  test.each([{ userInput: "0" }, { userInput: "-1" }, { userInput: "a" }])(
    "잘못된 양식으로 진행 가능 횟수를 입력하면, 에러메시지를 출력한다.",
    ({ userInput }) => {
      expect(() => {
        Input.validateUserRetryCount(userInput);
      }).toThrow(ErrorMessage.input.WRONG_RETRY_COUNT);
    }
  );

  test.each([
    { input: ["1", "10"] },
    { input: ["5", "50"] },
    { input: ["5", ""] },
    { input: ["", "5"] },
    { input: ["5", null] },
    { input: [null, "5"] },
  ])(
    "올바른 양식으로 최소 값, 최대 값을 입력하면 에러가 발생하지 않는다.",
    ({ input }) => {
      expect(() => {
        Input.validateUserAnswerRange(input[0], input[1]);
      }).not.toThrow();
    }
  );

  test.each([{ userInput: "1" }, { userInput: "5" }, { userInput: "10" }])(
    "올바른 양식으로 진행 가능 횟수를 입력하면 에러가 발생하지 않는다.",
    ({ userInput }) => {
      expect(() => {
        Input.validateUserRetryCount(userInput);
      }).not.toThrow();
    }
  );
});
