import fs from "fs";
import path from "path";
import matter from "gray-matter";
const dir = path.join(process.cwd(), "content");
export interface ContentMeta { title:string; date:string; description:string; tags:string[]; thumbnail?:string; published:boolean; journal?:string; doi?:string; coAuthors?:string[]; status?:"published"|"in-review"|"in-progress"; github?:string; demo?:string; tech?:string[]; role?:string; organization?:string; location?:string; startDate?:string; endDate?:string; category?:"work"|"education"|"organization"; gallery?:string[]; }
export interface ContentItem { slug:string; meta:ContentMeta; content:string; }
export function getAllContent(cat:string):ContentItem[] {
  const d = path.join(dir,cat); if(!fs.existsSync(d))return [];
  return fs.readdirSync(d).filter(f=>f.endsWith(".mdx")).map(f=>{
    const {data,content}=matter(fs.readFileSync(path.join(d,f),"utf-8"));
    return {slug:f.replace(".mdx",""),meta:data as ContentMeta,content};
  }).filter(i=>i.meta.published!==false).sort((a,b)=>new Date(b.meta.date).getTime()-new Date(a.meta.date).getTime());
}
export function getContentBySlug(cat:string,slug:string):ContentItem|null {
  const fp=path.join(dir,cat,`${slug}.mdx`); if(!fs.existsSync(fp))return null;
  const {data,content}=matter(fs.readFileSync(fp,"utf-8"));
  return {slug,meta:data as ContentMeta,content};
}
