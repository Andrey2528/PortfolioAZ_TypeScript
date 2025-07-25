import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [
        react(),
        compression(),
        // Відключаємо visualizer для production builds на Vercel
        process.env.NODE_ENV !== 'production' && visualizer(),
    ].filter(Boolean),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },
    build: {
        minify: 'esbuild',
        // Збільшуємо ліміт для chunk warnings
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom', 'react-router-dom'],
                    motion: ['framer-motion'],
                    firebase: ['firebase/app', 'firebase/firestore'],
                },
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-router-dom': 'ReactRouterDOM',
                },
            },
        },
    },
    base: '/', // Для Vercel
});
