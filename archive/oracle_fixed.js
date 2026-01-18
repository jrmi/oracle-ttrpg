export const ORACLE = {
import { weightedRandom, clone } from './utils.js';
import words from './locales/fr/words.js';

import RandomStory from './story.js';

// Function to pick an oracle
export function oracle(type) {
  const story = new RandomStory();

  // Define all domains

  story.addDomainEntries('weakYes', [
    { label: i18next.t('partially'), weight: 10 },
    { label: i18next.t('temporary'), weight: 10 },
    { label: i18next.t('...'), weight: 10 },
  ]);

  story.addDomainEntries('question5050', [
    { label: i18next.t('Undecided'), weight: 5 },
    { label: i18next.t('Strong yes'), weight: 5 },
    { label: i18next.t('Yes'), weight: 35 },
    { label: i18next.t('Weak yes {{weakYes}}'), weight: 10 },
    { label: i18next.t('No'), weight: 40 },
    { label: i18next.t('Strong no'), weight: 5 },
  ]);

  story.addDomainEntries('questionLikely', [
    { label: i18next.t('Undecided'), weight: 5 },
    { label: i18next.t('Strong yes'), weight: 5 },
    { label: i18next.t('Yes'), weight: 50 },
    { label: i18next.t('Weak yes {{weakYes}}'), weight: 15 },
    { label: i18next.t('No'), weight: 20 },
    { label: i18next.t('Strong no'), weight: 5 },
  ]);

  story.addDomainEntries('questionUnlikely', [
    { label: i18next.t('Undecided'), weight: 5 },
    { label: i18next.t('Strong yes'), weight: 5 },
    { label: i18next.t('Yes'), weight: 15 },
    { label: i18next.t('Weak yes {{weakYes}}'), weight: 10 },
    { label: i18next.t('No'), weight: 60 },
    { label: i18next.t('Strong no'), weight: 5 },
  ]);

  story.addDomainEntries('sceneQuestion', [
    { label: i18next.t('Expected scene'), weight: 50 },
    { label: i18next.t('Alteration: {{sceneAlteration}}'), weight: 30 },
    { label: i18next.t('Random event: {{randomEvent}}'), weight: 20 },
  ]);

  story.addDomainEntries('actionInspiration', [
    {
      label: '{{actionType}} - {{action}} {{focus}}',
    },
  ]);

  story.addDomainEntries('newScene', [
    {
      label: '{{sceneQuestion}} - {{newSceneQuestion}}',
    },
  ]);

  story.addDomainEntries('fullNPC', [
    {
      label:
        '{{name_syllables}} {{name_syllables}} {{name_syllables}} - {{actor}} - {{npc_distinctive_feature}} - {{action}} {{focus}} - {{disposition}}',
    },
  ]);

  story.addDomainEntries('fullLocation', [
    {
      label:
        '{{name_syllables}} {{name_syllables}} {{name_syllables}} - {{location}} - {{location_qualifier}} - {{inspiration}}, {{inspiration}}',
    },
  ]);

  story.addDomainEntries('fullPlot', [
    {
      label: '{{plot_actor}} {{action}} {{focus}} pour {{motivation}}',
    },
  ]);

  story.addDomainEntries('spark', [
    { label: '1', weight: 1 },
    { label: '2', weight: 2 },
    { label: '3', weight: 3 },
    { label: '4', weight: 4 },
    { label: '5', weight: 5 },
    { label: '6', weight: 6 },
  ]);

  story.addDomainEntries('actionType', [
    { label: i18next.t('Use your heart'), weight: 1 },
    { label: i18next.t('Use your head'), weight: 1 },
    { label: i18next.t('Use your mouth'), weight: 1 },
    { label: i18next.t('Use your guts'), weight: 1 },
    { label: i18next.t('Use your muscles'), weight: 1 },
    { label: i18next.t('Use your soul'), weight: 1 },
  ]);
  story.addDomainEntries('sceneAlteration', [
    { label: i18next.t('Increase tension'), weight: 1 },
    { label: i18next.t('Decrease tension'), weight: 1 },
    { label: i18next.t('Location less favorable'), weight: 1 },
    { label: i18next.t('Location more favorable'), weight: 1 },
    {
      label: i18next.t('Introduce goods news ({{inspiration}}, {{inspiration}})'),
      weight: 1,
    },
    {
      label: i18next.t('Introduce bad news ({{inspiration}}, {{inspiration}})'),
      weight: 1,
    },
    {
      label: i18next.t('Bring someone good ({{inspiration}}, {{inspiration}})'),
      weight: 1,
    },
    {
      label: i18next.t('Bring someone bad ({{inspiration}}, {{inspiration}})'),
      weight: 1,
    },
  ]);
  story.addDomainEntries('randomEvent', [
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
        'Deus ex machina ({{inspiration}}, {{inspiration}}, {{inspiration}})'
      ),
      weight: 1,
    },
  ]);

  story.addDomainEntries('newSceneQuestion', [
    {
      label: i18next.t('Describe what you see. ({{inspiration}}, {{inspiration}})'),
    },
    {
      label: i18next.t(
        'A detail attract your attention. What is it? ({{inspiration}}, {{inspiration}})'
      ),
    },
    {
      label: i18next.t(
        'A detail attracts your attention. What is it? ({{inspiration}}, {{inspiration}})'
      ),
    },
    {
      label: i18next.t(
        'A detail calls your attention. What is it? ({{inspiration}}, {{inspiration}})'
      ),
    },
    {
      label: i18next.t('Narrate a memory. ({{inspiration}}, {{inspiration}})'),
    },
    {
      label: i18next.t(
        'Something is dangerous here, what is it? ({{inspiration}}, {{inspiration}})'
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
        'Describe what you hear. ({{inspiration}}, {{inspiration}})'
      ),
    },
    {
      label: i18next.t(
        'Describe what you smell. ({{inspiration}}, {{inspiration}})'
      ),
    },
    {
      label: i18next.t('Describe how you feel.'),
    },
  ]);

  Object.entries(words).forEach(([theme, values]) => {
    story.addDomainEntries(
      theme,
      values.map((word) => ({
        label: word.replace(/^./, (l) => l.toUpperCase()),
        weight: 1,
      }))
    );
  });

  return story.resolve(`{{${type}}}`, { tags: [] });
}
};
