import style from "@/styles/itemQuantityIcon.module.scss";

type ItemQuantityIconProps = {
  quantity: number;
};

export default function ItemQuantityIcon({
  quantity,
}: ItemQuantityIconProps): JSX.Element {
  return <span className={`${style.icon} ${style.animation}`}>{quantity}</span>;
}
