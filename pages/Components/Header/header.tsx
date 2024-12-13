import { useCart } from "../../Context/CartContext";
import { Link, animateScroll as scroll } from "react-scroll";

export default function Header() {
    const { setCartOpen, isCartOpen, cartState  } = useCart();
    const totalItems = cartState.items.reduce((total, item) => total + item.quantity, 0);

    const handleChooseToyClick = () => {
        const catalogBlock = document.getElementById("catalogBlock");
    
        if (catalogBlock) {
          scroll.scrollTo(catalogBlock.offsetTop - 50, {
            duration: 500,
            smooth: true,
          });
        }
      };

    return (
        <header>
            <div className="logo">
                Пушинки
            </div>
            <div className="nav">
                <ul>
                    <li onClick={() => handleChooseToyClick()}>Игрушки</li>
                    {/* <li onClick={() => handleChooseToyClick()}>Зимний уют</li> */}
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