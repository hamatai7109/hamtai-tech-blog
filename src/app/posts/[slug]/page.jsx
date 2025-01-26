import { getAllPosts } from "@/lib/posts";
import MarkdownIt from "markdown-it";
import { notFound } from "next/navigation";

const md = new MarkdownIt();

/**
 * 動的ルートの静的ページ生成のためのパラメータを生成します。
 * この関数は、Next.jsのビルド時に自動的に呼び出されます。
 *
 * @returns {Promise<Array<{ slug: string }>>} 投稿データから生成されたルートパラメータの配列
 *
 * 例:
 * [
 *   { slug: "post-1" },
 *   { slug: "post-2" }
 * ]
 */
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * すべての投稿から遷移先の投稿のみを取り出す
 * @param slug 投稿id
 * @returns 遷移先の投稿内容
 */
async function fetchPost(slug) {
  const posts = getAllPosts();
  const targetPost = posts.find((post) => post.slug === slug);

  return targetPost;
}

export default async function Post({ params }) {
  const post = await fetchPost(params.slug);

  if (!post) {
    notFound();
  }

  // 取得したマークダウン形式の記述をHTMLに変換
  const htmlContent = md.render(post.content);

  return (
    <article>
      <h1>{post.title}</h1>
      <p className="post-meta"></p>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
