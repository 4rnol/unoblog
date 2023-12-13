"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./SinglePage.module.css";
import Menu from "@/app/components/menu/Menu";
import { getSinglePost, ExtendedPost, getPostComments } from "@/lib/data";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Comment } from "@prisma/client";
interface SinglePageProps {
  params: {
    slug: string;
  };
}

const SinglePage = ({ params: { slug } }: SinglePageProps) => {
  const [post, setPost] = useState<any>();
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState<Comment[]>([]);
  const { status } = useSession();

  useEffect(() => {
    getSinglePost(slug).then((val) => {
      setPost(val);
      getPostComments(val?.slug ?? "").then(setComentarios);
    });
  }, []);

  const handleSubmit = async () => {
    const res=await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        desc: comentario,
        postSlug: post.slug,
        //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      getPostComments(post?.slug ?? "").then(setComentarios);
    }    
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: post?.title ?? "" }}
          ></h1>
          <div className={styles.user}>
            {post?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={
                    "https://lh3.googleusercontent.com/a/ACg8ocJZJ89wGhnPGsRaOGKAL2JOBik9nX81bczo3PtqFkR4iy0=s96-c"
                  }
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{post?.user?.name}</span>
              <span className={styles.date}>
                {post?.createdAt &&
                  new Date(post.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </span>
            </div>
          </div>
        </div>
        {post?.img && (
          <div className={styles.imageContainer}>
            <Image src={post.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: post?.desc ?? "" }}
          />

          <div className={styles.items}>
            <h2>Comentarios</h2>

            {comentarios.map((val) => (
              <div className={styles.textContainer}>
                <h3
                  className={styles.postTitle}
                  dangerouslySetInnerHTML={{ __html: val?.desc ?? "" }}
                ></h3>
                <div className={styles.detail}>
                  <span className={styles.username}>{val.userEmail}</span><br/>
                  <span className={styles.date}>
                    {val?.createdAt &&
                      new Date(val.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </span>
                </div>
              </div>
            ))}

            <ReactQuill
              className={styles.input}
              theme="bubble"
              value={comentario}
              onChange={setComentario}
              placeholder="Comente..."
            />
            <button className={styles.publish} onClick={handleSubmit}>
              Publish
            </button>
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
