import { BaseRouter } from '../shared/router/router'
import { PurchaseProductController } from './controllers/pruchase-product.controller'

export class PurchaseProductRoutes extends BaseRouter<PurchaseProductController> {
  constructor () {
    super(PurchaseProductController)
  }

  routes () : void {
    this.router.get('/purchasesProducts', (req, res) =>
      this.controller.getPurchasesProducts(req, res))

    this.router.get('/purchasesProducts/:id', (req, res) =>
      this.controller.getPurchaseProductById(req, res))

    this.router.post('/createPurchasesProducts', (req, res) =>
      this.controller.createPurchaseProduct(req, res))

    this.router.patch('/updatePurchasesProducts/:id', (req, res) =>
      this.controller.updatePurchaseProduct(req, res))

    this.router.delete('/deletePurchasesProducts/:id', (req, res) =>
      this.controller.deletePurchaseProduct(req, res))
  }
}
