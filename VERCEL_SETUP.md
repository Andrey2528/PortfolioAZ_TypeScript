# Настройка переменных окружения в Vercel

После деплоя проекта в Vercel необходимо добавить переменные окружения в панели управления Vercel.

## Шаги настройки:

1. Перейдите в **Vercel Dashboard** → ваш проект → **Settings** → **Environment Variables**

2. Добавьте следующие переменные:

### Firebase Configuration
```
VITE_FIREBASE_API_KEY = ваш_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN = ваш_проект.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = ваш_project_id
VITE_FIREBASE_STORAGE_BUCKET = ваш_проект.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = ваш_sender_id
VITE_FIREBASE_APP_ID = ваш_app_id
VITE_FIREBASE_MEASUREMENT_ID = ваш_measurement_id
```

### GitHub Configuration (для изображений)
```
VITE_GITHUB_TOKEN = ваш_github_personal_access_token
VITE_GITHUB_REPO = ваш_username/название_репозитория
```

### Admin Configuration
```
VITE_ADMIN_EMAILS = ваш_admin_email@gmail.com
```

## Получение Firebase конфигурации:

1. Перейдите в [Firebase Console](https://console.firebase.google.com/)
2. Выберите ваш проект
3. Настройки проекта → Общие → Ваши приложения
4. Скопируйте значения из конфигурации

## После добавления переменных:

1. Нажмите **Save** для каждой переменной
2. Перейдите в **Deployments**
3. Нажмите **Redeploy** для пересборки с новыми переменными

## Проверка:

После успешного деплоя ошибка "Missing App configuration value: projectId" должна исчезнуть.
