import { useState, useEffect } from 'react';

export type Language = 'zh' | 'en';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // 检查本地存储
    const saved = localStorage.getItem('simpletron-language');
    if (saved === 'zh' || saved === 'en') {
      return saved;
    }
    
    // 根据浏览器语言环境自动选择
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('zh') ? 'zh' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('simpletron-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return { language, setLanguage, toggleLanguage };
};