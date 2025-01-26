import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <h2>HamataiTech Blog</h2>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <a href={`posts/${post.slug}`}>{post.title}</a>
              <p>{post.date}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
