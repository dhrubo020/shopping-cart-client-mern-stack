import { getDatabaseCart } from "./DatabaseManager";

const discountPrice = (name, original, discount) => {
    let mainPrice = parseInt(original)
    let dis = parseInt(discount)
    let priceNow = (mainPrice - mainPrice * (dis / 100)).toFixed(0)
    // console.log( name, mainPrice,priceNow);
    return parseInt(priceNow);
}

const priceMultiplyQuantity = (price, quantity) => {
    // console.log(price, quantity);
    let intPrice = parseInt(price)
    return intPrice * quantity;
}

const updateCartContext = () => {
    const currentCart = getDatabaseCart()
    const allCartKeyArray = Object.keys(currentCart)
    return allCartKeyArray;
}

const getCartSummary = (cartArray) => {
    console.log(cartArray);

    let sumOfDiscountPrice = 0, sumOfOriginalPrice = 0, sumOfShippingCharge = 0, totalDiscountPrice = 0, totalPayable = 0;
    cartArray.map(each => {
        sumOfDiscountPrice += (each.quantity * discountPrice(each.name, each.price, each.discount))
        // console.log(each.quantity*(discountPrice(each.name, each.price, each.discount)));

        sumOfOriginalPrice += (each.quantity * parseInt(each.price))
        sumOfShippingCharge += parseInt(each.shippingCharge)
    })
    totalDiscountPrice = sumOfOriginalPrice - sumOfDiscountPrice;
    totalPayable = sumOfDiscountPrice + sumOfShippingCharge;
    // console.log(sumOfDiscountPrice, sumOfOriginalPrice, sumOfShippingCharge);
    return { subTotal: sumOfDiscountPrice, discount: totalDiscountPrice, shippingCharge: sumOfShippingCharge, totalPayable }
}


const processPromoCode = (priceSummary, codeInfo) => {
    console.log(priceSummary, codeInfo);
    let newPromoDiscount = parseInt(codeInfo.promoDiscount);
    let useTime = parseInt(codeInfo.useTime)
    
    if (codeInfo.promoActive && codeInfo.usages<useTime) {

        if ((new Date() > new Date(codeInfo.startDate)) && (new Date() < new Date(codeInfo.endDate))) {
            let less = (priceSummary.totalPayable * codeInfo.promoDiscount/100);
            newPromoDiscount = priceSummary.totalPayable - less;
            return {discount:less, payable:newPromoDiscount, expired:false, invalid: false}
        } else {
            return {discount:0, payable:0, expired:'Code Expired', invalid: false}
        }
    }else{
        return {discount:0, payable:0, expired:false, invalid: 'Code Invalid'}
    }

}
export { updateCartContext, discountPrice, priceMultiplyQuantity, getCartSummary, processPromoCode };