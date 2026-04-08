import { testDBConnection } from '../../db/db-utils';
import { ProcesosDAO } from '../../db/procesos-db';
import {test, expect} from '../../fixtures/baseFixtures'
import * as allure from 'allure-js-commons'


test.describe('Ejecución e2e para el proceso de sellado @E2E', ()=>{


    test.beforeAll (async () => {
    const isDbUp = await testDBConnection();
    if (!isDbUp) {
        throw new Error('Abortando tests: No hay conexión con la base de datos de Benlar.');
    }
    });

    test.beforeEach('Acceso al modulo de comunicaciones', async({login, page})=>{
        await login.IngresarAUrlLogin();
        await login.ingresarDatosLogin();
        await login.clickIngresar();
        await login.IngresarConPerfil('Administrador');
        await expect(page.locator('app-sidebar')).toBeVisible({ timeout: 30000 });
    })

    /**
     * @testId TC-E2E-001
     * @description Ejecutar el proceso de sellado para un proceso
     * @precondition Acceso a la url de procesos
     */

    test('Realizar Sellado de proceso para Potenciales Beneficiarios de APS - marzo', async({revisionProcesos, homecomunicaciones, page})=>{
        
        allure.owner("QA");
        allure.tags("E2E");
        allure.severity("critical");

        await test.step('Accion: Ingresamos al modulo de comunicaciones', async()=>{
            await homecomunicaciones.navegarARevisionProceso()
        })
        await test.step('Accion: Clickeamos en el calendario de busqueda', async()=>{
            await revisionProcesos.clickCalendarioBusqueda()
        })
        await test.step('Accion: Seleccionar el mes de marzo 2026 en el calendario', async()=>{
            await revisionProcesos.seleccionarMes('mar')
        })
        await test.step('Accion: Ingresamos al detalle de Potenciales Beneficiarios de APS', async()=>{
            await revisionProcesos.IngresarAdetallePoliza()
        })
        await test.step('Acccion: Guardamos los cambios para confirmar el proceso', async()=>{
            await revisionProcesos.guardarVigenciaPoliza()
        })
        await test.step('Accion: Presionamos sobre sellar para realizar el sellado del proceso', async()=>{
            await revisionProcesos.clickCalendarioBusqueda()
            await revisionProcesos.seleccionarMes('mar')
            //se envia true para realizar el sellado, false para cancelar
            await revisionProcesos.Sellar(true)
        })
        await test.step('Verificacion: Se visualiza mensaje de confirmarcion del sellado', async()=>{
            const mensajeConfirmacion = page.getByText('El proceso ha sido sellado correctamente')
            await mensajeConfirmacion.waitFor({state: "visible"})
            await expect(mensajeConfirmacion).toBeHidden()
        })
        
    })
    //Se debe enviar process_id y usuario_bloqueo para el update
    test.afterAll('Limpieza de estado activo false', async()=>{
        await ProcesosDAO.desactivarBloqueo('8', 'CNAVARRO')
        console.log('Se realiza limpieza de data correctamente')
    })
})

