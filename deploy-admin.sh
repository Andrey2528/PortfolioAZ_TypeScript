#!/bin/bash

# 🚀 Script для безпечного deploy адмінки на Vercel

echo "🔐 Deploy адмін панелі на Vercel..."

# Перевірка чи існує папка admin
if [ ! -d "admin" ]; then
    echo "❌ Помилка: Папка admin не знайдена!"
    exit 1
fi

# Перевірка environment variables
if [ -z "$VITE_ADMIN_ALLOWED_EMAILS" ]; then
    echo "⚠️  Увага: VITE_ADMIN_ALLOWED_EMAILS не встановлено!"
    echo "   Додайте дозволені email адреси в Vercel Environment Variables"
fi

# Перевірка чи встановлено Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 Встановлюємо Vercel CLI..."
    npm install -g vercel
fi

# Deploy з конфігурацією для адмінки
echo "📤 Deploying admin panel..."
vercel --prod --config vercel.admin.json

echo "✅ Deploy завершено!"
echo ""
echo "📝 Не забудьте:"
echo "   1. Додати VITE_ADMIN_ALLOWED_EMAILS в Vercel Dashboard"
echo "   2. Додати новий домен в Firebase Authorized domains"
echo "   3. Перевірити Firestore Security Rules"
