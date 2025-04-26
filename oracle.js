import { weightedRandom, clone } from './utils.js';
import words from './locales/fr/words.js';

export const oracle = (type) => {
  const actionStrongYes = [
    {
      item: i18next.t('special_yes'),
      weight: 50,
      help: i18next.t('explain_special_yes'),
      noRepeat: true,
    },
    {
      item: i18next.t('momentum'),
      weight: 10,
      help: i18next.t('explain_momentum'),
      noRepeat: true,
    },
    { item: i18next.t('upcoming_windfall'), weight: 10, noRepeat: true },
    { item: i18next.t('heroic_action'), weight: 2, noRepeat: true },
  ];

  const actionWeakYes = [
    { item: i18next.t('partially'), weight: 10, noRepeat: true },
    { item: i18next.t('temporary'), weight: 10, noRepeat: true },
    { item: i18next.t('if_consume_resource'), weight: 10, noRepeat: true },
  ];

  const payPrice = [
    {
      item: i18next.t('special_no'),
      weight: 50,
      help: i18next.t('explain_special_no'),
      noRepeat: true,
    },
    {
      item: i18next.t('upcoming_problem'),
      weight: 10,
      help: i18next.t('explain_upcoming_problem'),
      noRepeat: true,
    },
    {
      item: i18next.t('betrayal'),
      weight: 10,
      help: i18next.t('explain_betrayal'),
      noRepeat: true,
    },
    { item: i18next.t('consume_resource'), weight: 10, noRepeat: true },
  ];

  const mainAction = [
    {
      item: i18next.t('ask_another_question'),
      weight: 4,
      help: i18next.t('explain_ask_another_question'),
      noRepeat: true,
    },
    { item: i18next.t('strong_yes'), weight: 5, addition: actionStrongYes },
    { item: i18next.t('yes'), weight: 33 },
    { item: i18next.t('weak_yes'), weight: 10, addition: actionWeakYes },
    { item: i18next.t('no'), weight: 33 },
    { item: i18next.t('strong_no'), weight: 5, addition: payPrice },
  ];

  const mainActionLikely = clone(mainAction);
  const mainActionUnlikely = clone(mainAction);

  mainActionLikely[1].weight = 15; // Yes and
  mainActionLikely[2].weight = 25; // Yes
  mainActionLikely[4].weight = 15; // No
  mainActionLikely[5].weight = 5; // No and

  mainActionUnlikely[1].weight = 5; // Yes and
  mainActionUnlikely[2].weight = 15; // Yes
  mainActionUnlikely[4].weight = 25; // No
  mainActionUnlikely[5].weight = 15; // No and

  const questionWeakYes = [
    { item: i18next.t('partially'), weight: 2, noRepeat: true },
    { item: i18next.t('temporary'), weight: 2, noRepeat: true },
    { item: i18next.t('costly'), weight: 2, noRepeat: true },
  ];

  const mainQuestion5050 = [
    {
      item: i18next.t('ask_another_question'),
      weight: 5,
      help: i18next.t('explain_ask_another_question'),
      noRepeat: true,
    },
    { item: i18next.t('strong_yes'), weight: 5 },
    { item: i18next.t('yes'), weight: 35 },
    { item: i18next.t('weak_yes'), weight: 10, addition: questionWeakYes },
    { item: i18next.t('no'), weight: 40 },
    { item: i18next.t('strong_no'), weight: 5 },
  ];

  const mainQuestionLikely = clone(mainQuestion5050);
  const mainQuestionUnlikely = clone(mainQuestion5050);

  mainQuestionLikely[2].weight = 50;
  mainQuestionLikely[3].weight = 15;
  mainQuestionLikely[4].weight = 20;

  mainQuestionUnlikely[2].weight = 15;
  mainQuestionUnlikely[4].weight = 60;

  const unexpected = [
    { item: i18next.t('new_opposition'), weight: 2, noRepeat: true },
    { item: i18next.t('new_helper'), weight: 2, noRepeat: true },
    { item: i18next.t('location_dangerous'), weight: 2, noRepeat: true },
    { item: i18next.t('change_location'), weight: 2, noRepeat: true },
    {
      item: i18next.t('betrayal'),
      weight: 2,
      help: i18next.t('explain_betrayal'),
      noRepeat: true,
    },
  ];

  const sceneQuestion = [
    { item: i18next.t('as_planned'), weight: 60 },
    { item: i18next.t('unexpected_event'), weight: 40, addition: unexpected },
  ];

  const resourceQuestion5050 = [
    { item: i18next.t('yes'), weight: 30 },
    { item: i18next.t('weak_yes'), weight: 20, addition: questionWeakYes },
    { item: i18next.t('no'), weight: 30 },
  ];

  const spark = [
    { item: '1', weight: 1 },
    { item: '2', weight: 2 },
    { item: '3', weight: 3 },
    { item: '4', weight: 4 },
    { item: '5', weight: 5 },
    { item: '6', weight: 6 },
  ];

  const actionType = [
    { item: i18next.t('heart'), weight: 1 },
    { item: i18next.t('head'), weight: 1 },
    { item: i18next.t('mouth'), weight: 1 },
    { item: i18next.t('guts'), weight: 1 },
    { item: i18next.t('hands'), weight: 1 },
    { item: i18next.t('soul'), weight: 1 },
  ];

  const types = {
    action5050: mainAction,
    actionLikely: mainActionLikely,
    actionUnlikely: mainActionUnlikely,
    question5050: mainQuestion5050,
    questionLikely: mainQuestionLikely,
    questionUnlikely: mainQuestionUnlikely,
    sceneQuestion,
    spark,
    actionType,
  };

  Object.entries(words).forEach(([theme, values]) => {
    types[theme] = values.map((word) => ({
      item: word.replace(/^./, (l) => l.toUpperCase()),
      weight: 1,
      noRepeat: true,
    }));
  });

  return weightedRandom(types[type]);
};
