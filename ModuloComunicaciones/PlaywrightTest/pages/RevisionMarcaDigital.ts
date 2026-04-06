import {Locator, Page, expect} from '@playwright/test'
import { mesesCortos } from '../data/mesesCalendario'

export class RevisionMarcaDigital {
    
    private readonly page: Page
    private readonly inputRut: Locator
    private readonly seccionRegistro: Locator
    private readonly btnBuscar : Locator

    constructor(page: Page){
        this.page = page
        this.inputRut = this.page.locator('input[formcontrolname="rut"]')
        this.seccionRegistro = page.locator('div, section')
        .filter({ has: page.locator('h3', { hasText: 'Ingresar nuevo registro'}) })
        this.btnBuscar = this.page.locator('button:has-text("Buscar")')
    }

    async IngresarRutBusqueda(rut : string) {
        await this.inputRut.fill(rut)
    }
    async AccionBuscar(){
        await this.btnBuscar.click()
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

async cambiarAmesAnterior() {
    const FechaDesde= this.page.locator(('p-datepicker[formcontrolname="periodFrom"]'))
    const panelMeses = this.page.getByRole('dialog', {name: /Choose Date/i})
    const FechaActual = await FechaDesde.locator('input').inputValue()
    await FechaDesde.click()

    //Tomamos el año y mes actual y calculamos el mes anterior
    //Luego cambiamos el valor por el nombre corto del mes para poder seleccionarlo y realizar la busqueda
    const [mes, anio] = FechaActual.split('/')
    const mesActual = parseInt(mes, 10)
    const anioActual = parseInt(anio, 10)
    const fecha = new Date(anioActual, mesActual -1)
    fecha.setMonth(fecha.getMonth() -1)
    const mesCorto = mesesCortos[fecha.getMonth()]

    //ingresamos el mes en el input fecha desde para la busqueda
    await panelMeses.getByText(mesCorto).click()
    await expect(panelMeses).toBeHidden()
    }
}