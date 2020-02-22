import { Node } from 'unist';
import { isUnistParent } from './guards';

export function stripPosition(node: Node): Node {
  const { position: _, children, ...rest } = node;
  if (!isUnistParent(node)) return { ...rest };
  return {
    ...rest,
    children: node.children.map(stripPosition)
  };
}
