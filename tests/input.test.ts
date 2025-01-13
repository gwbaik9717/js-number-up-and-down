import { describe, expect, test } from "@jest/globals";
import { Input } from "../src/domain/Input";
import ErrorMessage from "../src/error";

describe("Input Unit test", () => {
  test.each([
    { userInput: "1" },
    { userInput: "YE" },
    { userInput: "" },
    { userInput: "nope" },
  ])(
    "재시도 여부에 'yes' or 'no' 이외의 값이 입력되면 에러 메시지를 출력한다.",
    ({ userInput }) => {
      expect(() => {
        Input.validateUserRestartOption(userInput);
      }).toThrow(ErrorMessage.input.WRONG_RETRY_OPTION);
    }
  );

  test.each([
    { input: ["10", "1"] },
    { input: ["a", null] },
    { input: ["1", "a2"] },
  ])(
    "잘못된 양식으로 최소 값, 최대 값을 입력하면, 에러메시지를 출력한다.",
    ({ input }) => {
      expect(() => {
        Input.validateUserAnswerRange(input[0], input[1]);
      }).toThrow(ErrorMessage.input.WRONG_ANSWER_RANGE);
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
});
