import { marked } from "marked";

export function parseMarkdown(text: string) {
  return marked.parse(text);
}
