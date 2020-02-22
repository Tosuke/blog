import { highlight, highlightAuto } from 'lowlight';

export type HighlightTree = Array<string | [string, HighlightTree]>;

export function highlightCode(code: string, lang?: string): HighlightTree {
  const { value: tree } = lang ? highlight(lang, code) : highlightAuto(code);
  const f = (t: typeof tree): HighlightTree =>
    t.map(v => {
      if (v.type === 'text') {
        return v.value;
      } else if (v.type === 'element' && v.tagName === 'span') {
        const classNames: string = v.properties.className?.join(' ') ?? '';
        return [classNames, f(v.children as any)];
      } else {
        return '';
      }
    });
  return f(tree);
}
