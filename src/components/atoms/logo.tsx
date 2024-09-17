import style from "@/styles/logo.module.scss";

export default function Logo(): JSX.Element {
  return (
    <div className={style.wrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 28 26"
      >
        <path
          fill="#FFF"
          fill-rule="evenodd"
          d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
          role="img"
          aria-hidden={true}
        />
      </svg>
    </div>
  );
}
