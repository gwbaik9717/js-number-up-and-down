import readLineAsync from "../utils/readlineAsync";
import ErrorMessage from "../error";

const Input = {
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

  validateUserAnswerRange: (userInput: string) => {
    const splitted = userInput.split(",");

    if (splitted.length !== 2) {
      throw new Error(ErrorMessage.input.WRONG_ANSWER_RANGE);
    }

    const [start, end] = splitted.map((item) => item.trim());

    if (isNaN(Number(start)) || isNaN(Number(end))) {
      throw new Error(ErrorMessage.input.WRONG_ANSWER_RANGE);
    }

    if (start > end) {
      throw new Error(ErrorMessage.input.WRONG_ANSWER_RANGE);
    }
  },

  validateUserRetryCount: (userInput: string) => {
    if (isNaN(Number(userInput))) {
      throw new Error(ErrorMessage.input.WRONG_RETRY_COUNT);
    }

    if (Number(userInput) <= 0) {
      throw new Error(ErrorMessage.input.WRONG_RETRY_COUNT);
    }
  },

  getUserNumber: async (minAllowedNumber: number, maxAllowedNumber: number) => {
    while (true) {
      const userInput = await readLineAsync("숫자 입력:\n");

      try {
        Input.validateUserNumber(userInput, minAllowedNumber, maxAllowedNumber);
        return Number(userInput);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    }
  },

  getUserRestartOption: async () => {
    while (true) {
      const userInput = await readLineAsync(
        "게임을 다시 시작하시겠습니까? (yes/no):"
      );

      try {
        Input.validateUserRestartOption(userInput);

        const normalizedUserInput = userInput.toLowerCase();

        if (normalizedUserInput === "yes") {
          return true;
        }

        return false;
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    }
  },

  getUserAnswerRange: async () => {
    while (true) {
      const userInput = await readLineAsync(
        "[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)"
      );

      try {
        Input.validateUserAnswerRange(userInput);

        const [start, end] = userInput
          .split(",")
          .map((input) => Number(input.trim()));

        return [start, end];
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    }
  },

  getUserRetryCount: async () => {
    while (true) {
      const userInput = await readLineAsync(
        "[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요."
      );

      try {
        Input.validateUserRetryCount(userInput);

        return Number(userInput);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    }
  },
};

export default Input;
