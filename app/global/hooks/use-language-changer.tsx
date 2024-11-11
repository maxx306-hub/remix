import {useLocation} from '@remix-run/react';
import {useTranslation} from 'react-i18next';

import {Language} from '~/localization/resource';

import {useI18nNavigate} from './use-i18n-navigate';

export const useLanguageChanger = () => {
  const {i18n} = useTranslation();
  const location = useLocation();
  const navigate = useI18nNavigate();

  const getLanguageURL = (lang: Language) => {
    const current = String(location.pathname).replace(/^\/(en|ar)/, '');

    return '/' + lang + current + location.search; // + location.hash;
  };

  const changeLanguage = (lang: Language) => {
    navigate(getLanguageURL(lang), {replace: true});
  };

  return {current: i18n.language, changeLanguage, getLanguageURL};
};
