import readLineAsync from "./utils/readlineAsync";

const Input = {
  validate: (userInput: string) => {
    if (isNaN(Number(userInput))) {
      throw new Error("숫자를 입력해주세요.");
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
