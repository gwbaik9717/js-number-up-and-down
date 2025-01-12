import ErrorMessage from "../error";

export const Input = {
  validateUserNumber: (
    userInput: string,
    minAllowedNumber: number,
    maxAllowedNumber: number
  ) => {
    const numerifiedUserInput = Number(userInput);

    if (isNaN(numerifiedUserInput)) {
      throw new Error(ErrorMessage.input.WRONG_INPUT_TYPE);
    }

    if (
      numerifiedUserInput < minAllowedNumber ||
      numerifiedUserInput > maxAllowedNumber
    ) {
      throw new Error(ErrorMessage.input.WRONG_INPUT_RANGE);
    }
  },

  validateUserRestartOption: (userInput: string) => {
    const normalizedUserInput = userInput.toLowerCase();
    const allowedUserInputs = ["yes", "no"];

    if (!allowedUserInputs.includes(normalizedUserInput)) {
      throw new Error(ErrorMessage.input.WRONG_RETRY_OPTION);
    }
  },

  validateUserAnswerRange: (
    minAnswerRange: number | string | null,
    maxAnswerRange: number | string | null
  ) => {
    if (minAnswerRange === null || minAnswerRange === "") {
      if (isNaN(Number(maxAnswerRange))) {
        throw new Error(ErrorMessage.input.WRONG_ANSWER_RANGE);
      }
      return;
    }

    if (maxAnswerRange === null || maxAnswerRange === "") {
      if (isNaN(Number(minAnswerRange))) {
        throw new Error(ErrorMessage.input.WRONG_ANSWER_RANGE);
      }
      return;
    }

    if (isNaN(Number(minAnswerRange)) || isNaN(Number(maxAnswerRange))) {
      throw new Error(ErrorMessage.input.WRONG_ANSWER_RANGE);
    }

    if (Number(minAnswerRange) > Number(maxAnswerRange)) {
      throw new Error(ErrorMessage.input.WRONG_ANSWER_RANGE);
    }
  },

  validateUserRetryCount: (userInput: string) => {
    if (userInput === "") {
      return;
    }

    if (isNaN(Number(userInput))) {
      throw new Error(ErrorMessage.input.WRONG_RETRY_COUNT);
    }

    if (Number(userInput) <= 0) {
      throw new Error(ErrorMessage.input.WRONG_RETRY_COUNT);
    }
  },
};
