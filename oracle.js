import { weightedRandom } from './utils.js';

export const oracle = (type) => {
  const oracleResultsLess = [
    {
      item: i18next.t('costly'),
      weight: 5,
    },
    {
      item: i18next.t('slow'),
      weight: 5,
    },
    {
      item: i18next.t('less_betrayal'),
      weight: 5,
    },
    {
      item: i18next.t('difficult'),
      weight: 5,
    },
    {
      item: i18next.t('limited'),
      weight: 5,
    },
    {
      item: i18next.t('fragile'),
      weight: 5,
    },
    {
      item: i18next.t('doubtful'),
      weight: 5,
    },
    {
      item: i18next.t('risky'),
      weight: 5,
    },
    {
      item: i18next.t('unpredictable'),
      weight: 5,
    },
    {
      item: i18next.t('incomplete'),
      weight: 5,
    },
    {
      item: i18next.t('inadequate'),
      weight: 5,
    },
    {
      item: i18next.t('compromise'),
      weight: 5,
    },
    {
      item: i18next.t('less_temporary'),
      weight: 5,
    },
  ];

  const oracleResultsPlus = [
    {
      item: i18next.t('helpful'),
      weight: 5,
    },
    {
      item: i18next.t('promising'),
      weight: 5,
    },
    {
      item: i18next.t('stable'),
      weight: 5,
    },
    {
      item: i18next.t('creative'),
      weight: 5,
    },
    {
      item: i18next.t('future'),
      weight: 5,
    },
    {
      item: i18next.t('rich'),
      weight: 5,
    },
    {
      item: i18next.t('stimulating'),
      weight: 5,
    },
    {
      item: i18next.t('rewarding'),
      weight: 5,
    },
    {
      item: i18next.t('plus_durable'),
      weight: 5,
    },
    {
      item: i18next.t('brilliant'),
      weight: 5,
    },
    {
      item: i18next.t('plus_momentum'),
      weight: 5,
    },
    {
      item: i18next.t('robust'),
      weight: 5,
    },
  ];

  const commonNeg = [
    {
      item: i18next.t('lose_time'),
      weight: 30,
      help: i18next.t('explain_lose_time'),
    },
    {
      item: i18next.t('pay_price'),
      weight: 30,
      help: i18next.t('explain_pay_price'),
    },
    { item: i18next.t('consume_resource'), weight: 20 },
    { item: i18next.t('danger'), weight: 30 },
  ];

  const yesIf = [
    {
      item: i18next.t('sacrifice'),
      weight: 10,
      help: i18next.t('explain_sacrifice'),
    },
    { item: i18next.t('get_help'), weight: 10 },
    { item: i18next.t('use_object'), weight: 20 },
    {
      item: i18next.t('change_plans'),
      weight: 30,
      help: i18next.t('explain_change_plans'),
    },
    {
      item: i18next.t('advance_threat'),
      weight: 10,
      help: i18next.t('explain_advance_threat'),
    },

    ...commonNeg,
  ];

  const noAnd = [
    {
      item: i18next.t('betrayal'),
      weight: 5,
      help: i18next.t('explain_betrayal'),
    },
    { item: i18next.t('oppose_strengthen'), weight: 5 },
    {
      item: i18next.t('plot_thickens'),
      weight: 5,
      help: i18next.t('explain_plot_thickens'),
    },
    {
      item: i18next.t('threat_progress'),
      weight: 5,
      help: i18next.t('explain_threat_progress'),
    },
    { item: i18next.t('backfire'), weight: 10 },
    {
      item: i18next.t('upcoming_problem'),
      weight: 10,
      help: i18next.t('explain_upcoming_problem'),
    },
    { item: i18next.t('offscreen_problem'), weight: 10 },

    ...commonNeg,
  ];

  const yesBut = [
    { item: i18next.t('partial'), weight: 30 },
    { item: i18next.t('temporary'), weight: 30 },
    {
      item: i18next.t('unexpected_result'),
      weight: 20,
      help: i18next.t('explain_unexpected_result'),
    },
    { item: i18next.t('higher_cost'), weight: 25 },

    ...commonNeg,
  ];

  const yesAnd = [
    { item: i18next.t('gain_extra'), weight: 40 },
    { item: i18next.t('durable'), weight: 40 },
    {
      item: i18next.t('momentum'),
      weight: 40,
      help: i18next.t('explain_momentum'),
    },
    { item: i18next.t('upcoming_windfall'), weight: 30 },
    { item: i18next.t('offscreen_windfall'), weight: 30 },
    { item: i18next.t('unexpected_help'), weight: 20 },
    { item: i18next.t('get_help'), weight: 20 },
    { item: i18next.t('heroic_action'), weight: 10 },
    { item: i18next.t('plot_advances'), weight: 20 },
    { item: i18next.t('gain_ally'), weight: 10 },
    { item: i18next.t('exceptional'), weight: 10 },
    { item: i18next.t('plot_link'), weight: 10 },
    {
      item: i18next.t('threat_retreat'),
      weight: 10,
      help: i18next.t('explain_threat_retreat'),
    },
  ];

  const mainAction = [
    {
      item: i18next.t('ask_another_question'),
      weight: 2,
      help: i18next.t('ask_another_question_help'),
    },
    { item: i18next.t('yes_and'), weight: 10, addition: yesAnd },
    // { item: i18next.t('yes'), weight: 5 },
    { item: i18next.t('yes_if'), weight: 20, addition: yesIf },
    { item: i18next.t('yes_but'), weight: 5, addition: yesBut },
    // { item: i18next.t('no'), weight: 15 },
    { item: i18next.t('no_and'), weight: 10, addition: noAnd },
  ];

  const mainQuestion = [
    {
      item: i18next.t('ask_another_question'),
      weight: 5,
      help: i18next.t('ask_another_question_help'),
    },
    { item: i18next.t('yes_and'), weight: 10, addition: oracleResultsPlus },
    // { item: i18next.t('yes'), weight: 20 },
    { item: i18next.t('yes_but'), weight: 30, addition: oracleResultsLess },
    { item: i18next.t('no_but'), weight: 30, addition: oracleResultsPlus },
    //{ item: i18next.t('no'), weight: 20 },
    { item: i18next.t('no_and'), weight: 10, addition: oracleResultsLess },
  ];

  const response = weightedRandom(
    type === 'action' ? mainAction : mainQuestion
  );

  let addition = null;

  if (response.addition) {
    addition = weightedRandom(response.addition);
  }

  return { response, addition };
};
