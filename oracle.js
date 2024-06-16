import { weightedRandom } from './utils.js';

export const oracle = (type) => {
  const actionStrongYes = [
    {
      item: i18next.t('momentum'),
      weight: 8,
      help: i18next.t('explain_momentum'),
      noRepeat: true,
    },
    { item: i18next.t('upcoming_windfall'), weight: 8, noRepeat: true },
    { item: i18next.t('plot_advances'), weight: 8, noRepeat: true },
    { item: i18next.t('heroic_action'), weight: 2, noRepeat: true },
    { item: i18next.t('get_help'), weight: 2, noRepeat: true },
    { item: i18next.t('exceptional'), weight: 1, noRepeat: true },
  ];

  const questionStrongYes = [
    { item: i18next.t('better'), weight: 2, noRepeat: true },
    { item: i18next.t('strong'), weight: 2, noRepeat: true },
    { item: i18next.t('get_better'), weight: 2, noRepeat: true },
    { item: i18next.t('stimulating'), weight: 2, noRepeat: true },
  ]

  const payPrice = [
    {
      item: i18next.t('suffer'),
      weight: 10,
      help: i18next.t('explain_suffer'),
      noRepeat: true,
    },
    {
      item: i18next.t('upcoming_problem'),
      weight: 10,
      help: i18next.t('explain_upcoming_problem'),
      noRepeat: true,
    },
    {
      item: i18next.t('threat_progress'),
      weight: 10,
      help: i18next.t('explain_threat_progress'),
      noRepeat: true,
    },
    {
      item: i18next.t('betrayal'),
      weight: 10,
      help: i18next.t('explain_betrayal'),
      noRepeat: true,
    },
    {
      item: i18next.t('oppose_strengthen'),
      weight: 2,
      help: i18next.t('explain_oppose_strengthen'),
      noRepeat: true,
    },
    {
      item: i18next.t('exceptional_bad'),
      weight: 1,
      help: i18next.t('explain_exceptional_bad'),
      noRepeat: true,
    },
  ];

  const actionWeakYes = [
    { item: i18next.t('partially'), weight: 10, noRepeat: true },
    { item: i18next.t('temporary'), weight: 10, noRepeat: true },
    // { item: i18next.t('get_worse'), weight: 10, noRepeat: true },
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
      addition: payPrice,
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
    { item: i18next.t('if_consume_resource'), weight: 20, noRepeat: true },
  ];


  const questionWeakYes = [
    { item: i18next.t('partially'), weight: 2, noRepeat: true },
    { item: i18next.t('temporary'), weight: 2, noRepeat: true },
    { item: i18next.t('slow'), weight: 2, noRepeat: true },
    { item: i18next.t('higher_cost'), weight: 2, noRepeat: true },
    { item: i18next.t('unpredictable'), weight: 2, noRepeat: true },
    { item: i18next.t('inadequate'), weight: 2, noRepeat: true },
  ]

  const actionStrongNo = [
    {
      item: i18next.t('pay_price'),
      weight: 30,
      help: i18next.t('explain_pay_price'),
      addition: payPrice,
    },
  ];


  const questionStrongNo = [
    { item: i18next.t('worse'), weight: 2, noRepeat: true },
    { item: i18next.t('impossible'), weight: 2, noRepeat: true },
    // { item: i18next.t('get_worse'), weight: 2, noRepeat: true },
    { item: i18next.t('disappointing'), weight: 2, noRepeat: true },
  ]

  const mainAction = [
    {
      item: i18next.t('ask_another_question'),
      weight: 1,
      help: i18next.t('explain_ask_another_question'),
      noRepeat: true,
    },
    { item: i18next.t('yes_and'), weight: 4, addition: actionStrongYes },
    // { item: i18next.t('yes_if'), weight: 8, addition: yesIf },
    // { item: i18next.t('yes_but'), weight: 4, addition: yesBut },
    { item: i18next.t('weak_yes'), weight: 16, addition: actionWeakYes },
    { item: i18next.t('no_and'), weight: 4, addition: payPrice },
  ];

  const mainQuestion = [
    {
      item: i18next.t('ask_another_question'),
      weight: 1,
      help: i18next.t('explain_ask_another_question'),
      noRepeat: true,
    },
    { item: i18next.t('yes_and'), weight: 2, addition: questionStrongYes },
    { item: i18next.t('yes_but'), weight: 8, addition: questionWeakYes },
    // { item: i18next.t('no_but'), weight: 4, addition: oracleResultsPlus },
    { item: i18next.t('no_and'), weight: 2, addition: questionStrongNo },
  ];

  const response = weightedRandom(
    type === 'action' ? mainAction : mainQuestion,
    type === 'action' ? 'action' : 'question'
  );

  return response;
};
