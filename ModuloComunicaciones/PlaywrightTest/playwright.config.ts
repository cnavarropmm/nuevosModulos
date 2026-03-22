import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env.test'), override: true });

export default defineConfig({
    timeout: 240000,
    expect: { timeout: 20000 },
    testDir: './tests',
    workers: process.env.CI ? 1 : undefined,
    retries: process.env.CI ? 2 :0,

    reporter: [
        ['html', { open: 'never' }], // Genera la carpeta 'playwright-report'
        ['line'], // Para ver progreso en consola
        ['allure-playwright', { outputFolder: 'allure-results' }] // El generador de Allure
    ],
    use: {
        actionTimeout: 30000,
        navigationTimeout: 45000,
        screenshot: 'only-on-failure',
        video: 'on',
        trace: 'on-first-retry',
        launchOptions: {
        //slowMo: 1000, 
    },

    },
    projects: [
      
        /* 🖥️ Escritorio*/
        {
            name: 'chromium',
            testMatch: '**/*.spec.ts',
            use: { ...devices['Desktop Chrome'],
            },
            
        },
 //       {
 //         name: 'firefox',
 //         testMatch: '**/*.spec.ts',
 //         use: { ...devices['Desktop Firefox'],
 //             storageState: AUTH_PATH,
 //          },
 //          dependencies: ['setup']
 //     },
 //     {
 //         name: 'webkit',
 //         testMatch: '**/*.spec.ts',
 //         use: { ...devices['Desktop Safari'],
 //             storageState: AUTH_PATH,
 //             ignoreHTTPSErrors: true
 //          },
 //          dependencies: ['setup']
 //         
 //     },

        /* 📱 Mobile: Tu configuración está excelente aquí 
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 13'] },
        },
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        }, */
    ],
});
