import { useCart } from "../../Context/CartContext";

export default function Header() {
    const { setCartOpen, isCartOpen } = useCart();
    

    return (
        <header>
            <div className="logo">
                Пушинки
            </div>
            <div className="nav">
                <ul>
                    <li>Игрушки</li>
                    <li>Доставка</li>
                    <li>Оплата</li>
                    <li>Статус заказа</li>
                </ul>
            </div>
            <div className="actions">
                <img src="./icons/wishlist.svg" alt="" />
                <img src="./icons/bag.svg" alt="" onClick={() => setCartOpen(!isCartOpen)} />
            </div>
        </header>
    )
}   