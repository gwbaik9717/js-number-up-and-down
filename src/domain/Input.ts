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

  validateUserAnswerRange: (
    minAnswerRange: number | string | null,
    maxAnswerRange: number | string | null
  ) => {
    if (isNaN(Number(minAnswerRange)) || isNaN(Number(maxAnswerRange))) {
      throw new Error(ErrorMessage.input.WRONG_ANSWER_RANGE_NAN);
    }

    if (Number(minAnswerRange) > Number(maxAnswerRange)) {
      throw new Error(ErrorMessage.input.WRONG_ANSWER_RANGE_MIN_GREATER);
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
