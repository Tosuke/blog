import { Node } from './types';
import { isParent, isDefinition } from './guards';

export function collectDefinitions(n: Node): Record<string, { label?: string; title?: string; url: string }> {
  if (isDefinition(n)) {
    return {
      [n.identifier]: {
        label: n.label,
        title: n.title,
        url: n.url
      }
    };
  }
  if (isParent(n)) {
    return n.children.map(collectDefinitions).reduce((pre, cur) => ({ ...pre, ...cur }), {});
  }
  return {};
}
