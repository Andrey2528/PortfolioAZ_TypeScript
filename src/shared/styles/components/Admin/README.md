# Стилі адмін панелі

## Структура файлів стилів

### Основні файли:

- `AdminGlobal.scss` - Глобальні стилі і utilities
- `AdminDashboard.scss` - Стилі головної панелі
- `AdminDashboardHome.scss` - Стилі головної сторінки
- `AdminUtilities.scss` - Utility класи
- `MigrationModal.scss` - Стилі модального вікна міграції

### Підключення:

Всі стилі автоматично підключаються через:

```scss
// в src/shared/styles/components/Admin/_index_admin.scss
@use 'AdminGlobal';
@use 'AdminDashboard';
@use 'AdminDashboardHome';
// ...інші файли
```

## Основні компоненти стилізації

### 1. Колірна палітра

- **Primary**: `$admin-primary` - синій градієнт
- **Info**: `$admin-info` - фіолетовий градієнт
- **Secondary**: `$admin-secondary` - сірий
- **Background**: `$admin-bg-dark` - темний фон
- **Cards**: `$admin-card-dark` - темні картки
- **Borders**: `$admin-border-dark` - темні границі

### 2. Анімації

```scss
// Доступні анімації:
.fade-in         // Плавне з'явлення
.slide-up        // Підйом знизу
.bounce          // Підскакування
.pulse           // Пульсація
```

### 3. Utility класи

```scss
// Відступи
.mb-1, .mb-2, .mb-3, .mb-4  // margin-bottom
.mt-1, .mt-2, .mt-3, .mt-4  // margin-top
.p-1, .p-2, .p-3, .p-4      // padding

// Текст
.text-center, .text-left, .text-right
.text-success, .text-warning, .text-error, .text-info

// Flex
.d-flex, .justify-center, .align-center
.gap-1, .gap-2, .gap-3, .gap-4

// Ширина
.w-25, .w-50, .w-75, .w-100

// Фон
.bg-card, .bg-primary, .bg-secondary
.bg-success, .bg-warning, .bg-error

// Тіні
.shadow-sm, .shadow, .shadow-lg
```

### 4. Статус індикатори

```scss
.status-indicator.success   // Зелений
.status-indicator.warning   // Жовтий
.status-indicator.error     // Червоний
.status-indicator.info      // Синій
```

### 5. Tooltip

```html
<button class="tooltip" data-tooltip="Текст підказки">Кнопка</button>
```

## Responsive дизайн

### Breakpoints:

- **Mobile**: `max-width: 768px`
- **Tablet**: `max-width: 1024px`
- **Desktop**: `min-width: 1025px`

### Адаптивні зміни:

- Навігація стає вертикальною на мобільних
- Зменшені відступи і шрифти
- Спрощені layout на маленьких екранах

## Покращення UX

### 1. Smooth transitions

Всі інтерактивні елементи мають плавні переходи:

```scss
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### 2. Hover ефекти

- Підйом елементів при hover
- Зміна кольорів і тіней
- Gradient анімації

### 3. Фокус стилі

Покращена доступність з видимими індикаторами фокусу:

```scss
*:focus {
    outline: 2px solid $admin-primary;
    outline-offset: 2px;
}
```

### 4. Loading стани

Спеціальні індикатори завантаження:

```scss
.loading::after {
    // Spinner анімація
}
```

### 5. Scroll стилізація

Кастомні scrollbar з градієнтами що відповідають темі.

## Використання

### Базове використання:

```tsx
import '../../shared/styles/components/Admin/AdminDashboard.scss';

// Всі стилі автоматично застосовуються до елементів з класами:
<div className="admin-dashboard">
    <header className="admin-header">
        <h1>Заголовок</h1>
        <nav className="admin-nav">
            <button className="active">Активна кнопка</button>
        </nav>
    </header>
    <main className="admin-content">Контент</main>
</div>;
```

### Додаткові класи:

```tsx
<div className="d-flex gap-2 justify-center">
    <button className="btn btn-primary pulse">Анімована кнопка</button>
    <span className="status-indicator success">Успішно</span>
</div>
```

Стилі оптимізовані для:
✅ Темної теми
✅ Responsive дизайну  
✅ Smooth анімацій
✅ Доступності
✅ Сучасного UX
