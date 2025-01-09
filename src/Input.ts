import readLineAsync from "./utils/readlineAsync";
import ErrorMessage from "./error";
import { MAX_ALLOWED_NUMBER, MIN_ALLOWED_NUMBER } from "./constants";

const Input = {
  validateUserNumber: (userInput: string) => {
    const numerifiedUserInput = Number(userInput);

    if (isNaN(numerifiedUserInput)) {
      throw new Error(ErrorMessage.WRONG_INPUT_TYPE);
    }

    if (
      numerifiedUserInput < MIN_ALLOWED_NUMBER ||
      numerifiedUserInput > MAX_ALLOWED_NUMBER
    ) {
      throw new Error(ErrorMessage.WRONG_INPUT_RANGE);
    }
  },

  validateUserRetryOption: (userInput: string) => {
    const normalizedUserInput = userInput.toLowerCase();
    const allowedUserInputs = ["yes", "no"];

    if (!allowedUserInputs.includes(normalizedUserInput)) {
      throw new Error(ErrorMessage.WRONG_RETRY_OPTION);
    }
  },

  getUserNumber: async () => {
    while (true) {
      const userInput = await readLineAsync("숫자 입력:");

      try {
        Input.validateUserNumber(userInput);
        return Number(userInput);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    }
  },

  getUserRetryOption: async () => {
    while (true) {
      const userInput = await readLineAsync(
        "게임을 다시 시작하시겠습니까? (yes/no):"
      );

      try {
        Input.validateUserRetryOption(userInput);

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
};

export default Input;
