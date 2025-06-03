import { GetStaticProps, GetStaticPaths } from "next";
import { getPostBySlug, getPostSlugs } from "../../../../lib/posts";
import { marked } from "marked";

interface Props {
  content: string;
  meta: {
    title: string;
    date: string;
  };
}

export default function BlogPost({ content, meta }: Props) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      <p className="text-gray-500">{meta.date}</p>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  const htmlContent = marked(post.content);

  return {
    props: {
      content: htmlContent,
      meta: post.meta,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getPostSlugs().map((slug) => slug.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
