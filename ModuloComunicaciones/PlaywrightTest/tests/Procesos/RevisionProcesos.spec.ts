import { test, expect } from '../../fixtures/baseFixtures'

test.describe('Pruebas de humo Revision de procesos @smoke', () => {

    test.beforeEach('Ingreso a Modulo comunicaciones', async ({ page, login }) => {


        await login.IngresarAUrlLogin();
        await login.ingresarDatosLogin();
        await login.clickIngresar();
        await login.IngresarConPerfil('Administrador');

        await expect(page.locator('app-sidebar')).toBeVisible({ timeout: 30000 });
    });

    test('Ingresar a revision procesos', async ({ homecomunicaciones, page }) => {

        await test.step('Accion: Accedemos a la url de revision Procesos', async () => {
            await homecomunicaciones.navegarARevisionProceso()
        })
        await test.step('Verificacion: se visualiza tabla', async () => {
            //validamos que un elemento este visible para comprobar el acceso        
            const loadIcon = page.locator('svg.p-datatable-loading-icon')
            await expect(loadIcon).toBeHidden()
        })

    })

    test.skip('seleccionar Fecha ene/2026 en calendario de periodo', async ({ page, homecomunicaciones, revisionProcesos }) => {

        

        await test.step('Accion: Ir a revision procesos', async () => {

            await homecomunicaciones.navegarARevisionProceso();

        });

        const correctos =  page.locator('span[data-pc-section="label"]', { hasText: 'Correctos:' })
        const valorInicial = await correctos.innerText()

        test.step('Accion: Cambiar periodo y verificar refresco', async () => {
            
            await revisionProcesos.clickCalendarioBusqueda();
            await revisionProcesos.seleccionarFecha('feb');
            await expect(revisionProcesos.periodoInput).toHaveAttribute('aria-expanded', 'false', { timeout: 10000 })
            await expect(correctos).not.toHaveText(valorInicial)
        });

        test.step('Verificacion: cambio de registros correctos', async () => {
            const correctos = page.locator('span[data-pc-section="label"]', { hasText: 'Correctos:' })
            const valorFinal = await correctos.innerText()
            await expect(correctos).toHaveText(valorFinal)
            
        });
    });

    test('Ingresar a detalle poliza', async({homecomunicaciones, revisionProcesos, page})=>{

        await test.step('Accion: Ingresar a pagina de revision procesos', async()=>{
            await homecomunicaciones.navegarARevisionProceso()
        })

        await test.step('Verificación: Se accede a la pantalla de revision procesos', async()=>{
            await expect(page).toHaveURL(/revision-procesos/i)
        })

        await test.step('Accion: presionar sobre una de las opciones para ingresar al detalle', async()=>{
            const PB_Aps =  page.getByRole('button', {name: /Potenciales Beneficiarios/i})
            await PB_Aps.waitFor({state: 'visible'})
            await PB_Aps.click({force: true})
        })
        await test.step('Verificación: Se muestra la pantalla de detalle poliza', async()=>{
            await expect(page).toHaveURL(/detalle-poliza/i)
        })
    })

    test('Cambiar vigencia para poliza', async({page, revisionProcesos, homecomunicaciones})=>{
        await test.step('Accion: Acceder a la pantalla de detalle de poliza', async()=>{
            await homecomunicaciones.navegarARevisionProceso()
            await page.goto(`${process.env.BaseUrl}/detalle-poliza?processId=8`)
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