/* holds an array of cart items
*   state = [
*   {
*       product,
*       quantity
*   },
*   {
*       product,
*       quantity
*   }
* ]
*/
const cartReducer = (cart = {items: [], totalPrice: 0, itemCount: 0}, action) => {
    const getItemIndexFromProductId = (productId) => {
        return cart.items.findIndex((item) => item.product.Id === productId);
    }
    const getItemCount = (items) => {
        return items.reduce((acc, curr) => acc + curr.quantity, 0)
    }
    const calculateTotalPrice = (items) => {
        return items.reduce((acc, curr) => acc + curr.quantity * curr.product.ProductPrice, 0)
    }
    switch (action.type) {
        case "addToCart":
            let product = action.payload
            if (product === undefined) return cart;
            let newState = {
                ...cart
                , items: [...cart.items]
            }
            // if not found add the product to array
            if (getItemIndexFromProductId(product.Id) === -1) {
                let newItemCount = cart.itemCount + 1
                let newItems = [...cart.items,
                        {
                            product: product,
                            quantity: 1
                        }];
                newState = {
                    ...cart,
                    items: newItems,
                    itemCount: newItemCount,
                    totalPrice: calculateTotalPrice(newItems)
                }
                return newState
                // if it is found increase quantity
            } else {
                let newItems = [...cart.items]
                let item = newItems[getItemIndexFromProductId(product.Id)]
                let quantity = newItems[getItemIndexFromProductId(product.Id)].quantity
                item.quantity += item.product.Stock >= quantity + 1 ? 1 : 0
                newItems[getItemIndexFromProductId(product.Id)] = item
                newState = {...newState, items: [...newItems], itemCount: getItemCount(newItems) , totalPrice: calculateTotalPrice(newItems)}
            }
            return newState

        case "setCartItemQuantity":
            if (getItemIndexFromProductId(action.payload.productId) === -1)
                return cart
            let newItems = [...cart.items]
            newItems[getItemIndexFromProductId(action.payload.productId)].quantity = action.payload.quantity
            const count = getItemCount(newItems);
            const total = calculateTotalPrice(newItems);
            return {...cart, itemCount: count, items: newItems , totalPrice: total}
        case "removeCartItemFromCart":
            let index = getItemIndexFromProductId(action.payload)
            if (index !== -1) {
                let items = [...cart.items]
                items.splice(index, 1);
                const count = getItemCount(items);
                return {...cart, items: [...items], itemCount: count, totalPrice: calculateTotalPrice(items)}
            }
            return cart
        case "checkout":
            return cart
        default:
            return cart
    }
}

export default cartReducer;