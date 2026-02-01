function weightedChoice(options) {
  const totalWeight = options.reduce(
    (sum, option) => sum + (option.weight ?? 1),
    0
  );
  let r = Math.random() * totalWeight;
  for (const { label, weight = 1 } of options) {
    if (r < weight) return label;
    r -= weight;
  }
}

export default function story(text, data) {
  const pattern = /{{(.*?)}}/;

  while (true) {
    const match = text.match(pattern);
    if (!match) break;

    const key = match[1];
    if (!data[key]) {
      throw new Error(`Unknown key: ${key}`);
    }
    const replacement = weightedChoice(data[key]);
    const resolvedReplacement = story(replacement, data);
    text =
      text.slice(0, match.index) +
      resolvedReplacement +
      text.slice(match.index + match[0].length);
  }

  return text;
}
