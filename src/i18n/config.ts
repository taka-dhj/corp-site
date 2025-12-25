import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ja from './locales/ja.json';
import en from './locales/en.json';

// URLから言語を検出する関数
const getLanguageFromPath = (): string => {
  const path = window.location.pathname;
  if (path.startsWith('/ja')) {
    return 'ja';
  }
  // デフォルトは英語（プレフィックスなし）
  return 'en';
};

// 初期言語をURLから取得
const initialLanguage = getLanguageFromPath();

i18n
  .use(LanguageDetector) // ブラウザの言語設定を自動検出
  .use(initReactI18next)
  .init({
    resources: {
      ja: {
        translation: ja
      },
      en: {
        translation: en
      }
    },
    fallbackLng: 'en', // デフォルト言語を英語に変更
    lng: initialLanguage, // URLから取得した言語を使用
    interpolation: {
      escapeValue: false // Reactは既にXSS対策済み
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupQuerystring: 'lng'
    }
  });

export default i18n;


