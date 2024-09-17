import Link from "next/link";
import styles from "@/styles/header.module.scss";
import ItemsInCart from "@/components/molecules/itemsInCart";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <img
          src="/images/icon.png"
          alt="Logo: Blossom Avenue"
          width={45}
          height={45}
        />
        Blossom Avenue
      </Link>
      <div className={styles.icon}>
        <ItemsInCart />
      </div>
    </header>
  );
}
