import type { FC, HTMLAttributes } from "react";
import styles from "./PolaroidPhoto.module.css";

export interface PolaroidPhotoProps extends HTMLAttributes<HTMLDivElement> {
  /** The source URL of the image. */
  src: string;
  /** The alternative text for the image, for accessibility. */
  alt: string;
  /** The handwritten-style caption displayed below the photo. */
  caption: string;
  /** The rotation angle in degrees. Defaults to a slight random rotation. */
  rotation?: number;
  /** Optional className for custom styling. */
  className?: string;
}

/**
 * A component that displays an image in a classic polaroid-style frame
 * with a handwritten caption and a subtle tilt effect.
 */
export const PolaroidPhoto: FC<PolaroidPhotoProps> = ({
  src,
  alt,
  caption,
  rotation,
  className,
  ...props
}) => {
  // Use the provided rotation or generate a random one between -2 and 2 degrees for a natural look.
  const finalRotation =
    rotation !== undefined ? rotation : Math.random() * 4 - 2;

  return (
    <div
      className={`${styles.polaroid} ${className ?? ""}`}
      style={{ "--rotation-angle": `${finalRotation}deg` } as React.CSSProperties}
      {...props}
    >
      <figure className={styles.figure}>
        <img src={src} alt={alt} className={styles.photo} />
        <figcaption className={styles.caption}>{caption}</figcaption>
      </figure>
    </div>
  );
};