import UserRoutes from './user-routes'
import PreferenceRoutes from './preference-routes';

import { Express } from 'express'

class Routes {
    constructor(app: Express) {
        const routes = [
            UserRoutes,
            PreferenceRoutes,
        ];

        routes
            .forEach(routes => app.use(routes.buildRoutes()));
    }
}

export default Routes;