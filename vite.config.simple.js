import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },
    build: {
        minify: 'esbuild',
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    firebase: [
                        'firebase/app',
                        'firebase/firestore',
                        'firebase/auth',
                    ],
                },
            },
        },
    },
    base: '/',
});
