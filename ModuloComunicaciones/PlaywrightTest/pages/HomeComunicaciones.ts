import { expect, Locator, Page } from "@playwright/test";

export class HomeComunicaciones {
    
    
    private readonly page: Page;
    readonly MenuComunicaciones: Locator;
    readonly MenuProcesos: Locator;
    private readonly RevisionProcesos: Locator
    readonly chevronProcesos: Locator;
    private readonly PeriodoFecha: Locator

    constructor(page: Page) {
        this.page = page;
        this.MenuComunicaciones = page.locator('span', {hasText: /Comunicaciones/i});
        this.MenuProcesos = page.locator('button', {hasText: 'Procesos'})
        this.RevisionProcesos = page.locator('button.layout-sidebar-viewlink', { hasText: 'Revisión de Procesos' }).first();
        this.chevronProcesos = page.locator('ng-icon[name="remixArrowDownSLine"]');
        this.PeriodoFecha = page.locator('button.p-datepicker-dropdown')
        
    }

async navegarARevisionProceso() {
    await this.MenuComunicaciones.click()
    await this.MenuProcesos.click()
    await this.RevisionProcesos.waitFor({state: "attached"})
    await this.RevisionProcesos.click()
    const loadingIcon = this.page.locator('svg.p-datatable-loading-icon')
    await expect(loadingIcon).toBeHidden()
}

async navegarARevisionMensajes() {
        //await this.page.goto(`${process.env.BaseUrl}/revision-mensajeria`)

    }

async navegarARevisionMarcaDigital(){
    await this.page.goto(`${process.env.BaseUrl}/revision-marca-digital`)
}

async navegarAMantencionParametros() {
       await this.page.goto(`${process.env.BaseUrl}/mantencion-parametros`)
    }

}