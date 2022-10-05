import { BaseRouter } from '../shared/router/router'
import { PurchaseController } from './controllers/purchase.controller'

export class PurchaseRoutes extends BaseRouter<PurchaseController> {
  constructor () {
    super(PurchaseController)
  }

  routes () : void {
    this.router.get('/purchases', (req, res) =>
      this.controller.getPurchases(req, res))

    this.router.get('/purchases/:id', (req, res) =>
      this.controller.getPurchaseById(req, res))

    this.router.post('/createPurchase', (req, res) =>
      this.controller.createPurchase(req, res))

    this.router.patch('/updatePurchase/:id', (req, res) =>
      this.controller.updatePurchase(req, res))

    this.router.delete('/deletePurchase/:id', (req, res) =>
      this.controller.deletePurchase(req, res))
  }
}
