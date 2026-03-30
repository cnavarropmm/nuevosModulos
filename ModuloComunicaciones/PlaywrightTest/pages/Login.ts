import {Page, Locator, Expect} from '@playwright/test'
import { statSync } from 'fs'

export class Login {
    

    private readonly page : Page
    private readonly userInput : Locator
    private readonly passInput : Locator
    private readonly loginButton : Locator
    private readonly BtnContinuarKeycloack: Locator


    constructor(page: Page){
        this.page = page
        this.userInput = page.locator('#username')
        this.passInput = page.locator('#password')
        this.loginButton = page.getByRole('button', {name : /.*Sign In/i})
        this.BtnContinuarKeycloack = page.getByRole('button', {name: /Continuar/i})

    }

    async ingresarDatosLogin(){
        await this.userInput.waitFor({state: 'visible'})
        await this.userInput.fill(process.env.UsuarioTest?? '')
        await this.passInput.waitFor({state: 'visible'})
        await this.passInput.fill(process.env.PassTest?? '')

    }

    async clickIngresar(){
       await this.loginButton.click()
    }

    async IngresarAUrlLogin(){
        await this.page.goto(process.env.BaseUrl ?? '')
    }

    async IngresarConPerfil(perfil: string){
        perfil = perfil.toLowerCase()
        const selectorPerfil = this.page.locator('label', { hasText: new RegExp(perfil, 'i') }).first();
        await selectorPerfil.waitFor({state:'visible'})
        await selectorPerfil.check()
        await this.BtnContinuarKeycloack.waitFor({state: 'attached'})
        await this.BtnContinuarKeycloack.click()
    }
}