import { test, expect } from '../../fixtures/baseFixtures'
import * as allure from 'allure-js-commons'

test.describe('Pruebas de humo Revision de procesos @smoke', () => {

    test.beforeEach('Ingreso a Modulo comunicaciones', async ({ page, login }) => {


        await login.IngresarAUrlLogin();
        await login.ingresarDatosLogin();
        await login.clickIngresar();
        await login.IngresarConPerfil('Administrador');

        await expect(page.locator('app-sidebar')).toBeVisible({ timeout: 30000 });
    });

    /**
     * @testId TC-RevisionProcesos-001
     * @description Acceder a la pantalla de revision procesos
     * @precondition Acceso a la url de revision procesos
     */

    test('Ingresar a revision procesos', async ({ homecomunicaciones, page }) => {
        
        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");

        await test.step('Accion: Accedemos a la url de revision Procesos', async () => {
            await homecomunicaciones.navegarARevisionProceso()
        })
        await test.step('Verificacion: se visualiza tabla', async () => {
            //validamos que un elemento este visible para comprobar el acceso        
            const loadIcon = page.locator('svg.p-datatable-loading-icon')
            await expect(loadIcon).toBeHidden()
        })

    })

    /**
     * @testId TC-RevisionProcesos-002
     * @description Seleccionar una fecha para realizar una busqueda
     * @precondition Acceso a la url de revision procesos
     */

    test('seleccionar Fecha Feb/2026 en calendario de periodo', async ({ page, homecomunicaciones, revisionProcesos }) => {

        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");

        await test.step('Accion: Accedemos a la url de revision Procesos', async () => {
            await homecomunicaciones.navegarARevisionProceso()
        })

        await test.step('Accion: Presionamos sobre el calendario del periodo',async()=>{
            await revisionProcesos.clickCalendarioBusqueda()

        })
        await test.step('Verificacion: se apertura panel para seleccion de mes', async () => {
            const panel = page.getByRole('dialog', {name: 'Choose Date'})
            await expect(panel).toBeVisible()
        });

        await test.step('Accion: Seleccionamos el mes', async()=>{
            await revisionProcesos.seleccionarMes('feb')
        })
        await test.step('Verificacion: Se muestran los resultados correctos de febrero',async()=>{
            const loadingIcon = page.locator('svg.p-datatable-loading-icon')
            await expect(loadingIcon).toBeHidden()
            const correctos =  page.locator('span.p-tag-label', {hasText: /Correctos/i}).first()
            await expect(correctos).toContainText(/^Correctos: 2$/i)
        })
    });

    /**
     * @testId TC-RevisionProcesos-003
     * @description Ingresar y visualizar el detalle de las polizas
     * @precondition Acceso a la url de revision procesos
     */

    test('Ingresar a detalle poliza ', async({homecomunicaciones, revisionProcesos, page})=>{

        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");

        await test.step('Accion: Ingresar a pagina de revision procesos', async()=>{
            await homecomunicaciones.navegarARevisionProceso()
        })

        await test.step('Verificación: Se accede a la pantalla de revision procesos', async()=>{
            await expect(page).toHaveURL(/revision-procesos/i)
        })

        await test.step('Accion: Presionamos sobre el calendario del periodo',async()=>{
            await revisionProcesos.clickCalendarioBusqueda()
        })

        await test.step('Accion: Seleccionamos el mes', async()=>{
            await revisionProcesos.seleccionarMes('mar')
        })

        await test.step('Accion: presionar sobre una de las opciones para ingresar al detalle', async()=>{
            await revisionProcesos.IngresarAdetallePoliza()
        })
        await test.step('Verificación: Se muestra la pantalla de detalle poliza', async()=>{
            await expect(page).toHaveURL(/detalle-poliza/i)
        })
    })

    /**
     * @testId TC-RevisionProcesos-004
     * @description Ingresar y visualizar el detalle de las polizas
     * @precondition Acceso a la url de revision procesos
     */

    test('Cambiar vigencia para poliza', async({page, revisionProcesos, homecomunicaciones})=>{

        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");
        
        await test.step('Accion: Acceder a la pantalla de detalle de poliza', async()=>{
            await homecomunicaciones.navegarARevisionProceso()
            await revisionProcesos.clickCalendarioBusqueda()
            await revisionProcesos.seleccionarMes('mar')
            await revisionProcesos.IngresarAdetallePoliza()
        })

        await test.step('Verificacion: Se accede correctamente al detalle poliza', async()=>{
            await expect(page).toHaveURL(/processId=8/i)
        })

        await test.step('Accion: Cambiar vigencia de la primera poliza encontrada ', async()=>{
            const estado = page.locator('select.policy-detail-select').first()
            const nuevoEstado = await estado.inputValue()
            await revisionProcesos.cambiarVigenciaPoliza(nuevoEstado)
            await revisionProcesos.guardarVigenciaPoliza()
        })

        await test.step('Verificacion: Se actualiza al nuevo estado correctamente', async()=>{
            const texto = RegExp(/Estado de las pólizas actualizado correctamente/i)
            const mensaje = page.getByText(texto)
            await mensaje.waitFor({state:"hidden"})
        })
    })

});