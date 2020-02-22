import { highlightCode } from '../highlight';
import { Node } from './types';
import { isParent, isCode } from './guards';

export function highlight(n: Node): Node {
  if (isCode(n)) {
    return {
      type: 'highlightedCode',
      lang: n.lang,
      meta: n.meta,
      value: highlightCode(n.value, n.lang ?? undefined)
    };
  }
  if (isParent(n)) {
    return {
      ...n,
      children: n.children.map(highlight)
    };
  } else {
    return n;
  }
}
