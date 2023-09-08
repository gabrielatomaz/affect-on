import UserRoutes from './user-routes'
import PreferenceRoutes from './preference-routes';
import RatingRoutes from './rating-routes';
import { Express } from 'express'

class Routes {
    constructor(app: Express) {
        const routes = [
            UserRoutes,
            PreferenceRoutes,
            RatingRoutes,
        ];

        routes
            .forEach(routes => app.use(routes.buildRoutes()));
    }
}

export default Routes;