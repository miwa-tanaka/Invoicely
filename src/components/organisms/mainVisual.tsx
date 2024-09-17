import styles from "@/styles/mainVisual.module.scss";

export default function MainVisual(): JSX.Element {
  return (
    <section className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          tortor felis, porta at enim eu, condimentum auctor ipsum. Ut et eros
          ac felis finibus varius et sit amet arcu. Nulla nec diam pellentesque
          risus fermentum feugiat nec et arcu. Integer lobortis nisi libero, id
          convallis velit condimentum ut. Maecenas molestie urna ipsum, vitae
          dignissim elit interdum sit amet. Duis vitae congue neque. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Fusce nec urna mollis, dignissim justo nec, vulputate augue.
        </p>
      </div>
    </section>
  );
}
