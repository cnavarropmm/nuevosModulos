import {test, expect} from '../../fixtures/baseFixtures'
import * as allure from 'allure-js-commons'


test.describe('Pruebas de humo Mantencion de parametros @smoke', () => {

    test.beforeEach('Ingreso a Modulo comunicaciones', async ({ page, login }) => {
        await login.IngresarAUrlLogin();
        await login.ingresarDatosLogin();
        await login.clickIngresar();
        await login.IngresarConPerfil('Administrador');
        await expect(page.locator('app-sidebar')).toBeVisible({ timeout: 30000 });
    });


    /**
     * @testId TC-MantencionDeParametros-001
     * @description Validar acceso a la pantalla de mantecion de parametros
     * @precondition Acceso a la url de Mantencion de parametros
     */
    test('Ingreso a pantalla de mantencion de parametros @nuevo', async({homecomunicaciones, page})=>{

        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");

        await test.step('Accion: Ingresar a pantalla mantencion-parametros', async()=>{
           await homecomunicaciones.navegarAMantencionParametros()
        })
        await test.step('Verificacion: Se accede a la pantalla correctamente', async()=>{
            await expect(page).toHaveURL(/mantencion-parametros/i)
        })
    })
})