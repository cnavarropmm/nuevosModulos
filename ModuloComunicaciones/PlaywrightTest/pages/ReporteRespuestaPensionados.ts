import { Page, Locator, expect } from "playwright/test"
import { mesesCortos } from "../data/mesesCalendario"

export class ReporteRespuestaPensionados {

    private readonly page: Page
    private readonly pickerCalendarioDesde : Locator
    private readonly pickerCalendarioHasta : Locator
    private readonly btnAñoCalendario : Locator
    private readonly btnBuscar : Locator

    constructor(page: Page){
        this.page = page
        this.pickerCalendarioDesde = this.page.locator('p-datepicker[formcontrolname="periodFrom"]')
        this.pickerCalendarioHasta = this.page.locator('p-datepicker[formcontrolname="periodTo"]')
        this.btnAñoCalendario = this.page.getByRole("button", {name: /Choose Year/i})
        this.btnBuscar = this.page.locator('button', {hasText: ' Buscar '})
    }

    // Metodo que realiza la busqueda por el mes enviado -1 
    // como parametro solo para el año en curso
    async SeleccionarFecha(mesAñodesde: string){
        //Asignacion de variables para la obtencion de la fecha mm/aaaa
        const [mes, año] = mesAñodesde.split('/')
        const mesActual = parseInt(mes, 10)
        const añoActual = parseInt(año, 10)

        //como JS comienza en 0 para los meses, debemos restar 1 
        // para poder quedar en el mes actual correctamente
        const fechaNueva = new Date(añoActual, mesActual -1)

        //seteamos la nueva fecha a marzo 2026
        fechaNueva.setMonth(fechaNueva.getMonth() -1)
        const mesCorto = mesesCortos[fechaNueva.getMonth()]

        //comenzamos con la seleccion del mes y año
        await this.pickerCalendarioDesde.click()
        await this.btnAñoCalendario.click()
        //seleccionamos el año en curso y el mes de marzo en el calendario desde
        await this.page.locator('span.p-ripple[data-pc-section="year"]').filter({hasText: año}).click()
        await this.page.locator('span.p-ripple[data-pc-section="month"]').filter({hasText: mesCorto}).click()
    }

    async Buscar(){
        await this.btnBuscar.click()
    }
    
}