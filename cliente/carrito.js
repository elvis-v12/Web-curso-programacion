export class Carrito {
        static addProduct(curso) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                const existingItemIndex = cart.findIndex(item => item.id === curso.id);
                if (existingItemIndex !== -1) {
                        cart[existingItemIndex].quantity += 1;
                } else {
                        cart.push({ ...curso, quantity: 1 });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
        }

        static getProducts() {
                return JSON.parse(localStorage.getItem('cart')) || [];
        }

        static removeProduct(productId) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                cart = cart.filter(item => item.id !== productId);

                localStorage.setItem('cart', JSON.stringify(cart));
        }

        static clearCart() {
                localStorage.removeItem('cart');
        }
}
