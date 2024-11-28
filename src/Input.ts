import readLineAsync from "./utils/readlineAsync";
import ErrorMessage from "./error";

const Input = {
  validate: (userInput: string) => {
    const numerifiedUserInput = Number(userInput);

    if (isNaN(numerifiedUserInput)) {
      throw new Error(ErrorMessage.WRONG_INPUT_TYPE);
    }

    const MIN_ALLOWED_NUMBER = 1;
    const MAX_ALLOWED_NUMBER = 50;

    if (
      numerifiedUserInput < MIN_ALLOWED_NUMBER ||
      numerifiedUserInput > MAX_ALLOWED_NUMBER
    ) {
      throw new Error(ErrorMessage.WRONG_INPUT_RANGE);
    }
  },

  getUserInput: async () => {
    while (true) {
      const userInput = await readLineAsync("숫자 입력:");

      try {
        Input.validate(userInput);
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
