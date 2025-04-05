import { makeAutoObservable } from 'mobx';

class CartStore {
    cart = [];
    isVegOnly = false;

    constructor() {
        makeAutoObservable(this);
    }

    get totalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    addToCart(item) {
        const existingItem = this.cart.find(
            (cartItem) => cartItem.kitchenName === item.kitchenName && cartItem.dishName === item.dishName
        );

        if (existingItem) {
            existingItem.quantity += item.quantity;
            if (existingItem.quantity <= 0) {
                this.removeFromCart(item.kitchenName, item.dishName);
            }
        } else if (item.quantity > 0) {
            this.cart.push({ ...item });
        }
    }

    removeFromCart(kitchenName, dishName) {
        this.cart = this.cart.filter(
            (item) => !(item.kitchenName === kitchenName && item.dishName === dishName)
        );
    }

    getQuantity(kitchenName, dishName) {
        const item = this.cart.find(
            (cartItem) => cartItem.kitchenName === kitchenName && cartItem.dishName === dishName
        );
        return item ? item.quantity : 0;
    }

    clearCart() {
        this.cart = [];
    }

    setVegOnly(value) {
        this.isVegOnly = value;
    }
}

const cartStore = new CartStore();
export default cartStore;