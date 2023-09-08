import userRoutes from './user-routes'
import preferenceRoutes from './preference-routes';
import ratingRoutes from './rating-routes';
import categoryRoutes from './category-routes';
import clientRoutes from './client-routes';
import complaintRoutes from './complaint-routes';
import accessGroupRoutes from './access-group-routes';
import accessGroupPermissionTypeRoutes from './access-group-permission-type-routes';

import { Express } from 'express'

class Routes {
    constructor(app: Express) {
        const routes = [
            userRoutes,
            preferenceRoutes,
            ratingRoutes,
            categoryRoutes,
            clientRoutes,
            complaintRoutes,
            accessGroupRoutes,
            accessGroupPermissionTypeRoutes,
        ];

        routes
            .forEach(routes => app.use(routes.buildRoutes()));
    }
}

export default Routes;