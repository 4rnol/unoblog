"use client"
import Link from "next/link";
import { getCategories } from "@/lib/data";

import styles from "./MenuCategories.module.css";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";

const MenuCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() =>{
    getCategories().then(val=>setCategories(val));
  },[])
  

  return (
    <div className={styles.categoryList}>
      {categories.map((item) => (
        <Link
          href={`/blog?cat=${item.slug}`}
          key={item.id}
          className={`${styles.categoryItem}`}
          style={{ backgroundColor: item.color! }}
        >
          {item.title}
        </Link>
      ))
      }
    </div>
  );
};

export default MenuCategories;
