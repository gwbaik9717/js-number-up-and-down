export const $ = <T extends HTMLElement = HTMLElement>(
  selector: string,
  parent = document
) => parent.querySelector<T>(selector);

export const $all = (selector: string, parent = document) => [
  ...parent.querySelectorAll<HTMLElement>(selector),
];

export const createElement = (tagName: string) => {
  const element = document.createElement(tagName);
  return element;
};

export const removeElements = (parent: HTMLElement, selectors: string) => {
  const filtered = Array.from(parent.children).filter((child) => {
    return !child.matches(selectors);
  });

  parent.innerHTML = "";
  parent.append(...filtered);
};
