
import {test, expect} from '../../fixtures/baseFixtures'
import * as allure from 'allure-js-commons'
import { Login } from '../../pages/Login'
import {perfiles} from '../../data/perfilesData'

test.describe("Ingreso con los distintos perfiles al modulo de comunicaciones @login", ()=>{

    test.beforeEach('Ingreso a la url de comunicaciones', async ({login})=>{
        login.IngresarAUrlLogin()
    })

    /**
     * @testId TC-Login-001
     * @description Ingreso con usuario administrador al modulo de comunicaciones
     * @precondition Acceso a la url de comunicaciones
     */
    for (const perfil of perfiles) {
    test(`ingresar con perfil ${perfil.name}` , async ({login, page})=>{

        allure.owner("QA");
        allure.tags("smoke");
        allure.severity("critical");
        
        await test.step('Accion: Ingresamos el usuario y contraseña', async()=>{
            await login.ingresarDatosLogin()

        })
        await test.step('Accion: Presionamos el boton ingresar', async()=>{
            await login.clickIngresar()
        })

        await test.step('Verificación: Nos muestra la pagina para seleccionar el perfil', async()=>{
            await expect(page).toHaveURL(/.*\/login-actions/i)
        })

        await test.step(`Seleccionamos el perfil ${perfil.name}`, async()=>{
            await login.IngresarConPerfil(perfil.name)
        })

        await test.step('Verificación: Ingresamos a la pagina de inicio del modulo', async()=>{
            await expect(page).toHaveURL(/home/i)
            expect(page.getByRole('heading', {name : /comunicaciones y normativo/i}))
        })
    
    })
}
})