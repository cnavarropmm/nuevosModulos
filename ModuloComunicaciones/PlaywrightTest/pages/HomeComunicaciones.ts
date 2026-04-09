import { expect, Locator, Page } from "@playwright/test";

export class HomeComunicaciones {
    
    
    private readonly page: Page
    private readonly menuComunicaciones: Locator
    private readonly menuProcesos: Locator
    private readonly revisionProcesos: Locator
    private readonly chevronProcesos: Locator
    private readonly periodoFecha: Locator
    private readonly revisionMensajeria: Locator
    private readonly revisionMarca: Locator
    private readonly menuMarcaDigital : Locator
    private readonly mantencionParametros : Locator
    private readonly menuCanalDistribucion: Locator
    private readonly reporteRespuestaPensionado: Locator

    constructor(page: Page) {
        this.page = page;
        this.menuComunicaciones = page.locator('span', {hasText: /Comunicaciones/i});
        this.menuProcesos = page.locator('button', {hasText: 'Procesos'})
        this.revisionProcesos = page.locator('button.layout-sidebar-viewlink', { hasText: 'Revisión de Procesos' }).first()
        this.revisionMensajeria = page.locator('button.layout-sidebar-viewlink', {hasText: ' Mantención de mensajes '}).first()
        this.chevronProcesos = page.locator('ng-icon[name="remixArrowDownSLine"]');
        this.periodoFecha = page.locator('button.p-datepicker-dropdown')
        this.menuMarcaDigital = page.locator('button', {hasText: 'Marca Digital'})
        this.revisionMarca = page.locator('button.layout-sidebar-viewlink', { hasText: ' Revisión marca ' }).first()
        this.mantencionParametros = page.locator('button.layout-sidebar-viewlink', { hasText: ' Mantención de parámetros ' }).first()
        this.menuCanalDistribucion = page.locator('button', {hasText: /Canal de Distribución/i})
        this.reporteRespuestaPensionado = page.locator('button', {hasText: / Reporte de respuesta pensionados /i})
    }

async navegarARevisionProceso() {
    await this.menuComunicaciones.click()
    await this.menuProcesos.click()
    await this.revisionProcesos.waitFor({state: "attached"})
    await this.revisionProcesos.click()
    const loadingIcon = this.page.locator('svg.p-datatable-loading-icon')
    await expect(loadingIcon).toBeHidden()
}

async navegarAMantencionMensajes() {
    await this.menuComunicaciones.click()
    await this.menuProcesos.click()
    await this.revisionMensajeria.waitFor({state: "attached"})
    await this.revisionMensajeria.click()
    const loadingIcon = this.page.locator('svg.p-datatable-loading-icon')
    await expect(loadingIcon).toBeHidden()
    }

async navegarARevisionMarcaDigital(){
    await this.menuComunicaciones.click()
    await this.menuMarcaDigital.click()
    await this.revisionMarca.click()
    const loadingIcon = this.page.locator('svg.p-datatable-loading-icon')
    await expect(loadingIcon).toBeHidden()
}

async navegarAMantencionParametros() {
       await this.menuComunicaciones.click()
       await this.menuMarcaDigital.click()
       await this.mantencionParametros.click()
       const loadingIcon = this.page.locator('svg.p-datatable-loading-icon')
       await expect(loadingIcon).toBeHidden()
    }

async navegarAReporteRespuestaPensinados(){
    await this.menuComunicaciones.click()
    await this.menuCanalDistribucion.click()
    await this.reporteRespuestaPensionado.click()
    const loadingIcon = this.page.locator('svg.p-datatable-loading-icon')
    await expect(loadingIcon).toBeHidden()

}

}