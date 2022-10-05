import { BaseRouter } from '../shared/router/router'
import { PurchaseProductController } from './controllers/pruchase-product.controller'
import { PurchaseProductMiddleware } from './middlewares/purchase-product.middleware'

export class PurchaseProductRoutes extends BaseRouter<PurchaseProductController, PurchaseProductMiddleware> {
  constructor () {
    super(PurchaseProductController, PurchaseProductMiddleware)
  }

  routes () : void {
    this.router.get('/purchasesProducts', (req, res) =>
      this.controller.getPurchasesProducts(req, res))

    this.router.get('/purchasesProducts/:id', (req, res) =>
      this.controller.getPurchaseProductById(req, res))

    this.router.post('/createPurchaseProduct', (req, res, next) =>
      [this.middleware.purchaseProductValidator(req, res, next)], (req, res) =>
      this.controller.createPurchaseProduct(req, res))

    this.router.patch('/updatePurchaseProduct/:id', (req, res) =>
      this.controller.updatePurchaseProduct(req, res))

    this.router.delete('/deletePurchaseProduct/:id', (req, res) =>
      this.controller.deletePurchaseProduct(req, res))
  }
}
