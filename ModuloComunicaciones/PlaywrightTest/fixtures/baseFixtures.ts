
import { test as base, expect }from '@playwright/test'
import { Login } from '../pages/Login'
import { HomeComunicaciones } from '../pages/HomeComunicaciones'
import { RevisionProcesos } from '../pages/RevisionProcesosPage'
import { RevisionMensajeria } from '../pages/RevisionMensajeriaPage'
import { RevisionMarcaDigital } from '../pages/RevisionMarcaDigital'
import { ReporteRespuestaPensionados } from '../pages/ReporteRespuestaPensionados'

type fixtures = {
    login : Login
    homecomunicaciones : HomeComunicaciones
    revisionProcesos: RevisionProcesos
    revisionMensajeria : RevisionMensajeria
    revisionMarcaDigital: RevisionMarcaDigital
    reporteRespuestaPensionado: ReporteRespuestaPensionados
}

export const test  = base.extend<fixtures>({
 
    login: async ({page}, use)=>{
        const login = new Login(page)
        return use(login)
    },

    homecomunicaciones: async({page}, use)=>{
        const homecomunicaciones = new HomeComunicaciones(page)
        return use(homecomunicaciones)
    },

    revisionProcesos: async({page}, use)=>{
     const revisionProcesos = new RevisionProcesos(page)
     return use(revisionProcesos)
    },

    revisionMensajeria: async({page}, use)=>{
        const revisionMensajeria = new RevisionMensajeria(page)
        return use(revisionMensajeria)
    },

    revisionMarcaDigital: async({page}, use)=>{
        const revisionMarcaDigital = new RevisionMarcaDigital(page)
        return use(revisionMarcaDigital)
    },

    reporteRespuestaPensionado: async ({page}, use)=>{
        const reporteRespuestaPensionado = new ReporteRespuestaPensionados(page)
        return use(reporteRespuestaPensionado)
    }

})

export {expect} from '@playwright/test'