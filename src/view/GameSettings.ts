import { $, createElement } from "../utils/dom";

export const GameSettings = {
  getTemplate: () => {
    const wrapper = createElement("div");

    wrapper.innerHTML = `
        <div class="px-6">
            <h2 class="text-xl font-bold text-center">
                게임 설정
            </h2>
            <label for="email" class="block text-md/6 font-medium text-gray-900 text-center mt-4">숫자 범위</label>
            <div class="flex items-center gap-x-2">
                <div>
                    <div class="mt-2 grid grid-cols-1">
                        <input type="email" name="email" id="email" class="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6" placeholder="you@example.com" value="adamwathan" aria-invalid="true" aria-describedby="email-error">
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <p class="mt-2 text-sm text-red-600" id="email-error">Not a valid email address.</p>
                </div>
                <div>
                    <div class="mt-2 grid grid-cols-1">
                        <input type="email" name="email" id="email" class="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6" placeholder="you@example.com" value="adamwathan" aria-invalid="true" aria-describedby="email-error">
                        <svg class="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <p class="mt-2 text-sm text-red-600" id="email-error">Not a valid email address.</p>
                </div>
            </div>
            <label for="email" class="block text-md/6 font-medium text-gray-900 text-center mt-4">진행 가능 횟수</label>
            
            <div>
                <div class="mt-2 grid grid-cols-1">
                    <input type="email" name="email" id="email" class="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-base text-red-900 outline outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6" placeholder="you@example.com" value="adamwathan" aria-invalid="true" aria-describedby="email-error">
                    <svg class="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <p class="mt-2 text-sm text-red-600" id="email-error">Not a valid email address.</p>
            </div>
        </div>
        <button type="button" class="w-full mt-20 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">시작하기</button>
    `;

    return wrapper;
  },

  render: () => {
    const app = $("#app");

    if (!app) {
      throw new Error();
    }

    app.innerHTML = "";
    const template = GameSettings.getTemplate();
    app.appendChild(template);
  },
};
