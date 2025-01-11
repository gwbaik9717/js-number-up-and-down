import { $, createElement } from "../utils/dom";

export const SectionGameSettings = {
  elements: {
    get inputMinNumberRange() {
      return $<HTMLInputElement>("#min-number-range");
    },
    get inputMaxNumberRange() {
      return $<HTMLInputElement>("#max-number-range");
    },
    get inputRetryCount() {
      return $<HTMLInputElement>("#retry-count");
    },
    get btnStartGame() {
      return $<HTMLButtonElement>("#start-game");
    },
  },

  getTemplate: () => {
    const wrapper = createElement("div");

    wrapper.innerHTML = `
        <div class="px-2">
            <h2 class="text-xl font-bold text-center">
                게임 설정
            </h2>
            <div class="mt-6">
                <label for="min-number-range" class="block text-md/6 font-medium text-gray-900 text-center">숫자 범위</label>
                <div class="flex items-center gap-x-2 mt-2">
                    <input min="0" type="number" id="min-number-range" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="최소">
                    <input min="0" type="number" id="max-number-range" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="최대">
                </div>
            </div>

            <div class="mt-6">
                <label for="retry-count" class="block text-md/6 font-medium text-gray-900 text-center">진행 가능 횟수</label>
                <input min="1" type="number" id="retry-count" class="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="진행 가능 횟수">
            </div>
        </div>
        <button id="start-game" type="button" class="w-full mt-20 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">시작하기</button>
    `;

    return wrapper;
  },

  render: () => {
    const app = $("#app");

    if (!app) {
      throw new Error();
    }

    app.innerHTML = "";
    const template = SectionGameSettings.getTemplate();
    app.appendChild(template);
  },

  onConfirm: (
    minUserRange: number,
    maxUserRange: number,
    maxRetries: number
  ) => {},
};
