const ErrorMessage = {
  input: {
    WRONG_INPUT_TYPE: "숫자를 입력해주세요.",
    WRONG_INPUT_RANGE: `숫자의 범위를 다시 확인해주세요.`,
    WRONG_RETRY_OPTION: "yes 또는 no 를 입력해주세요.",
    WRONG_ANSWER_RANGE_EMPTY: "최소 값과 최대 값을 모두 입력해주세요.",
    WRONG_ANSWER_RANGE_NAN: "최소 값과 최대 값은 숫자여야 합니다.",
    WRONG_ANSWER_RANGE_MIN_GREATER: "최소 값은 최대 값보다 작아야 합니다.",
    WRONG_RETRY_COUNT: "진행 가능 횟수는 1 이상의 숫자여야 합니다.",
  },

  game: {
    EXCEED_MAX_RETRIES: `최대 시도 횟수를 초과하였습니다.`,
  },

  general: {
    UNKNOWN_ERROR: "알 수 없는 에러가 발생했습니다.",
    FILL_ALL_FIELDS: "모든 정보를 채워주세요.",
    ENTER_NUMBER_FIRST: "숫자를 먼저 입력하세요.",
  },
};

export default ErrorMessage;
