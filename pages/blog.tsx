import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import path from "path";

const Home: NextPage<{
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}> = ({ source }) => {
  return (
    <div className="w-full flex justify-center">
      <article className="prose lg:prose-xl">
        <h1>Test</h1>
        <MDXRemote {...source} />
      </article>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere

  const filePath = path.join(process.cwd(), "posts/", "theo-rocks.md");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const mdxSource = await serialize(fileContents);
  return { props: { source: mdxSource } };
}
