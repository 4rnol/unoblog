import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./MenuPosts.module.css"

interface MenuPostsProps {
  withImage: boolean;
}

const MenuPosts = ({ withImage }: MenuPostsProps) => {
  return (
    <div className={styles.items}>
      <Link href="/" className={styles.item}>
        {withImage && (
          <div className={styles.imageContainer}>
            <Image src="/fashion.png" alt="" fill className={styles.image} />
          </div>
        )}
        <div className={styles.textContainer}>
          
          <h3 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>John Doe</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      
    </div>
  );
};

export default MenuPosts;
