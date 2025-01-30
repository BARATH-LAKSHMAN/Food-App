import { makeAutoObservable } from 'mobx';

class CartStore {
    cart = [];
    orders = [];

    constructor() {
        makeAutoObservable(this);
    }

    addItem(item) {
        const existingItem = this.cart.find(
            (cartItem) =>
                cartItem.kname === item.kname && cartItem.name === item.name
        );
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }
    }

    removeItem(item) {
        const existingItemIndex = this.cart.findIndex(
            (cartItem) =>
                cartItem.kname === item.kname && cartItem.name === item.name
        );
        if (existingItemIndex !== -1) {
            if (this.cart[existingItemIndex].quantity > 1) {
                this.cart[existingItemIndex].quantity -= 1;
            } else {
                this.cart.splice(existingItemIndex, 1);
            }
        }
    }

    get totalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);

    }

    get totalPrice() {
        return this.cart.reduce((sum, item) => sum + 40 * item.quantity, 0);
    }

    addOrder() {
        const order = {
            orderId: Date.now(),
            date: new Date().toLocaleDateString(),
            items: [...this.cart],
            totalQuantity: this.totalItems,
            totalPrice: this.totalPrice,
            status: "Yet to Accept"
        };
        this.orders.push(order);
        this.cart=[]
    }

    get pendingOrders() {
        return this.orders.filter(order => order.status === "Yet to Accept");
    }

    acceptOrder = (id) => {
        const orderIndex = this.orders.findIndex((order) => order.orderId === id);
        if (orderIndex !== -1) {
          this.orders[orderIndex].status = "Accepted";
        }
    };

    get acceptedOrders() {
        return this.orders.filter(order => order.status === "Accepted");
    }

    declineOrder = (id) => {
        const orderIndex = this.orders.findIndex((order) => order.orderId === id);
        if (orderIndex !== -1) {
          this.orders[orderIndex].status = "Declined";
        }
    };
}

const cartStore = new CartStore();
export default cartStore