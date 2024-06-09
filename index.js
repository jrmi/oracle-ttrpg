import { h, render } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm@latest?module';
import {
  useState,
  useRef,
  useLayoutEffect,
} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import { oracle } from './oracle.js'; 

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
      <h1>Loom of Fate</h1>
    </header>
    <div class="content">
      <div class="results" ref="${containerRef}">
        ${previousResults.map((result, index) => {
          return html`<div
            class="result"
            style="${{ opacity: 1 / (previousResults.length - index) }}"
          >
            <h2>${result.response.item}</h2>
            ${result.addition
              ? html`<h3>${result.addition.item}</h3>`
              : ''}
          </div>`;
        })}
      </div>
    </div>
    <div class="footer">
      <button onclick="${() => test('question')}">Question</button>
      <button onclick="${() => test('action')}">Action</button>
    </div>
  </div>`;
};

render(html`<${App} />`, document.getElementById('root'));
