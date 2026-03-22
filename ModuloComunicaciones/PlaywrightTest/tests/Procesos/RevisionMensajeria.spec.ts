import { test, expect } from '../../fixtures/baseFixtures'
import { HomeComunicaciones } from '../../pages/HomeComunicaciones';
import * as allure from 'allure-js-commons'

test.describe('Pruebas de humo Revision de mensajes @smoke', () => {

    test.beforeEach('Ingreso a Modulo comunicaciones', async ({ page, login }) => {
        await login.IngresarAUrlLogin();
        await login.ingresarDatosLogin();
        await login.clickIngresar();
        await login.IngresarConPerfil('Administrador');
        await expect(page.locator('app-sidebar')).toBeVisible({ timeout: 30000 });
    });

    /**
     * @testId TC-RevisionMensajeria-001
     * @description Acceder a la pantalla de revision mensajeria
     * @precondition Acceso a la url de revision mensajeria
     */

    test('Comprobar disponibilidad de pagina revision mensajeria', async({page, homecomunicaciones})=>{
        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");

        await test.step('Accion: ingresar a revision mensajes', async()=>{
            await page.goto(`${process.env.BaseUrl}/revision-mensajeria`)
        })
        await test.step('Verificacion: Se accede a la pagina correctamente', async()=>{
            await homecomunicaciones.navegarARevisionMensajes()
        })
    })

    /**
     * @testId TC-RevisionMensajeria-002
     * @description Comprobar funcionalidad de boton editar mensaje
     * @precondition Acceso a la url de revision mensajeria
     */
    test('Comprobar funcionalidad de editar mensaje', async({page, revisionMensajeria, homecomunicaciones})=>{

        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");

        await test.step('Accion: ingresar a revision mensajes', async()=>{
            await homecomunicaciones.navegarARevisionMensajes()
        })
        await test.step('Accion: Presionar sobre opcion editar mensaje', async()=>{
            await revisionMensajeria.clickBtnEditarMensaje()
        })
        await test.step('Verificacion: Se apertura modal de mensaje', async()=>{
            await page.getByText(/Ingrese su nuevo mensaje/).waitFor({state: 'visible'})
        })
    })


})
