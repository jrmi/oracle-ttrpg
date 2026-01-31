import { h, render } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm@latest?module';
import {
  useState,
  useRef,
  useLayoutEffect,
} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import { micromark } from 'https://esm.sh/micromark@3?bundle';

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
    label: () => i18next.t('Oracle') + ' 2',
    buttons: [
      { type: 'level', label: () => i18next.t('Expectation') },
      { type: 'clock', label: () => i18next.t('Clock') },
      { type: 'inspirationSeed', label: () => i18next.t('Inspiration') },
    ],
  },
  {
    key: 'scene',
    label: () => i18next.t('Inspiration'),
    buttons: [
      { type: 'actionInspiration', label: () => i18next.t('Action') },
      { type: 'newScene', label: () => i18next.t('New scene') },
      { type: 'eventSeed', label: () => i18next.t('Event') },
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

  const results =
    previousResults.length > 0
      ? html`<div class="results" ref="${containerRef}">
          ${previousResults.map((result, index) => {
            return html`<div
              class="result"
              style="${{ opacity: 1 / (previousResults.length - index) }}"
            >
              <div
                dangerouslySetInnerHTML=${{ __html: micromark(result.result) }}
              />
              <div class="result-category">
                ${result.category} - ${result.label}
              </div>
            </div>`;
          })}
        </div>`
      : html`<div class="empty-state">
          <span onClick="${() => onSwipe('left')}">${i18next.t('Oracle for TTRPG')}</span>
        </div>`;

  return html`<div class="container">
    <header>
      ${previousResults.length > 0 &&
      html`<h1 onClick="${() => onSwipe('left')}">${currentTab.label()}</h1>`}
      <button class="clear" onClick="${() => setPreviousResults([])}">
        ${i18next.t('Clear')}
      </button>
    </header>
    <div class="content">${results}</div>
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
