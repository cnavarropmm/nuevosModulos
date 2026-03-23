import {test, Locator, Page} from '@playwright/test'
import { table } from 'node:console'

export class RevisionMarcaDigital {
  


    private readonly page: Page
    readonly inputRut: Locator
    readonly seccionRegistro: Locator

    constructor(page: Page){
        this.page = page
        this.inputRut = this.page.locator('input[formcontrolname="rut"]')
        this.seccionRegistro = page.locator('div, section')
        .filter({ has: page.locator('h3', { hasText: 'Ingresar nuevo registro'}) })
    }

    async IngresarRutBusqueda(rut : string) {
        await this.inputRut.fill(rut)
    }

    async AccionGuardar() {
        //Buscamos la tabla dentro de la seccion y su fila
       const tabla = this.seccionRegistro.getByRole('table')
       const fila = tabla.locator('tbody tr').first()
       //interactuamos
       await fila.getByRole('button', {name: /guardar/i}).click()
    }
    async SeleccionarTipo() {
        //Buscamos la tabla dentro de la seccion y su fila
       const tabla = this.seccionRegistro.getByRole('table')
       const fila = tabla.locator('tbody tr').first()
       //interactuamos
       await fila.locator('select').selectOption('Autorización')
    }
    async IngresarRutNuevoRegistro(rut: string) {
       //Buscamos la tabla dentro de la seccion y su fila
       const tabla = this.seccionRegistro.getByRole('table')
       const fila = tabla.locator('tbody tr').first()

       //Interactuamos
        await fila.getByPlaceholder('1.234.567-8').fill(rut)
       
    }
}