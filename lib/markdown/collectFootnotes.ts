import { Node, FootnoteDefinition, Footnote } from './types';
import { isParent, isFootnoteDefinition, isFootnote, isFootnoteReference } from './guards';

export function collectFootnotes(n: Node): Array<FootnoteDefinition | Footnote> {
  function collectFootnoteRef(n: Node): Array<string | Footnote> {
    if (isFootnote(n)) return [n];
    if (isFootnoteReference(n)) return [n.identifier];
    if (isParent(n)) return n.children.map(collectFootnoteRef).reduce((pre, cur) => [...pre, ...cur], []);
    return [];
  }

  function collectFootnoteDef(n: Node): Record<string, FootnoteDefinition> {
    if (isFootnoteDefinition(n)) return { [n.identifier]: n };
    if (isParent(n)) return n.children.map(collectFootnoteDef).reduce((pre, cur) => ({ ...pre, ...cur }));
    return {};
  }

  const footnotes = collectFootnoteRef(n);
  const defs = collectFootnoteDef(n);

  return distinct(footnotes)
    .map(fn => (typeof fn !== 'string' ? fn : defs[fn]))
    .filter(fn => fn != null);
}

function distinct<A>(arr: readonly A[]): A[] {
  const res: A[] = [];
  const set = new Set<A>();
  for (const v of arr) {
    if (set.has(v)) continue;
    res.push(v);
    set.add(v);
  }
  return res;
}
