import { expect, Locator, Page } from "@playwright/test";

export class HomeComunicaciones {
    
    private readonly page: Page;
    readonly MenuProcesos: Locator;
    readonly SubmenuProcesos: Locator;
    readonly chevronProcesos: Locator;
    private readonly PeriodoFecha: Locator

    constructor(page: Page) {
        this.page = page;
        this.MenuProcesos = page.locator('li.layout-sidebar-item').filter({ hasText: /^Procesos$/ }).getByRole('button');
        this.SubmenuProcesos = page.locator('a.layout-sidebar-viewlink, button.layout-sidebar-viewlink').filter({ hasText: 'Revisión de Procesos' });
        this.chevronProcesos = page.locator('ng-icon[name="remixArrowDownSLine"]');
        this.PeriodoFecha = page.locator('button.p-datepicker-dropdown')
        
    }

async navegarARevisionProceso() {
    const targetUrl = `${process.env.BaseUrl}/revision-procesos`;
    await this.page.goto(targetUrl);
    await this.PeriodoFecha.waitFor({state: "visible"})
    await this.PeriodoFecha.waitFor({state: "attached"})
    const loadingIcon = this.page.locator('svg.p-datatable-loading-icon')
    await expect(loadingIcon).toBeHidden()
}

async navegarARevisionMensajes() {
        await this.page.goto(`${process.env.BaseUrl}/revision-mensajeria`)
    }

async navegarARevisionMarcaDigital(){
    await this.page.goto(`${process.env.BaseUrl}/revision-marca-digital`)
}

}