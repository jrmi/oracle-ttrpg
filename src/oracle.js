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
      { label: i18next.t('partially'), weight: 10 },
      { label: i18next.t('temporary'), weight: 10 },
      { label: i18next.t('...'), weight: 10 },
    ],

    question5050: [
      { label: i18next.t('Undecided'), weight: 5 },

      { label: i18next.t('Strong yes'), weight: 10 },
      { label: i18next.t('Yes'), weight: 35 },
      { label: i18next.t('Weak yes {{weakYes}}'), weight: 10 },

      { label: i18next.t('No'), weight: 35 },
      { label: i18next.t('Strong no'), weight: 5 },
    ],

    questionLikely: [
      { label: i18next.t('Undecided'), weight: 5 },

      { label: i18next.t('Strong yes'), weight: 10 },
      { label: i18next.t('Yes'), weight: 45 },
      { label: i18next.t('Weak yes {{weakYes}}'), weight: 15 },

      { label: i18next.t('No'), weight: 20 },
      { label: i18next.t('Strong no'), weight: 5 },
    ],

    questionUnlikely: [
      { label: i18next.t('Undecided'), weight: 5 },

      { label: i18next.t('Strong yes'), weight: 5 },
      { label: i18next.t('Yes'), weight: 15 },
      { label: i18next.t('Weak yes {{weakYes}}'), weight: 10 },

      { label: i18next.t('No'), weight: 55 },
      { label: i18next.t('Strong no'), weight: 10 },
    ],

    level: [
      { label: '➕➕', weight: 5 },
      { label: '➕', weight: 20 },
      { label: '👌', weight: 50 },
      { label: '➖', weight: 20 },
      { label: '➖➖', weight: 5 },
    ],


    sceneQuestion: [
      { label: i18next.t('Expected scene'), weight: 50 },
      { label: i18next.t('Alteration seed'), weight: 30 },
      { label: i18next.t('Random event seed'), weight: 20 },
    ],

    inspirationSeed: [
      {
        label: i18next.t('Inspiration seed'),
      },
    ],

    actionInspiration: [
      {
        label: i18next.t('Action inspiration seed'),
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
        label:i18next.t(
          'NPC seed'
        ),
      },
    ],

    fullLocation: [
      {
        label:i18next.t(
          'Location seed'
        ),
          
      },
    ],

    fullPlot: [
      {
        label: i18next.t(
          'Plot seed'
        ),
      },
    ],

    inspirationTriplet: [{
          label: '({{inspiration}}, {{inspiration}}, {{inspiration}})',
          weight: 1,
      },
    ],

    actionType: [
      { label: i18next.t('Use heart'), weight: 1 },
      { label: i18next.t('Use head'), weight: 1 },
      { label: i18next.t('Use mouth'), weight: 1 },
      { label: i18next.t('Use guts'), weight: 1 },
      { label: i18next.t('Use muscles'), weight: 1 },
    ],
    sceneAlteration: [
      { label: i18next.t('Increase tension'), weight: 1 },
      { label: i18next.t('Decrease tension'), weight: 1 },
      { label: i18next.t('Location less favorable'), weight: 1 },
      { label: i18next.t('Location more favorable'), weight: 1 },
      {
        label: i18next.t(
          'Introduce goods news {{inspirationTriplet}}'
        ),
        weight: 1,
      },
      {
        label: i18next.t(
          'Introduce bad news {{inspirationTriplet}}'
        ),
        weight: 1,
      },
      {
        label: i18next.t(
          'Bring someone good {{inspirationTriplet}}'
        ),
        weight: 1,
      },
      {
        label: i18next.t(
          'Bring someone bad {{inspirationTriplet}}'
        ),
        weight: 1,
      },
    ],
    randomEvent: [
      {
        label: i18next.t('Foreshadow trouble ({{action}}, {{focus}})'),
        weight: 1,
      },
      {
        label: i18next.t('Add new NPC'),
        weight: 1,
      },
      {
        label: i18next.t('An NPC takes action ({{action}}, {{focus}})'),
        weight: 1,
      },
      {
        label: i18next.t('Advance a threat'),
        weight: 1,
      },
      {
        label: i18next.t('Advance a plot'),
        weight: 1,
      },
      {
        label: i18next.t(
          'Deus ex machina. {{inspirationTriplet}}'
        ),
        weight: 1,
      },
    ],

    newSceneQuestion: [
      {
        label: i18next.t(
          'Describe what you see. {{inspirationTriplet}}'
        ),
      },
      {
        label: i18next.t(
          'A detail attract your attention. What is it? {{inspirationTriplet}}'
        ),
      },
      {
        label: i18next.t(
          'Narrate a memory. {{inspirationTriplet}}'
        ),
      },
      {
        label: i18next.t(
          'Something is dangerous here, what is it? {{inspirationTriplet}}'
        ),
      },
      {
        label: i18next.t('Foreshadow what is about to happen.'),
      },
      {
        label: i18next.t('Your are missing something or someone. Who is it?'),
      },
      {
        label: i18next.t(
          'Describe what you hear. {{inspirationTriplet}}'
        ),
      },
      {
        label: i18next.t(
          'Describe what you smell. {{inspirationTriplet}}'
        ),
      },
      {
        label: i18next.t('Describe how you feel.'),
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
