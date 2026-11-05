import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../../../../translations/en-US.json';
import translationNL from '../../../../translations/nl-NL.json';

const resources = {
  en: {
    translation: translationEN,
  },
  nl: {
    translation: translationNL,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'nl',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
