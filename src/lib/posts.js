import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 投稿が格納されているパスを取得
const postsDir = path.join(process.cwd(), "src/posts");

/**
 * すべての投稿情報を取得
 *
 * @returns すべての投稿情報
 */
export const getAllPosts = () => {
  const fileNames = fs.readdirSync(postsDir);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(postsDir, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { content, data } = matter(fileContents);

    return { slug, content, ...data };
  });
};
