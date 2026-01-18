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
    /*{
      item: i18next.t('fragile'),
      weight: 5,
    },*/
    /*{
      item: i18next.t('doubtful'),
      weight: 5,
    },*/
    {
      item: i18next.t('risky'),
      weight: 5,
    },
    /*{
      item: i18next.t('unpredictable'),
      weight: 5,
    },*/
    {
      item: i18next.t('incomplete'),
      weight: 5,
    },
    {
      item: i18next.t('inadequate'),
      weight: 5,
    },
    /*{
      item: i18next.t('compromise'),
      weight: 5,
    },*/
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
    /*{
      item: i18next.t('promising'),
      weight: 5,
    },*/
    /*{
      item: i18next.t('stable'),
      weight: 5,
    },*/
    /*{
      item: i18next.t('creative'),
      weight: 5,
    },*/
    {
      item: i18next.t('rich'),
      weight: 5,
    },
    {
      item: i18next.t('stimulating'),
      weight: 5,
    },
    /*{
      item: i18next.t('plus_durable'),
      weight: 5,
    },*/
    {
      item: i18next.t('brilliant'),
      weight: 5,
    },
    {
      item: i18next.t('plus_momentum'),
      weight: 5,
    },
    /*{
      item: i18next.t('robust'),
      weight: 5,
    },*/
  ];

  const yesAnd = [
    // { item: i18next.t('gain_extra'), weight: 40 },
    // { item: i18next.t('durable'), weight: 40 },
    {
      item: i18next.t('momentum'),
      weight: 4,
      help: i18next.t('explain_momentum'),
      noRepeat: true,
    },
    { item: i18next.t('upcoming_windfall'), weight: 1, noRepeat: true },
    { item: i18next.t('offscreen_windfall'), weight: 1, noRepeat: true },
    { item: i18next.t('unexpected_help'), weight: 1, noRepeat: true },
    { item: i18next.t('get_help'), weight: 2, noRepeat: true },
    { item: i18next.t('heroic_action'), weight: 1, noRepeat: true },
    { item: i18next.t('plot_advances'), weight: 8, noRepeat: true },
    { item: i18next.t('gain_ally'), weight: 1, noRepeat: true },
    { item: i18next.t('exceptional'), weight: 1, noRepeat: true },
    { item: i18next.t('plot_link'), weight: 1, noRepeat: true },
    /*{
      item: i18next.t('threat_retreat'),
      weight: 10,
      help: i18next.t('explain_threat_retreat'),
    },*/
  ];

  /*const yesIf = [
    {
      item: i18next.t('sacrifice'),
      weight: 10,
      help: i18next.t('explain_sacrifice'),
    },
    {
      item: i18next.t('pay_price'),
      weight: 30,
      help: i18next.t('explain_pay_price'),
    },
    {
      item: i18next.t('get_help'),
      weight: 10,
      help: i18next.t('explain_get_help'),
    },
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
    { item: i18next.t('danger'), weight: 30 },
    { item: i18next.t('consume_resource'), weight: 20 },
  ];

  const yesBut = [
    { item: i18next.t('partial'), weight: 1 },
    { item: i18next.t('temporary'), weight: 1 },
  ];*/

  const weakYes = [
    { item: i18next.t('but_partial'), weight: 10, noRepeat: true },
    { item: i18next.t('but_temporary'), weight: 10, noRepeat: true },
    {
      item: i18next.t('if_sacrifice'),
      weight: 10,
      help: i18next.t('explain_sacrifice'),
      noRepeat: true,
    },
    {
      item: i18next.t('if_pay_price'),
      weight: 30,
      help: i18next.t('explain_pay_price'),
      noRepeat: true,
    },
    {
      item: i18next.t('if_get_help'),
      weight: 10,
      help: i18next.t('explain_get_help'),
      noRepeat: true,
    },
    {
      item: i18next.t('if_change_plans'),
      weight: 30,
      help: i18next.t('explain_change_plans'),
      noRepeat: true,
    },
    {
      item: i18next.t('if_advance_threat'),
      weight: 5,
      help: i18next.t('explain_advance_threat'),
      noRepeat: true,
    },
    { item: i18next.t('if_danger'), weight: 30, noRepeat: true },
    { item: i18next.t('if_consume_resource'), weight: 20, noRepeat: true },
  ];

  const noAnd = [
    {
      item: i18next.t('betrayal'),
      weight: 5,
      help: i18next.t('explain_betrayal'),
      noRepeat: true,
    },
    { item: i18next.t('oppose_strengthen'), weight: 5, noRepeat: true },
    {
      item: i18next.t('plot_thickens'),
      weight: 5,
      help: i18next.t('explain_plot_thickens'),
      noRepeat: true,
    },
    {
      item: i18next.t('threat_progress'),
      weight: 5,
      help: i18next.t('explain_threat_progress'),
      noRepeat: true,
    },
    {
      item: i18next.t('backfire'),
      weight: 10,
      help: i18next.t('explain_backfire'),
      noRepeat: true,
    },
    {
      item: i18next.t('upcoming_problem'),
      weight: 10,
      help: i18next.t('explain_upcoming_problem'),
      noRepeat: true,
    },
    { item: i18next.t('offscreen_problem'), weight: 10, noRepeat: true },
  ];

  const mainAction = [
    {
      item: i18next.t('ask_another_question'),
      weight: 1,
      help: i18next.t('explain_ask_another_question'),
      noRepeat: true,
    },
    { item: i18next.t('strong_yes'), weight: 2, addition: yesAnd },
    // { item: i18next.t('yes'), weight: 5 },
    // { item: i18next.t('yes_if'), weight: 8, addition: yesIf },
    // { item: i18next.t('yes_but'), weight: 4, addition: yesBut },
    { item: i18next.t('weak_yes'), weight: 12, addition: weakYes },
    // { item: i18next.t('no'), weight: 15 },
    { item: i18next.t('strong_no'), weight: 2, addition: noAnd },
  ];

  const mainQuestion = [
    {
      item: i18next.t('ask_another_question'),
      weight: 1,
      help: i18next.t('explain_ask_another_question'),
      noRepeat: true,
    },
    { item: i18next.t('strong_yes'), weight: 1, addition: oracleResultsPlus },
    // { item: i18next.t('yes'), weight: 20 },
    { item: i18next.t('yes_but'), weight: 4, addition: oracleResultsLess },
    { item: i18next.t('no_but'), weight: 4, addition: oracleResultsPlus },
    //{ item: i18next.t('no'), weight: 20 },
    { item: i18next.t('strong_no'), weight: 1, addition: oracleResultsLess },
  ];

  const response = weightedRandom(
    type === 'action' ? mainAction : mainQuestion,
    type === 'action' ? 'action' : 'question'
  );

  let addition = null;

  if (response.addition) {
    addition = weightedRandom(response.addition, response.item);
  }

  return { response, addition };
};
