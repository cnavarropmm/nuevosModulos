import { expect, Page, Locator } from "playwright/test";

export class RevisionProcesos {
    
    
    private readonly page: Page;
    readonly periodoInput: Locator;
    readonly AnoPeriodo : Locator
    readonly PeriodoAbierto : Locator
    readonly btnGuardar : Locator
    readonly SeccionPeriodo: Locator

    constructor(page: Page) {
        this.page = page;
        this.periodoInput = this.page.locator('button.p-datepicker-dropdown');
        this.AnoPeriodo = page.getByRole('button').getByText(/2026/)
        this.PeriodoAbierto = page.locator('input[role="combobox"].p-datepicker-input')
        this.btnGuardar = page.getByRole("button", {name: /guardar/i })
        this.SeccionPeriodo = page.locator('p-datepicker')
    }

async clickCalendarioBusqueda() {
    const botonPeriodo =  this.SeccionPeriodo.getByRole("button", {name: /Choose Date/i })
    await botonPeriodo.waitFor({state: "visible"})
    await botonPeriodo.click()
}

async seleccionarMes(mes: string) {
    const panel = this.page.getByRole('dialog', {name: 'Choose Date'})
    await panel.getByText(mes).click()
    await expect(panel).toBeHidden()
    }

async cambiarVigenciaPoliza (nuevoEstado: string) {
        const poliza = this.page.locator('select.policy-detail-select').first()
        console.log(nuevoEstado)
        if (nuevoEstado === 'vigente'){
            await poliza.selectOption('No vigente')
        }else{
            await poliza.selectOption('Vigente')
        }
    }

async guardarVigenciaPoliza() {
        await this.btnGuardar.click()
        await this.page.getByRole('heading', {name: /Confirmación/i})
        .waitFor({state: "visible"})
        await this.page.locator('button.bg-red-600', { hasText: 'Guardar' }).click()
        const texto = RegExp(/Estado de las pólizas actualizado correctamente/i)
        const mensaje =  this.page.getByText(texto)
        await mensaje.waitFor({state:"visible"})
    }
}
