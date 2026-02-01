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
    label: () => i18next.t('ui.oracle'),
    buttons: [
      { type: 'questionUnlikely', label: () => i18next.t('ui.odds.unlikely') },
      { type: 'question5050', label: () => i18next.t('ui.odds.even') },
      { type: 'questionLikely', label: () => i18next.t('ui.odds.likely') },
    ],
  },
  {
    key: 'oracle2',
    label: () => i18next.t('ui.oracle') + ' 2',
    buttons: [
      { type: 'level', label: () => i18next.t('ui.oracle2.expectation') },
      { type: 'clock', label: () => i18next.t('ui.oracle2.clock') },
      { type: 'inspirationSeed', label: () => i18next.t('ui.inspiration') },
    ],
  },
  {
    key: 'scene',
    label: () => i18next.t('ui.inspiration'),
    buttons: [
      { type: 'actionInspiration', label: () => i18next.t('ui.action') },
      { type: 'newScene', label: () => i18next.t('ui.scene.new') },
      { type: 'eventSeed', label: () => i18next.t('ui.event') },
    ],
  },
  {
    key: 'generate',
    label: () => i18next.t('ui.generate'),
    buttons: [
      { type: 'fullNPC', label: () => i18next.t('ui.npc') },
      { type: 'fullLocation', label: () => i18next.t('ui.location') },
      { type: 'fullPlot', label: () => i18next.t('ui.plot') },
    ],
  },
];

const max = tabs.length;

const App = () => {
  const contentRef = useRef(null);
  const resultsRef = useRef(null);
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

  useSwipe(contentRef, onSwipe);

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
    if (resultsRef.current) {
      resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
    }
  }, [previousResults, mode]);

  const previousTab = tabs[(mode - 1 + max) % max];
  const nextTab = tabs[(mode + 1) % max];

  const results =
    previousResults.length > 0
      ? html`<div class="results" ref="${resultsRef}">
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
          <span
            class="empty-state-title"
            onClick="${() => onSwipe('left')}"
          >
            ${i18next.t('ui.tagline')}
          </span>
          <div class="empty-state-hint">${i18next.t('ui.swipe_hint')}</div>
        </div>`;

  return html`<div class="container">
    <header>
      <div class="tab-rail">
        <button
          class="tab-hit tab-hit-left"
          onClick="${() => onSwipe('right')}"
          aria-label="${i18next.t('ui.previous_tab')}"
        >
          <span class="tab-arrow">‹</span>
          <span class="tab-peek">${previousTab.label()}</span>
        </button>
        ${previousResults.length > 0 &&
        html`<h1 onClick="${() => onSwipe('left')}">
          <span class="tab-title">${currentTab.label()}</span>
        </h1>`}
        ${previousResults.length === 0 &&
        html`<h1>
          <span class="tab-title">${currentTab.label()}</span>
        </h1>`}
        <button
          class="tab-hit tab-hit-right"
          onClick="${() => onSwipe('left')}"
          aria-label="${i18next.t('ui.next_tab')}"
        >
          <span class="tab-peek">${nextTab.label()}</span>
          <span class="tab-arrow">›</span>
        </button>
      </div>
    </header>
    <div class="content" ref="${contentRef}">${results}</div>
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
