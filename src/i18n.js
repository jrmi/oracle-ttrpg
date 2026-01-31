export const initI18n = () => {
  return new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', () => {
      i18next
        .use(i18nextHttpBackend)
        .use(i18nextBrowserLanguageDetector)
        .init(
          {
            fallbackLng: {
              'fr-FR': ['fr'],
              default: ['en'],
            },
            supportedLngs: ['en', 'fr'],
            nonExplicitSupportedLngs: true,
            debug: false,
            backend: {
              loadPath: '/locales/{{lng}}/{{ns}}.json',
            },
            detection: {
              order: [
                'querystring',
                'cookie',
                'localStorage',
                'navigator',
                'htmlTag',
                'path',
                'subdomain',
              ],
              caches: ['localStorage', 'cookie'],
            },
          },
          (err, t) => {
            resolve(err);
          }
        );
    });
  });
};
