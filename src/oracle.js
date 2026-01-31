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
      { label: i18next.t('Strong yes'), weight: 5 },
      { label: i18next.t('Yes'), weight: 35 },
      { label: i18next.t('Weak yes {{weakYes}}'), weight: 10 },
      { label: i18next.t('No'), weight: 40 },
      { label: i18next.t('Strong no'), weight: 5 },
    ],

    questionLikely: [
      { label: i18next.t('Undecided'), weight: 5 },
      { label: i18next.t('Strong yes'), weight: 5 },
      { label: i18next.t('Yes'), weight: 50 },
      { label: i18next.t('Weak yes {{weakYes}}'), weight: 15 },
      { label: i18next.t('No'), weight: 20 },
      { label: i18next.t('Strong no'), weight: 5 },
    ],

    questionUnlikely: [
      { label: i18next.t('Undecided'), weight: 5 },
      { label: i18next.t('Strong yes'), weight: 5 },
      { label: i18next.t('Yes'), weight: 15 },
      { label: i18next.t('Weak yes {{weakYes}}'), weight: 10 },
      { label: i18next.t('No'), weight: 60 },
      { label: i18next.t('Strong no'), weight: 5 },
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
        label: '{{eventCategory}}',
      },
    ],
    eventCategory: [
      {
        label: `**${i18next.t('event.space.category')}**\n\n{{event_space}}`,
        weight: 1,
      },
      {
        label: `**${i18next.t('event.tech.category')}**\n\n{{event_tech}}`,
        weight: 1,
      },
      {
        label: `**${i18next.t('event.factions.category')}**\n\n{{event_factions}}`,
        weight: 1,
      },
      {
        label: `**${i18next.t('event.mystery.category')}**\n\n{{event_mystery}}`,
        weight: 1,
      },
      {
        label: `**${i18next.t('event.complications.category')}**\n\n{{event_complications}}`,
        weight: 1,
      },
      {
        label: `**${i18next.t('event.personal.category')}**\n\n{{event_personal}}`,
        weight: 1,
      },
    ],
    event_space: [
      { label: i18next.t('event.space.1') },
      { label: i18next.t('event.space.2') },
      { label: i18next.t('event.space.3') },
      { label: i18next.t('event.space.4') },
      { label: i18next.t('event.space.5') },
      { label: i18next.t('event.space.6') },
      { label: i18next.t('event.space.7') },
    ],
    event_tech: [
      { label: i18next.t('event.tech.1') },
      { label: i18next.t('event.tech.2') },
      { label: i18next.t('event.tech.3') },
      { label: i18next.t('event.tech.4') },
      { label: i18next.t('event.tech.5') },
      { label: i18next.t('event.tech.6') },
      { label: i18next.t('event.tech.7') },
    ],
    event_factions: [
      { label: i18next.t('event.factions.1') },
      { label: i18next.t('event.factions.2') },
      { label: i18next.t('event.factions.3') },
      { label: i18next.t('event.factions.4') },
      { label: i18next.t('event.factions.5') },
      { label: i18next.t('event.factions.6') },
      { label: i18next.t('event.factions.7') },
    ],
    event_mystery: [
      { label: i18next.t('event.mystery.1') },
      { label: i18next.t('event.mystery.2') },
      { label: i18next.t('event.mystery.3') },
      { label: i18next.t('event.mystery.4') },
      { label: i18next.t('event.mystery.5') },
      { label: i18next.t('event.mystery.6') },
      { label: i18next.t('event.mystery.7') },
    ],
    event_complications: [
      { label: i18next.t('event.complications.1') },
      { label: i18next.t('event.complications.2') },
      { label: i18next.t('event.complications.3') },
      { label: i18next.t('event.complications.4') },
      { label: i18next.t('event.complications.5') },
      { label: i18next.t('event.complications.6') },
      { label: i18next.t('event.complications.7') },
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
          'Deus ex machina {{inspirationTriplet}}'
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
          'A detail attracts your attention. What is it? {{inspirationTriplet}}'
        ),
      },
      {
        label: i18next.t(
          'A detail calls your attention. What is it? {{inspirationTriplet}}'
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
