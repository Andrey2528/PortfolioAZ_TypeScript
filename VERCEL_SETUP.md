# Настройка переменных окружения в Vercel

После деплоя проекта в Vercel необходимо добавить переменные окружения в панели управления Vercel.

## 🚀 Быстрая настройка:

1. Перейдите в **Vercel Dashboard** → ваш проект → **Settings** → **Environment Variables**

2. Добавьте следующие переменные **одну за одной**:

### Firebase Configuration (обязательно для работы сайта)

Скопируйте значения из вашего `.env.local`:

| Название переменной | Значение | Environment |
|-------------------|----------|-------------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyBlaWk2-9QcKr3ZlMayKRYkBfM2djMt9x0` | Production, Preview, Development |
| `VITE_FIREBASE_AUTH_DOMAIN` | `portfoliodata-b2881.firebaseapp.com` | Production, Preview, Development |
| `VITE_FIREBASE_PROJECT_ID` | `portfoliodata-b2881` | Production, Preview, Development |
| `VITE_FIREBASE_STORAGE_BUCKET` | `portfoliodata-b2881.firebasestorage.app` | Production, Preview, Development |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `156480428499` | Production, Preview, Development |
| `VITE_FIREBASE_APP_ID` | `1:156480428499:web:2a9f87458051186efdf726` | Production, Preview, Development |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-0EPPF0E9CE` | Production, Preview, Development |

## 📝 Как добавить переменную:
1. Нажмите **"Add New"**
2. **Name**: введите название (например: `VITE_FIREBASE_API_KEY`)  
3. **Value**: вставьте значение
4. **Environments**: выберите все три: Production, Preview, Development
5. Нажмите **Save**

## 🔄 После добавления всех переменных:
1. Перейдите в **Deployments**
2. Найдите последний деплой
3. Нажмите **"Redeploy"** → **"Use existing Build Cache"**

## ✅ Проверка:
После успешного редеплоя ошибка "Missing App configuration value: projectId" должна исчезнуть, и сайт будет работать полностью.

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
