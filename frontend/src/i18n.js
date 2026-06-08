import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      "nav_home": "Главная",
      "nav_codes": "Коды",
      "nav_patchlog": "Патчлог",
      "nav_admin": "Админ",
      "main_team": "Основная команда разработчиков",
      "releases": "Релизы",
      "in_dev": "В разработке",
      "archive": "Архив и Наследие",
      "no_releases": "Пока нет релизов",
      "no_dev": "Все проекты завершены или заморожены",
      "no_archive": "Архив пуст",
      "community": "Сообщество",
      "status_rel": "Релиз",
      "status_dev": "Разработка",
      "status_arc": "Архив",
      "footer": "© 2026 SwampTeam. Глубоко в болотах геймдева.",
      "status_active": "Активен",
      "status_inactive": "Неактивен",
      "codes_hero_title": "Коды",
    "codes_hero_subtitle": "Промокоды проектов SwampTeam",
    "patch_hero_title": "Патчлоги",
    "patch_hero_subtitle": "История обновлений SwampTeam",
    }
  },
  en: {
    translation: {
      "nav_home": "Home",
      "nav_codes": "Codes",
      "nav_patchlog": "Patchlog",
      "nav_admin": "Admin",
      "main_team": "Main Development Team",
      "releases": "Releases",
      "in_dev": "In Development",
      "archive": "Archive & Legacy",
      "no_releases": "No releases yet",
      "no_dev": "All projects are finished or frozen",
      "no_archive": "Archive is empty",
      "community": "Community",
      "status_rel": "Release",
      "status_dev": "In Dev",
      "status_arc": "Archive",
      "footer": "© 2026 SwampTeam. Deep in the marshes of game dev.",
      "status_active": "Active",
      "status_inactive": "Inactive",
      "codes_hero_title": "Codes",
    "codes_hero_subtitle": "SwampTeam games codes",
    "patch_hero_title": "Patchlog",
    "patch_hero_subtitle": "SwampTeam update history",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru", // Язык по умолчанию
    fallbackLng: "ru",
    interpolation: { escapeValue: false }
  });

export default i18n;