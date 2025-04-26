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
    label: () => i18next.t('oracle'),
    buttons: [
      { type: 'questionUnlikely', label: () => i18next.t('question_unlikely') },
      { type: 'question5050', label: () => i18next.t('question_5050') },
      { type: 'questionLikely', label: () => i18next.t('question_likely') },
    ],
  },
  {
    key: 'inspiration',
    label: () => i18next.t('inspiration'),
    buttons: [
      { type: 'inspiration', label: () => i18next.t('inspiration') },
      { type: 'action', label: () => i18next.t('action') },
      { type: 'focus', label: () => i18next.t('focus') },
      { type: 'disposition', label: () => i18next.t('disposition') },
      { type: 'motivation', label: () => i18next.t('motivation') },
      { type: 'method', label: () => i18next.t('method') },
    ],
  },
  {
    key: 'npc',
    label: () => i18next.t('npc'),
    buttons: [
      { type: 'npc_archetype', label: () => i18next.t('archetype') },
      {
        type: 'npc_distinctive_feature',
        label: () => i18next.t('distinctive_feature'),
      },
      {
        type: 'actionType',
        label: () => i18next.t('action_type'),
      },
    ],
  },
  {
    key: 'location',
    label: () => i18next.t('location'),
    buttons: [
      { type: 'location', label: () => i18next.t('location') },
      { type: 'location_qualifier', label: () => i18next.t('qualifier') },
    ],
  },
  {
    key: 'spark',
    label: () => i18next.t('spark'),
    buttons: [{ type: 'spark', label: () => i18next.t('spark') }],
  },
  /*{
    key: 'action',
    label: () => i18next.t('action'),
    buttons: [
      { type: 'actionUnlikely', label: () => i18next.t('action_unlikely') },
      { type: 'action5050', label: () => i18next.t('action_5050') },
      { type: 'actionLikely', label: () => i18next.t('action_likely') },
    ],
  },*/
  {
    key: 'scene',
    label: () => i18next.t('scene'),
    buttons: [
      { type: 'sceneQuestion', label: () => i18next.t('scene_question') },
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
        { items: result, label, category: currentTab.label() },
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
            <div>${result.items[0].item}</div>
            ${result.items
              .slice(1)
              .map((res) => html`<div class="sub">${res.item}</div>`)}
            ${result.items.some((res) => res.help)
              ? html`<div class="help">
                  ${result.items.map((res) => html`<p>${res.help}</p>`)}
                </div>`
              : ''}
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
