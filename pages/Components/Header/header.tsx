import Link from "next/link";
import { useCart } from "../../../Context/CartContext";
import { animateScroll as scroll } from "react-scroll";

export default function Header() {
  const { setCartOpen, isCartOpen, cartState } = useCart();
  const totalItems = cartState.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
        <Link href="/">Пушинки</Link>
      </div>
      <div className="nav">
        <ul>
          {typeof window !== "undefined" && window.location.pathname === "/" ? (
            <li
              onClick={(e) => {
                e.preventDefault(); // Предотвращаем стандартный переход
                handleChooseToyClick(); // Прокрутка к блоку
              }}
            >
              Игрушки
            </li>
          ) : (
            <li>
              <Link href="/">Игрушки</Link>
            </li>
          )}
          <li>
            <Link href="/contacts">Контакты</Link>
          </li>
          <li>
            <Link href="/delivery">Доставка</Link>
          </li>
          <li>Статус заказа</li>
        </ul>
      </div>
      <div className="actions">
        <img src="./icons/wishlist.svg" alt="" />
        <img
          src="./icons/bag.svg"
          alt=""
          onClick={() => setCartOpen(!isCartOpen)}
        />
        {totalItems > 0 && (
          <span
            onClick={() => setCartOpen(!isCartOpen)}
            className="cartItemCount"
          >
            {totalItems}
          </span>
        )}
      </div>
    </header>
  );
}
