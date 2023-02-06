import { ADD_TO_CART, UPDATE_CART, DELETE_ITEM_CART } from "../../shared/constants/actionType";

const initState = {
    items : [],
}

export default (state = initState, action) => {
    switch(action.type) {
        case ADD_TO_CART: return addItem(state, action.payload);
        case UPDATE_CART: return updateCart(state, action.payload);
        case DELETE_ITEM_CART: return deleteItemCart(state, action.payload);
        default: return state;
    }
}

const addItem = (state, payload) => {
    const items = state.items;
    let isProductExists = false;

    items.map((item, index) => {
        if (item.id === payload._id) {
            item.qty += payload.qty;
            isProductExists = true;
        }
        return item;
    });

    const newItems = isProductExists? items : [...items, payload];

    // Lưu vào localStorage
    localStorage.setItem('cart_items', JSON.stringify(newItems));
    return {...state, items: newItems}
}

/**
 * Giai thich updateCart
 * It takes a state and a payload, then it maps over the items in the state, and if the item's id
 * matches the id in the payload, it sets the item's qty to the qty in the payload.
 * @param state - the current state of the store
 * @param payload - {id: "5d9f114099f0052a68e83a93", qty: 2}
 * @returns The new state.
 */
const updateCart = (state, payload) => {
    const items = state.items;
    const {id, qty} = payload;
    const newCarts = items.map((item, index) => {
        if(item._id === id) {
            item.qty = qty;
        }
        return item;
    })
    return {...state, items:newCarts};
};

const deleteItemCart = (state, payload) => {
    const items = state.items;
    const {id} = payload;
    const newCarts = items.filter((item) => {
        if(item._id === id) {
            return false;
        }
        return true;
    });
    return {...state, items:newCarts};
};