export class Carrito {
        static addProduct(curso) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                console.log(curso.code);

                const existingItemIndex = cart.findIndex(item => item.code === curso.code);
                if (existingItemIndex !== -1) {
                        console.log(curso);
                        
                        cart[existingItemIndex].quantity += 1;
                } else {
                        cart.push({ ...curso, quantity: 1 });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
        }
}
