# Інструкція по імпорту перекладів до Firebase

## 📋 Що робить функція імпорту:

Функція `importTranslationsToFirebase()` автоматично:

1. **Читає ваші JSON файли перекладів:**

    - `src/locales/uk/translation.json`
    - `src/locales/en/translation.json`
    - `src/locales/ru/translation.json`

2. **Конвертує вкладені об'єкти в плоскі ключі:**

    ```json
    // З цього:
    {
      "portfolioCard": {
        "title": {
          "title1": "Denis Portfolio"
        }
      }
    }

    // В це:
    "portfolioCard.title.title1": "Denis Portfolio"
    ```

3. **Створює документи в Firebase Firestore:**
    ```typescript
    {
      id: "portfolioCard_title_title1", // автогенерований ID
      key: "portfolioCard.title.title1",
      uk: "Denis Portfolio",
      en: "Denis Portfolio",
      ru: "Denis Portfolio",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ```

## 🚀 Як використовувати:

### 1. Через адмін-панель (Рекомендується):

- Відкрийте адмін-панель
- Перейдіть на вкладку "Переводы"
- Натисніть кнопку "📤 Імпорт з JSON"
- Підтвердьте імпорт

### 2. Програмно (для розробників):

```typescript
import { importTranslationsToFirebase } from './api/connectDB/translationImporter';

const importTranslations = async () => {
    try {
        const result = await importTranslationsToFirebase();
        console.log(`Імпортовано ${result.success} перекладів`);

        if (result.errors.length > 0) {
            console.warn('Помилки:', result.errors);
        }
    } catch (error) {
        console.error('Помилка імпорту:', error);
    }
};
```

## ⚠️ Важливо:

1. **Backup існуючих даних** перед імпортом
2. **Firebase Rules** повинні бути налаштовані для колекції `translations`
3. **Дублікати** будуть перезаписані новими даними
4. Функція автоматично **оновлює i18n** після імпорту

## 📊 Приклад структури даних після імпорту:

Ваші переклади з файлу:

```json
{
    "navMenu": {
        "logo": "Андрій Жуков",
        "link1": "Фронт-енд Розробник"
    },
    "portfolioCard": {
        "title": {
            "title1": "Denis Portfolio",
            "title2": "Konstruct"
        }
    }
}
```

Стануть документами в Firebase:

```
translations/navMenu_logo
translations/navMenu_link1
translations/portfolioCard_title_title1
translations/portfolioCard_title_title2
```

## 🔄 Автоматичне оновлення:

Після імпорту ваш сайт автоматично:

- Перезавантажить переклади з Firebase
- Оновить i18next ресурси
- Застосує нові переклади без перезавантаження сторінки

## ✅ Результат:

Тепер ви можете:

- Редагувати переклади через адмін-панель
- Додавати нові переклади онлайн
- Змінювати переклади без релізу коду
- Експортувати оновлені переклади назад в JSON
