import styles from "./BlogCard.module.css";

type BlogCardProps = {
    post: {
        slug: string;
        title: string;
        excerpt?: string | null;
        author?: string | null;
        publishedAt?: string | null;
        coverImage?: string | null;
        tags?: string[] | null;
    };
};

export default function BlogCard({ post }: BlogCardProps) {
    const date = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : null;

    return (
        <a href={`/blog/${post.slug}`} className={`card ${styles.card}`}>
            {post.coverImage && (
                <div className={styles.imageWrap}>
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className={styles.image}
                    />
                </div>
            )}
            <div className={styles.body}>
                <h3 className={styles.title}>{post.title}</h3>
                {post.excerpt && (
                    <p className={styles.excerpt}>{post.excerpt}</p>
                )}
                <div className={styles.meta}>
                    {post.author && (
                        <span className={styles.author}>{post.author}</span>
                    )}
                    {post.author && date && (
                        <span aria-hidden="true">&middot;</span>
                    )}
                    {date && <span className={styles.date}>{date}</span>}
                </div>
            </div>
        </a>
    );
}
