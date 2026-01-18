class RandomStory {
  #domains = new Map();

  static rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  add({ domain, label, weight = 1 }) {
    if (!this.#domains.has(domain)) {
      this.#domains.set(domain, []);
    }

    this.#domains.get(domain).push({
      label,
      weight,
    });
  }

  addDomainEntries(domain, entries) {
    for (const { label, weight = 1 } of entries) {
      this.add({ domain, label, weight });
    }
  }

  #totalWeight(domainEntries) {
    return domainEntries.reduce((sum, entry) => sum + entry.weight, 0);
  }

  #weightedPick(domainEntries) {
    const total = this.#totalWeight(domainEntries);
    if (total === 0) return null;

    let random = RandomStory.rand(0, total);
    for (const entry of domainEntries) {
      random -= entry.weight;
      if (random <= 0) return entry;
    }
    return null;
  }

  resolve(sentence = '{{start}}') {
    const resolvePart = (match, name) => {
      const domainEntries = this.#domains.get(name);
      if (!domainEntries) return '...';

      const part = this.#weightedPick(domainEntries);
      if (!part) return '---';

      return this.resolve(part.label);
    };

    let result = sentence.replace(/{{([^>]*)}}/g, resolvePart);

    return result;
  }
}

export default RandomStory;
