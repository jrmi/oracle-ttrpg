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

const html = htm.bind(h);

const groups = [
  {
    key: 'oracle',
    label: () => i18next.t('ui.oracle'),
    oracles: [
      { type: 'questionUnlikely', label: () => i18next.t('ui.odds.unlikely') },
      { type: 'question5050', label: () => i18next.t('ui.odds.even') },
      { type: 'questionLikely', label: () => i18next.t('ui.odds.likely') },
      { type: 'level', label: () => i18next.t('ui.oracle2.expectation') },
      { type: 'clock', label: () => i18next.t('ui.oracle2.clock') },
      { type: 'inspirationSeed', label: () => i18next.t('ui.inspiration') },
    ],
  },
  {
    key: 'scene',
    label: () => i18next.t('ui.inspiration'),
    oracles: [
      { type: 'actionInspiration', label: () => i18next.t('ui.action') },
      { type: 'newScene', label: () => i18next.t('ui.scene.new') },
      { type: 'eventSeed', label: () => i18next.t('ui.event') },
    ],
  },
  {
    key: 'generate',
    label: () => i18next.t('ui.generate'),
    oracles: [
      { type: 'fullNPC', label: () => i18next.t('ui.npc') },
      { type: 'fullLocation', label: () => i18next.t('ui.location') },
      { type: 'fullPlot', label: () => i18next.t('ui.plot') },
    ],
  },
  {
    key: 'triple-o',
    label: () => i18next.t('ui.triple_o'),
    oracles: [
      { type: 'tripleOCheck', label: () => i18next.t('ui.triple_o.check') },
      { type: 'tripleOSpark', label: () => i18next.t('ui.triple_o.spark') },
      { type: 'tripleOCombat', label: () => i18next.t('ui.triple_o.combat') },
    ],
  },
  {
    key: 'triple-o-2',
    label: () => i18next.t('ui.triple_o'),
    oracles: [
      { type: 'tripleOSocial', label: () => i18next.t('ui.triple_o.social') },
      {
        type: 'tripleOExploration',
        label: () => i18next.t('ui.triple_o.exploration'),
      },
      {
        type: 'tripleODelving',
        label: () => i18next.t('ui.triple_o.delving'),
      },
    ],
  },
  {
    key: 'triple-o-3',
    label: () => i18next.t('ui.triple_o'),
    oracles: [
      {
        type: 'tripleOInterpretation',
        label: () => i18next.t('ui.triple_o.interpretation'),
      },
      {
        type: 'tripleODowntime',
        label: () => i18next.t('ui.triple_o.downtime'),
      },
      {
        type: 'tripleOPlanning',
        label: () => i18next.t('ui.triple_o.planning'),
      },
    ],
  },
];

const getDisplayGroups = () =>
  groups.reduce((acc, group) => {
    const label = group.label();
    const previousGroup = acc[acc.length - 1];

    if (previousGroup && previousGroup.label === label) {
      previousGroup.oracles = [...previousGroup.oracles, ...group.oracles];
      return acc;
    }

    acc.push({
      key: group.key,
      label,
      oracles: [...group.oracles],
    });

    return acc;
  }, []);

const App = () => {
  const resultsRef = useRef(null);
  const [previousResults, setPreviousResults] = useState(() => []);
  const [currentOracle, setCurrentOracle] = useState(() => ({
    category: groups[0].label(),
    label: groups[0].oracles[0].label(),
  }));
  const displayGroups = getDisplayGroups();

  const runOracle = (type, label, category) => {
    setCurrentOracle({ category, label });
    setPreviousResults((prev) => {
      const result = oracle(type);
      const newPreviousResult = [
        ...prev.slice(-20),
        { result, label, category },
      ];
      return newPreviousResult;
    });
  };

  useLayoutEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
    }
  }, [previousResults]);

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
          <span class="empty-state-title">${i18next.t('ui.tagline')}</span>
          <div class="empty-state-hint">
            ${currentOracle.category} · ${currentOracle.label}
          </div>
        </div>`;

  return html`<div class="container">
    <header>
      <div class="header-summary">
        <div class="header-kicker">${currentOracle.category}</div>
        <h1>
          <span class="tab-title">${currentOracle.label}</span>
        </h1>
      </div>
    </header>
    <div class="content">${results}</div>
    <div class="oracle-picker">
      ${displayGroups.map(
        (group) =>
          html`<section class="oracle-group" key="${group.key}">
            <div class="oracle-group-label">${group.label}</div>
            <div class="oracle-list">
              ${group.oracles.map((item) => {
                const label = item.label();
                const isActive =
                  currentOracle.category === group.label &&
                  currentOracle.label === label;

                return html`<button
                  class="${`oracle-button${isActive ? ' is-active' : ''}`}"
                  onclick="${() => runOracle(item.type, label, group.label)}"
                  title="${label}"
                >
                  ${label}
                </button>`;
              })}
            </div>
          </section>`
      )}
    </div>
  </div>`;
};

initI18n().then(() => {
  render(html`<${App} />`, document.getElementById('root'));
});
