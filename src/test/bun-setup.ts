import { JSDOM } from 'jsdom';

if (typeof document === 'undefined') {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost:3000',
  });
  // @ts-ignore
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.navigator = dom.window.navigator;
  // @ts-ignore
  globalThis.HTMLElement = dom.window.HTMLElement;
  // @ts-ignore
  globalThis.localStorage = dom.window.localStorage;
}
