import UserRoutes from './user-routes'
import PreferenceRoutes from './preference-routes';
import RatingRoutes from './rating-routes';
import CategoryRoutes from './category-routes';
import { Express } from 'express'

class Routes {
    constructor(app: Express) {
        const routes = [
            UserRoutes,
            PreferenceRoutes,
            RatingRoutes,
            CategoryRoutes,
        ];

        routes
            .forEach(routes => app.use(routes.buildRoutes()));
    }
}

export default Routes;