import { useCart } from "../../Context/CartContext";

export default function Checkout() {
    const { cartState } = useCart();
    console.log(cartState);
    return (
        <>
            123
        </>
    )
}