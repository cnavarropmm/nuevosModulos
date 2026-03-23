import { expect, Page, Locator } from "playwright/test";

export class RevisionProcesos {
    
    
    private readonly page: Page;
    readonly periodoInput: Locator;
    readonly AnoPeriodo : Locator
    readonly PeriodoAbierto : Locator
    readonly btnGuardar : Locator

    constructor(page: Page) {
        this.page = page;
        this.periodoInput = this.page.locator('button.p-datepicker-dropdown');
        this.AnoPeriodo = page.getByRole('button').getByText(/2026/)
        this.PeriodoAbierto = page.locator('input[role="combobox"].p-datepicker-input')
        this.btnGuardar = page.getByRole("button", {name: /guardar/i })
    }

async clickCalendarioBusqueda() {
    await this.periodoInput.waitFor({state: "attached"})
    await expect(async () => {
        console.log('Intentando abrir el calendario...');
        await this.periodoInput.focus();
        await this.periodoInput.dispatchEvent('click')
        
        // Si esto falla, el bloque completo vuelve a empezar
        await expect(this.periodoInput).toHaveAttribute('aria-expanded', 'true', { timeout: 1500 });
        const panel = this.page.locator('.p-datepicker-panel, .p-monthpicker');
        await expect(panel).toBeVisible({ timeout: 1000 });
        console.log('Se abre el calendario con los meses')
        
    }).toPass({
        intervals: [1000, 2000], // Espera entre reintentos
        timeout: 10000           // Tiempo total máximo para lograrlo
    });

    console.log('calendario aperturado')
}

async seleccionarFecha(mes: string) {

    const panel = this.page.locator('.p-datepicker-panel, .p-monthpicker');
    await expect(panel).toBeVisible({ timeout: 1000 });
    await this.page.getByText(/feb/i).click({force: true})
    await expect(this.periodoInput).toHaveAttribute('aria-expanded', 'false')
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
