// This is a new file for solution!
import * as PerformanceValidation from '../controllers/validation/PerformanceValidation.js'
import { hasRole, isLoggedIn } from '../middlewares/AuthMiddleware.js'
import * as PerformanceMiddleware from '../middlewares/PerformanceMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import PerformanceController from '../controllers/PerformanceController.js'

const loadFileRoutes = (app) => {
  app.route('/performances')
    .post(
      isLoggedIn,
      hasRole('owner'),
      PerformanceMiddleware.checkPerformanceRestaurantOwnership,
      PerformanceValidation.create,
      handleValidation,
      PerformanceController.create
    )
}

export default loadFileRoutes
