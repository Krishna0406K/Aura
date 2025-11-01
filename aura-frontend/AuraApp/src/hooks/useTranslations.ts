import { useContext, useMemo } from 'react';
import { getTranslations, AppTranslations } from '../services/translations';


export const useTranslations = (): AppTranslations => {
  // Mock user data since auth is removed
  const user = { preferredLanguage: 'en-US' };
  
  const translations = useMemo(() => {
    const language = user?.preferredLanguage || 'en-US';
    return getTranslations(language);
  }, [user?.preferredLanguage]);
  
  return translations;
};