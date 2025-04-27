import { h, render } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm@latest?module';
import {
  useState,
  useRef,
  useLayoutEffect,
} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import { oracle } from './oracle.js';
import { initI18n } from './i18n.js';
import { useSwipe } from './utils.js';

const html = htm.bind(h);

const tabs = [
  {
    key: 'oracle',
    label: () => i18next.t('Oracle'),
    buttons: [
      { type: 'questionUnlikely', label: () => i18next.t('Unlikely') },
      { type: 'question5050', label: () => i18next.t('50/50') },
      { type: 'questionLikely', label: () => i18next.t('Likely') },
    ],
  },
  {
    key: 'oracle2',
    label: () => i18next.t('Oracle'),
    buttons: [
      { type: 'quantity', label: () => i18next.t('Quantity') },
      { type: 'quality', label: () => i18next.t('Quality') },
      { type: 'spark', label: () => i18next.t('Spark check') },
    ],
  },
  {
    key: 'scene',
    label: () => i18next.t('Inspiration'),
    buttons: [
      { type: 'actionInspiration', label: () => i18next.t('Action') },
      { type: 'newScene', label: () => i18next.t('New scene') },
    ],
  },
  {
    key: 'generate',
    label: () => i18next.t('Generate'),
    buttons: [
      { type: 'fullNPC', label: () => i18next.t('NPC') },
      { type: 'fullLocation', label: () => i18next.t('Location') },
      { type: 'fullPlot', label: () => i18next.t('Plot') },
    ],
  },
];

const max = tabs.length;

const App = () => {
  const containerRef = useRef(null);
  const [previousResults, setPreviousResults] = useState(() => []);
  const [mode, setMode] = useState(0);

  const onSwipe = (direction) => {
    switch (direction) {
      case 'right':
        setMode((prev) => (prev < 1 ? max - 1 : prev - 1));
        break;
      default:
        setMode((prev) => (prev + 1) % max);
    }
  };

  const currentTab = tabs[mode];

  useSwipe(containerRef, onSwipe);

  const test = (type, label) => {
    setPreviousResults((prev) => {
      const result = oracle(type);
      const newPreviousResult = [
        ...prev.slice(-20),
        { result, label, category: currentTab.label() },
      ];
      return newPreviousResult;
    });
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [previousResults, mode]);

  return html`<div class="container">
    <header>
      <h1 onClick="${() => onSwipe('left')}">${currentTab.label()}</h1>
    </header>
    <div class="content">
      <div class="results" ref="${containerRef}">
        ${previousResults.map((result, index) => {
          return html`<div
            class="result"
            style="${{ opacity: 1 / (previousResults.length - index) }}"
          >
            <div>${result.result}</div>
            <div class="result-category">
              ${result.category} - ${result.label}
            </div>
          </div>`;
        })}
      </div>
    </div>
    <div class="footer">
      ${currentTab.buttons.map(
        (btn) =>
          html`<button onclick="${() => test(btn.type, btn.label())}">
            ${btn.label()}
          </button>`
      )}
    </div>
  </div>`;
};

initI18n().then(() => {
  render(html`<${App} />`, document.getElementById('root'));
});
