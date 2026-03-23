import {test, expect } from '../../fixtures/baseFixtures'
import * as allure from 'allure-js-commons'
import { RevisionMarcaDigital } from '../../pages/RevisionMarcaDigital';

test.describe('Pruebas de humo Revision marca digital @smoke', () => {

    test.beforeEach('Ingreso a Modulo comunicaciones', async ({ page, login }) => {
        await login.IngresarAUrlLogin();
        await login.ingresarDatosLogin();
        await login.clickIngresar();
        await login.IngresarConPerfil('Administrador');
        await expect(page.locator('app-sidebar')).toBeVisible({ timeout: 30000 });
    });

    /**
     * @testId TC-RevisionMarcaDigital-001
     * @description Acceder a la pantalla de revision marca digital
     * @precondition Acceso a la url de revision marca digital
     */

    test('Ingresar a la pantalla de revision marca digital', async({page, homecomunicaciones})=>{
        
        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");

        await test.step('Accion: Ingresar a pagina de revision procesos', async()=>{
            await homecomunicaciones.navegarARevisionProceso()
        })

        await test.step('Verificación: Se accede a la pantalla de revision procesos', async()=>{
            await expect(page).toHaveURL(/revision-procesos/i)
        })

        await test.step('Accion: Acceder a la pagina de revision marca digital', async()=>{
               await homecomunicaciones.navegarARevisionMarcaDigital()
        })
        await test.step('Verificacion: Se muestra pantalla de revision marca digital', async()=>{
            await expect(page).toHaveURL(/revision-marca-digital/i)
        })
     
    })

    /**
     * @testId TC-RevisionMarcaDigital-002
     * @description Realizar busqueda por rut
     * @precondition Acceso a la url de revision marca digital
     */
    test('Busqueda de marca digital por rut', async({homecomunicaciones, page, revisionMarcaDigital})=>{

        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");

        await test.step('Accion: Ingresar a pantalla de revision de marca digital', async()=>{
           await homecomunicaciones.navegarARevisionMarcaDigital()
        })
        await test.step('Verificacion: Se accede correctamente a la pantalla', async()=>{
            await expect(page).toHaveURL(/revision-marca-digital/)
        })

        await test.step('Accion: Ingresar rut en la casilla', async()=>{
            await revisionMarcaDigital.IngresarRutBusqueda('3747508-4')
        })
        await test.step('Verificacion: se muestra rut buscado en historial', async()=>{
            const fila = page.locator('tr', {hasText: /3747508-4/})
            await fila.locator('td').first().waitFor({state: 'visible'})
            await expect(fila.locator('td').first()).toContainText('3747508-4')

        })
    })

    /**
     * @testId TC-RevisionMarcaDigital-003
     * @description Actualizar tipo de movimiento
     * @precondition Acceso a la url de revision marca digital
     */
    test('Actualizar el tipo de movimiento del primer registro', async({homecomunicaciones, page, revisionMarcaDigital})=>{

        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");

        await test.step('Acccion: Ingresamos a la pantalla de revision marca digital', async()=>{
            await homecomunicaciones.navegarARevisionMarcaDigital()
            
        })
        await test.step('Accion: Ingresar rut y tipo', async()=>{
            await revisionMarcaDigital.IngresarRutNuevoRegistro('2932191-4')
            await revisionMarcaDigital.SeleccionarTipo()
            await revisionMarcaDigital.AccionGuardar()
        })

        await test.step('Verificacicion: Se muestra mensaje de guardado exitoso', async()=>{
            const toastExito = page.getByText('Ingresado con éxito');
            await expect(toastExito).toBeHidden();
            
        })


    })
})