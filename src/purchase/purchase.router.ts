import { BaseRouter } from '../shared/router/router'
import { PurchaseController } from './controllers/purchase.controller'
import { PurchaserMiddleware } from './middlewares/purchase.middleware'

export class PurchaseRoutes extends BaseRouter<PurchaseController, PurchaserMiddleware> {
  constructor () {
    super(PurchaseController, PurchaserMiddleware)
  }

  routes () : void {
    this.router.get('/purchases', (req, res) =>
      this.controller.getPurchases(req, res))

    this.router.get('/purchases/:id', (req, res) =>
      this.controller.getPurchaseById(req, res))

    this.router.post('/createPurchase', (req, res, next) =>
      [this.middleware.purchaseValidator(req, res, next)], (req, res) =>
      this.controller.createPurchase(req, res))

    this.router.patch('/updatePurchase/:id', (req, res) =>
      this.controller.updatePurchase(req, res))

    this.router.delete('/deletePurchase/:id', (req, res) =>
      this.controller.deletePurchase(req, res))
  }
}
