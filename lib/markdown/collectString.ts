import { Node } from './types';
import { isParent, isLiteral } from './guards';

export function collectString(n: Node): string | undefined {
  if (isLiteral(n)) return n.value;
  if (isParent(n)) {
    const res = n.children.map(collectString).filter((v): v is string => v != null);
    return res.length === 0 ? undefined : res.join('');
  }
  return undefined;
}
