import { h, render } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm@latest?module';
import {
  useState,
  useRef,
  useLayoutEffect,
} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import { oracle } from './oracle.js'; 

const html = htm.bind(h);

function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

const unexpectedResults = [
  "changement d'intrigue",
  "point d'orgue",
  'retournement de veste',
  'préfiguration',
  'mise en lumière',
  'transition douce',
  'sous les projecteurs',
  'avance rapide',
  'révélation soudaine',
  'changement de décor',
  'effet petit monde',
  'vers la conclusion',
  'vers la confrontation',
  "vers l'exploration",
  'nouvelle conclusion',
  "coup d'éclat",
];

const oracleResultsLess = [
  'trahison',
  'lutte',
  'danger',
  'nature',
  'étrange',
  'bruyant',
  'difficile',
  'incertain',
  'coûteux',
  'lourd',
  'lent',
  'confus',
  'limité',
  'fragile',
  'douteux',
  'éphémère',
  'inachevé',
  'contrarié',
  'risqué',
  'épuisant',
  'perturbant',
  'désordonné',
  'inégal',
  'imprévisible',
  'imparfait',
  'incomplet',
  'inadéquat',
  'instable',
  'pénible',
  'aléatoire',
  'contraignant',
  'compromis',
  'partiel',
  'désavantage',
  'temporairement',
  'conditionnelle',
  'restriction',
  'karma',
];

const oracleResultsPlus = [
  'aide',
  'constructif',
  'prometteur',
  'stable',
  'équilibré',
  'créatif',
  'innovant',
  'future',
  'riche',
  'machine',
  'découverte',
  'récompense',
  'idée',
  'échange',
  'réconfortant',
  'stimulant',
  'en bonne voie',
  'éclairant',
  'enrichissant',
  'harmonieux',
  'satisfaisant',
  'exploration',
  'dynamique',
  'révélateur',
  'novateur',
  'propice',
  'bien géré',
  'sous contrôle',
  'optimiste',
  'durable',
  'productif',
  'révolutionnaire',
  'brillant',
  'élan',
  'confiant',
  'robuste',
  'force',
  'karma',
];

const lastResults = [];
function getUnexpectedResult() {
  let toReturn = unexpectedResults[rollDice(unexpectedResults.length) - 1];

  if (lastResults.includes(toReturn)) {
    toReturn = unexpectedResults[rollDice(unexpectedResults.length) - 1];
  }

  lastResults.push(toReturn);
  if (lastResults.length > 3) {
    lastResults.pop();
  }

  return toReturn;
}

const responses = {
  'To Knowledge': [
    {
      threshold: 96,
      response: 'Oui, de manière inattendue',
      unexpectedly: true,
      resetSurge: true,
    },
    { threshold: 86, response: 'Oui, et...', side: '+', resetSurge: true },
    { threshold: 51, response: 'Oui, mais...', side: '-' },
    { threshold: 21, response: 'Non, mais...', side: '+' },
    { threshold: 6, response: 'Non, et...', side: '-', resetSurge: true },
    {
      threshold: null,
      response: 'Non, de manière inattendue',
      unexpectedly: true,
    },
  ],
  'To Conflict': [
    {
      threshold: 99,
      response: 'Oui, de manière inattendue',
      unexpectedly: true,
    },
    { threshold: 95, response: 'Oui, et...', side: '+', resetSurge: true },
    { threshold: 51, response: 'Oui, mais...', side: '-' },
    { threshold: 17, response: 'Non, mais...', side: '+' },
    { threshold: 3, response: 'Non, et...', side: '-', resetSurge: true },
    {
      threshold: null,
      response: 'Non, de manière inattendue',
      unexpectedly: true,
    },
  ],
  'To Endings': [
    {
      threshold: 100,
      response: 'Oui, de manière inattendue',
      unexpectedly: true,
    },
    { threshold: 99, response: 'Oui, et...', side: '+', resetSurge: true },
    { threshold: 51, response: 'Oui, mais...', side: '-' },
    { threshold: 21, response: 'Non, mais...', side: '+' },
    { threshold: 2, response: 'Non, et...', side: '-', resetSurge: true },
    {
      threshold: null,
      response: 'Non, de manière inattendue',
      unexpectedly: true,
    },
  ],
};

const lastAdditions = [];
function getAddition(side) {
  let list = oracleResultsPlus;

  if (side === '-') {
    list = oracleResultsLess;
  }

  let toReturn = list[rollDice(list.length) - 1];

  if (lastAdditions.includes(toReturn)) {
    toReturn = list[rollDice(list.length) - 1];
  }

  lastAdditions.push(toReturn);
  if (lastAdditions.length > 10) {
    lastAdditions.pop();
  }

  return toReturn;
}

function getResponse(stage, modifiedResult) {
  for (const response of responses[stage]) {
    if (!response.threshold || modifiedResult >= response.threshold) {
      return response;
    }
  }
  return { response: 'Invalid result', unexpectedly: false };
}

function loomOfFate(stage, currentSurge) {
  const result = rollDice(100);
  let modifiedResult = result;

  if (result > 50) {
    modifiedResult += currentSurge;
  } else {
    modifiedResult -= currentSurge;
  }

  const responseObj = getResponse(stage, modifiedResult);
  const { response, unexpectedly, resetSurge } = responseObj;

  let unexpectedResult = '';

  let newSurge;

  if (resetSurge) {
    newSurge = 0;
  } else {
    newSurge = currentSurge + 2;
  }

  if (unexpectedly) {
    unexpectedResult = getUnexpectedResult();
  }
  if (responseObj.side) {
    unexpectedResult = [
      getAddition(responseObj.side),
      getAddition(responseObj.side),
    ].join(', ');
  }

  return {
    roll: result,
    modifiedRoll: modifiedResult,
    response,
    unexpectedly,
    unexpectedResult,
    newSurge,
  };
}

/* result = { response, unexpectedResult, newSurge} */



const App = () => {
  const containerRef = useRef(null);
  const [surge, setSurge] = useState(0);
  const [previousResults, setPreviousResults] = useState(() => []);

  const simulateLoomOfFate = (stage) => {
    const fullResult = loomOfFate(stage, surge);
    setPreviousResults((prev) => [...prev.slice(-10), fullResult]);
    setSurge(fullResult.newSurge);
  };

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
      <!--div class="surge">
        <label for="surgeCount">Tension </label>
        <input
          type="number"
          id="surgeCount"
          value="${surge}"
          oninput="${(e) => setSurge(parseInt(e.target.value))}"
        />
      </!--div-->
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
      <!--button onclick="${() => simulateLoomOfFate('To Knowledge')}">
        Exploration
      </!--button>
      <button onclick="${() => simulateLoomOfFate('To Conflict')}">
        Confrontation
      </button>
      <button-- onclick="${() => simulateLoomOfFate('To Endings')}">
        Conclusion
      </button-->
      <button onclick="${() => test('question')}">Question</button>
      <button onclick="${() => test('action')}">Action</button>
    </div>
  </div>`;
};

render(html`<${App} />`, document.getElementById('root'));
