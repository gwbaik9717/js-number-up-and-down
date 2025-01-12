export const $ = <T extends HTMLElement = HTMLElement>(
  selector: string,
  parent = document
) => parent.querySelector<T>(selector);

export const createElement = (tagName: string) => {
  const element = document.createElement(tagName);
  return element;
};
