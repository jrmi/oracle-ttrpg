import enWords from '../locales/en/words.js';
import frWords from '../locales/fr/words.js';

import story from './story.js';

const getWords = () => {
  const resolved = i18next?.resolvedLanguage || i18next?.language || 'en';
  const base = resolved.split('-')[0];
  return base === 'fr' ? frWords : enWords;
};

export function oracle(type) {
  const data = {
    weakYes: [
      { label: i18next.t('oracle.weak_yes.partially'), weight: 10 },
      { label: i18next.t('oracle.weak_yes.temporary'), weight: 10 },
      { label: i18next.t('oracle.weak_yes.ellipsis'), weight: 10 },
    ],

    question5050: [
      { label: i18next.t('oracle.answer.undecided'), weight: 5 },

      { label: i18next.t('oracle.answer.strong_yes'), weight: 10 },
      { label: i18next.t('oracle.answer.yes'), weight: 35 },
      { label: i18next.t('oracle.answer.weak_yes'), weight: 10 },

      { label: i18next.t('oracle.answer.no'), weight: 35 },
      { label: i18next.t('oracle.answer.strong_no'), weight: 5 },
    ],

    questionLikely: [
      { label: i18next.t('oracle.answer.undecided'), weight: 5 },

      { label: i18next.t('oracle.answer.strong_yes'), weight: 10 },
      { label: i18next.t('oracle.answer.yes'), weight: 45 },
      { label: i18next.t('oracle.answer.weak_yes'), weight: 15 },

      { label: i18next.t('oracle.answer.no'), weight: 20 },
      { label: i18next.t('oracle.answer.strong_no'), weight: 5 },
    ],

    questionUnlikely: [
      { label: i18next.t('oracle.answer.undecided'), weight: 5 },

      { label: i18next.t('oracle.answer.strong_yes'), weight: 5 },
      { label: i18next.t('oracle.answer.yes'), weight: 15 },
      { label: i18next.t('oracle.answer.weak_yes'), weight: 10 },

      { label: i18next.t('oracle.answer.no'), weight: 55 },
      { label: i18next.t('oracle.answer.strong_no'), weight: 10 },
    ],

    level: [
      { label: '➕➕', weight: 5 },
      { label: '➕', weight: 20 },
      { label: '👌', weight: 50 },
      { label: '➖', weight: 20 },
      { label: '➖➖', weight: 5 },
    ],


    sceneQuestion: [
      { label: i18next.t('oracle.scene.expected'), weight: 50 },
      { label: i18next.t('oracle.scene.alteration_seed'), weight: 30 },
      { label: i18next.t('oracle.scene.random_event_seed'), weight: 20 },
    ],

    inspirationSeed: [
      {
        label: i18next.t('oracle.seed.inspiration'),
      },
    ],

    actionInspiration: [
      {
        label: i18next.t('oracle.seed.action_inspiration'),
      },
    ],

    eventSeed: [
      {
        label: '{{eventCategory}}\n\n{{inspirationTriplet}}',
      },
    ],
    eventCategory: [
      {
        label: `**${i18next.t('event.environment.category')}**\n\n{{event_environment}}`,
        weight: 1,
      },
      {
        label: `**${i18next.t('event.setback.category')}**\n\n{{event_setback}}`,
        weight: 1,
      },
      {
        label: `**${i18next.t('event.revelation.category')}**\n\n{{event_revelation}}`,
        weight: 1,
      },
      {
        label: `**${i18next.t('event.npc.category')}**\n\n{{event_npc}}`,
        weight: 1,
      },
      {
        label: `**${i18next.t('event.faction.category')}**\n\n{{event_faction}}`,
        weight: 1,
      },
      {
        label: `**${i18next.t('event.personal.category')}**\n\n{{event_personal}}`,
        weight: 1,
      },
    ],
    event_environment: [
      { label: i18next.t('event.environment.1') },
      { label: i18next.t('event.environment.2') },
      { label: i18next.t('event.environment.3') },
      { label: i18next.t('event.environment.4') },
      { label: i18next.t('event.environment.5') },
      { label: i18next.t('event.environment.6') },
      { label: i18next.t('event.environment.7') },
    ],
    event_setback: [
      { label: i18next.t('event.setback.1') },
      { label: i18next.t('event.setback.2') },
      { label: i18next.t('event.setback.3') },
      { label: i18next.t('event.setback.4') },
      { label: i18next.t('event.setback.5') },
      { label: i18next.t('event.setback.6') },
      { label: i18next.t('event.setback.7') },
    ],
    event_revelation: [
      { label: i18next.t('event.revelation.1') },
      { label: i18next.t('event.revelation.2') },
      { label: i18next.t('event.revelation.3') },
      { label: i18next.t('event.revelation.4') },
      { label: i18next.t('event.revelation.5') },
      { label: i18next.t('event.revelation.6') },
      { label: i18next.t('event.revelation.7') },
    ],
    event_npc: [
      { label: i18next.t('event.npc.1') },
      { label: i18next.t('event.npc.2') },
      { label: i18next.t('event.npc.3') },
      { label: i18next.t('event.npc.4') },
      { label: i18next.t('event.npc.5') },
      { label: i18next.t('event.npc.6') },
      { label: i18next.t('event.npc.7') },
    ],
    event_faction: [
      { label: i18next.t('event.faction.1') },
      { label: i18next.t('event.faction.2') },
      { label: i18next.t('event.faction.3') },
      { label: i18next.t('event.faction.4') },
      { label: i18next.t('event.faction.5') },
      { label: i18next.t('event.faction.6') },
      { label: i18next.t('event.faction.7') },
    ],
    event_personal: [
      { label: i18next.t('event.personal.1') },
      { label: i18next.t('event.personal.2') },
      { label: i18next.t('event.personal.3') },
      { label: i18next.t('event.personal.4') },
      { label: i18next.t('event.personal.5') },
      { label: i18next.t('event.personal.6') },
      { label: i18next.t('event.personal.7') },
    ],

    newScene: [
      {
        label: '{{sceneQuestion}}\n\n{{newSceneQuestion}}',
      },
    ],

    fullNPC: [
      {
        label: i18next.t('oracle.seed.npc'),
      },
    ],

    fullLocation: [
      {
        label: i18next.t('oracle.seed.location'),
      },
    ],

    fullPlot: [
      {
        label: i18next.t('oracle.seed.plot'),
      },
    ],

    inspirationTriplet: [{
          label: '({{inspiration}}, {{inspiration}}, {{inspiration}})',
          weight: 1,
      },
    ],

    actionType: [
      { label: i18next.t('oracle.action.use_heart'), weight: 1 },
      { label: i18next.t('oracle.action.use_head'), weight: 1 },
      { label: i18next.t('oracle.action.use_mouth'), weight: 1 },
      { label: i18next.t('oracle.action.use_guts'), weight: 1 },
      { label: i18next.t('oracle.action.use_muscles'), weight: 1 },
    ],
    sceneAlteration: [
      { label: i18next.t('oracle.alteration.increase_tension'), weight: 1 },
      { label: i18next.t('oracle.alteration.decrease_tension'), weight: 1 },
      { label: i18next.t('oracle.alteration.location_less'), weight: 1 },
      { label: i18next.t('oracle.alteration.location_more'), weight: 1 },
      {
        label: i18next.t('oracle.alteration.good_news'),
        weight: 1,
      },
      {
        label: i18next.t('oracle.alteration.bad_news'),
        weight: 1,
      },
      {
        label: i18next.t('oracle.alteration.bring_good'),
        weight: 1,
      },
      {
        label: i18next.t('oracle.alteration.bring_bad'),
        weight: 1,
      },
    ],
    randomEvent: [
      {
        label: i18next.t('oracle.random.foreshadow_trouble'),
        weight: 1,
      },
      {
        label: i18next.t('oracle.random.add_npc'),
        weight: 1,
      },
      {
        label: i18next.t('oracle.random.npc_action'),
        weight: 1,
      },
      {
        label: i18next.t('oracle.random.advance_threat'),
        weight: 1,
      },
      {
        label: i18next.t('oracle.random.advance_plot'),
        weight: 1,
      },
      {
        label: i18next.t('oracle.random.deus_ex_machina'),
        weight: 1,
      },
    ],

    newSceneQuestion: [
      {
        label: i18next.t('prompt.describe.see'),
      },
      {
        label: i18next.t('prompt.detail.attention'),
      },
      {
        label: i18next.t('prompt.memory'),
      },
      {
        label: i18next.t('prompt.danger'),
      },
      {
        label: i18next.t('prompt.foreshadow'),
      },
      {
        label: i18next.t('prompt.missing'),
      },
      {
        label: i18next.t('prompt.describe.hear'),
      },
      {
        label: i18next.t('prompt.describe.smell'),
      },
      {
        label: i18next.t('prompt.describe.feel'),
      },
    ],
  };

  Object.assign(
    data,
    Object.fromEntries(
    Object.entries(getWords()).map(([theme, values]) => [
      theme,
      values.map((word) => ({
        label: word,
          weight: 1,
        })),
      ])
    )
  );

  return story(`{{${type}}}`, data);
}
