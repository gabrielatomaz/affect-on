import UserRoutes from './user-routes'
import { Express } from 'express'

class Routes {
    constructor(app: Express) {
        app.use(UserRoutes.buildRoutes())
    }
}

export default Routes;