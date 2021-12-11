'use strict';
 
var server = require('server');
 
server.extend(module.superModule);
 
server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
     
    viewData.example = "One stringsssss"
     
    res.setViewData(viewData);
 
    return next();
});
 
 
module.exports = server.exports();

function CartModel(basket) {
    var hooksHelper = require('*/cartridge/scripts/helpers/hooks');

    if (basket !== null) {
        var shippingModels = ShippingHelpers.getShippingModels(basket, null, 'basket');
        var productLineItemsModel = new ProductLineItemsModel(basket.productLineItems, 'basket');
        var totalsModel = new TotalsModel(basket);
        this.hasBonusProduct = Boolean(basket.bonusLineItems && basket.bonusLineItems.length);
        this.actionUrls = getCartActionUrls();
        this.numOfShipments = basket.shipments.length;
        this.totals = totalsModel;
        this.notes = basket.notes;


        if (shippingModels) {
            this.shipments = shippingModels.map(function (shippingModel) {
                var result = {};
                result.shippingMethods = shippingModel.applicableShippingMethods;
                if (shippingModel.selectedShippingMethod) {
                    result.selectedShippingMethod = shippingModel.selectedShippingMethod.ID;
                }

                return result;
            });
        }
        var discountPlan = PromotionMgr.getDiscounts(basket);
        if (discountPlan) {
            this.approachingDiscounts = getApproachingDiscounts(basket, discountPlan);
        }
        this.items = productLineItemsModel.items;
        this.numItems = productLineItemsModel.totalQuantity;
        this.valid = hooksHelper('app.validate.basket', 'validateBasket', basket, false, require('*/cartridge/scripts/hooks/validateBasket').validateBasket);
    } else {
        this.items = [];
        this.numItems = 0;
    }

    this.resources = {
        numberOfItems: Resource.msgf('label.number.items.in.cart', 'cart', null, this.numItems),
        minicartCountOfItems: Resource.msgf('minicart.count', 'common', null, this.numItems),
        emptyCartMsg: Resource.msg('info.cart.empty.msg', 'cart', null)
    };
}

module.exports = CartModel;

