import { useCart } from "../../Context/CartContext";

export default function Header() {
    const { setCartOpen, isCartOpen, cartState  } = useCart();
    const totalItems = cartState.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header>
            <div className="logo">
                Пушинки
            </div>
            <div className="nav">
                <ul>
                    <li>Игрушки</li>
                    <li>Контакты</li>
                    <li>Доставка</li>
                    <li>Оплата</li>
                    <li>Статус заказа</li>
                </ul>
            </div>
            <div className="actions">
                <img src="./icons/wishlist.svg" alt="" />
                <img src="./icons/bag.svg" alt="" onClick={() => setCartOpen(!isCartOpen)} />
                {totalItems > 0 && <span onClick={() => setCartOpen(!isCartOpen)} className="cartItemCount">{totalItems}</span>}
            </div>
        </header>
    )
}   