export const initI18n = () => {
  return new Promise((resolve) => {
    document.addEventListener('DOMContentLoaded', () => {
      i18next
        .use(i18nextHttpBackend)
        .use(i18nextBrowserLanguageDetector)
        .init(
          {
            fallbackLng: 'en',
            debug: true,
            backend: {
              loadPath: '/locales/{{lng}}/{{ns}}.json',
            },
          },
          (err, t) => {
            if (err) return console.error(err);
            //updateContent();
            resolve();
          }
        );

      /*function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach((elem) => {
          elem.innerHTML = i18next.t(elem.getAttribute('data-i18n'));
        });
      }*/
    });
  });
};
