import { expect, Page, Locator } from "playwright/test";

export class RevisionMensajeria {

    private readonly page : Page
    readonly btnEditar : Locator
    
    constructor(page: Page) {
        this.page= page
        this.btnEditar = this.page.locator('button.p-ripple.p-button.p-button-danger').first();
    }

    async clickBtnEditarMensaje() {
        const loadIcon = this.page.locator('svg[data-p-icon="spinner"]')
        await expect(loadIcon).toBeHidden()
        await this.btnEditar.click()
    }
}

