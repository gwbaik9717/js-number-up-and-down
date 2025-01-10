import {
  MAX_ALLOWED_NUMBER,
  MAX_RETRIES,
  MIN_ALLOWED_NUMBER,
} from "./constants";

const ErrorMessage = {
  input: {
    WRONG_INPUT_TYPE: "숫자를 입력해주세요.",
    WRONG_INPUT_RANGE: `${MIN_ALLOWED_NUMBER}부터 ${MAX_ALLOWED_NUMBER} 사이의 숫자를 입력해주세요.`,
    WRONG_RETRY_OPTION: "yes 또는 no 를 입력해주세요.",
    WRONG_ANSWER_RANGE: "입력 양식을 다시 확인해주세요.",
    WRONG_RETRY_COUNT: "입력 양식을 다시 확인해주세요.",
  },

  game: {
    EXCEED_MAX_RETRIES: `최대 시도 횟수는 ${MAX_RETRIES}번 입니다.`,
  },
};

export default ErrorMessage;
