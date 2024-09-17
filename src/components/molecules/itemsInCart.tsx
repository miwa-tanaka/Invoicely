import Link from "next/link";
import CartIcon from "@/components/atoms/cartIcon";
import ItemQuantityIcon from "@/components/atoms/itemQuantityIcon";
import style from "@/styles/itemsInCart.module.scss";

export default function ItemsInCart(): JSX.Element {
  return (
    <Link href="/" className={style.wrapper}>
      <CartIcon />
      <ItemQuantityIcon quantity={0} />
    </Link>
  );
}
