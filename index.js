import { h, render } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm@latest?module';
import {
  useState,
  useRef,
  useLayoutEffect,
} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import { oracle } from './oracle.js';
import { initI18n } from './i18n.js';

const html = htm.bind(h);

const App = () => {
  const containerRef = useRef(null);
  const [previousResults, setPreviousResults] = useState(() => []);

  const test = (type) => {
    setPreviousResults((prev) => [...prev.slice(-10), oracle(type)]);
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, previousResults);

  return html`<div class="container">
    <header>
      <h1>${i18next.t('loom_of_fate')}</h1>
    </header>
    <div class="content">
      <div class="results" ref="${containerRef}">
        ${previousResults.map((result, index) => {
          return html`<div class="result">
            <h2 style="${{ opacity: 1 / (previousResults.length - index) }}">
              ${result[0].item}
            </h2>
            ${result
              .slice(1)
              .map(
                (res) => html`<h3
                  style="${{ opacity: 1 / (previousResults.length - index) }}"
                >
                  ${res.item}
                </h3>`
              )}
            ${result.some((res) => res.help)
              ? html`<div class="help">
                  ${result.map((res) => html`<p>${res.help}</p>`)}
                </div>`
              : ''}
          </div>`;
        })}
      </div>
    </div>
    <div class="footer">
      <button onclick="${() => test('question')}">
        ${i18next.t('question')}
      </button>
      <button onclick="${() => test('action')}">${i18next.t('action')}</button>
    </div>
  </div>`;
};

initI18n().then(() => {
  render(html`<${App} />`, document.getElementById('root'));
});
