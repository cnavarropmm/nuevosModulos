
import { test as base, expect }from '@playwright/test'
import { Login } from '../pages/Login'
import { HomeComunicaciones } from '../pages/HomeComunicaciones'
import { RevisionProcesos } from '../pages/RevisionProcesosPage'
import { RevisionMensajeria } from '../pages/RevisionMensajeriaPage'

type fixtures = {
    login : Login
    homecomunicaciones : HomeComunicaciones
    revisionProcesos: RevisionProcesos
    revisionMensajeria : RevisionMensajeria
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
    }

})

export {expect} from '@playwright/test'