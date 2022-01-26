export const addProductToCart = (product) => {
    return {
        type: "addToCart",
        payload: product
    }
}

export const setCartItemQuantity = (productId, quantity) => {
    return {
        type: "setCartItemQuantity",
        payload: {
            productId: productId,
            quantity: quantity
        }
    }
}

export const removeCartItemFromCart = (productId) => {
    return {
        type: "removeCartItemFromCart",
        payload: productId
    }
}


export const clearCart = () => {
    return {
        type: "clearCart",
    }
}