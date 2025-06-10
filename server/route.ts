// import fs from 'fs/promises';
// import path from 'path';
// import matter from 'gray-matter';
// import { remark } from 'remark';
// import html from 'remark-html';

// export async function GET(request: Request, { params }: { params: { slug: string } }) {
//     const { slug } = await params; 
//     const postsDirectory = path.join(process.cwd(), 'content/blog');
//     const fullPath = path.join(postsDirectory, `${slug}.md`);

//     try {
//         const fileContents = await fs.readFile(fullPath, 'utf8');

//         const { default: matter } = await import('gray-matter');
//         const { data, content } = matter(fileContents);

//         return new Response(JSON.stringify({ data, content }), {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         console.error(`Error reading file: ${error}`);
//         return new Response('Error reading file', { status: 500 });
//     }
// }
"use client";

export async function GET(request: Request, { params }: { params: { slug: string } }) {

    return "test";
}