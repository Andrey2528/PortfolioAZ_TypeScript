import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

const isAdmin = process.env.VITE_APP === 'admin';

export default defineConfig({
    root: isAdmin ? path.resolve(__dirname, './admin') : __dirname,
    plugins: [
        react(),
        compression(),
        !isAdmin && process.env.NODE_ENV !== 'production' && visualizer(),
    ].filter(Boolean),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
            '@admin': path.resolve(__dirname, './admin/src'), // або './admin', якщо shared не в src
            '@root': path.resolve(__dirname, './src'),
        },
    },
    build: {
        minify: 'esbuild',
        chunkSizeWarningLimit: 1000,
        outDir: isAdmin
            ? path.resolve(__dirname, './admin/dist')
            : path.resolve(__dirname, './dist'),
        emptyOutDir: true,
        rollupOptions: !isAdmin
            ? {
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
              }
            : {},
    },
    server: {
        port: isAdmin ? 5174 : 5173,
        open: true,
        fs: {
            allow: [path.resolve(__dirname)],
        },
    },
    base: '/',
});
