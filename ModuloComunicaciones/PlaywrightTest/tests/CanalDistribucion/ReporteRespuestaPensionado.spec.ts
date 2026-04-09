import { test, expect } from '../../fixtures/baseFixtures'


test.describe('Pruebas de humo para reporte de respuesta pensionados @smoke', async()=>{

    test.beforeEach('Ingreso al modulo de comunicaciones', async({login, page})=>{
        await login.IngresarAUrlLogin();
        await login.ingresarDatosLogin();
        await login.clickIngresar();
        await login.IngresarConPerfil('Administrador');
        await expect(page.locator('app-sidebar')).toBeVisible({ timeout: 30000 });
    })
    /**
     * @testId TC-ReportePensionados-001
     * @description Validar acceso a la pantalla de reporte de respuesta pensionados
     * @precondition Acceso a la url de reporte de respuesta pensionados
     */
    test('Acceder correctamente a la pantalla de reporte de respuesta pensionados', async({homecomunicaciones, page})=>{
        await test.step('Accion: Navegamos a la pantalla de reporte de respuesta de pensionado', async()=>{
            await homecomunicaciones.navegarAReporteRespuestaPensinados()          
        })
        await test.step('Verificacion: Se accede correctamente a la pantalla', async()=>{
            await expect(page).toHaveURL(/reporte-respuesta-pensionados/i)
        })
      
        
    })
    /**
     * @testId TC-ReportePensionados-002
     * @description Comprobar funcionalidad de busqueda por FechaDesde
     * @precondition Acceso a la url de reporte de respuesta pensionados
     */
    test('Realizar busqueda por mes predecesor y año en curso', async({homecomunicaciones, page, reporteRespuestaPensionado})=>{
        await test.step('Accion: Acceder a pantalla de reporte respuesta de pensionado', async()=>{
            await homecomunicaciones.navegarAReporteRespuestaPensinados()
        })
        await test.step('Accion: Seleccionamos el año en curso y el mes predecesor', async()=>{
            const picker = page.locator('p-datepicker[formcontrolname="periodTo"]')
            const MesAñoActual = await picker.locator('input').inputValue()
            //se envia el mes y año actual el metodo del back realiza el calculo
            await reporteRespuestaPensionado.SeleccionarFecha(MesAñoActual)
        })
        await test.step('Accion: Presionamos el boton buscar', async()=>{
            await reporteRespuestaPensionado.Buscar()
        })

        await test.step('Verificacion: No existen datos para el periodo de marzo a abril 2026', async()=>{
            const mensaje = page.getByText(/No hay registros disponibles/i)
            await expect(mensaje).toBeVisible()
        })
    
    })
})