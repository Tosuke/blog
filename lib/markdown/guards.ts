import { Node, Parent as UnistParent } from 'unist';
import { Parent, Literal, Code, Definition, FootnoteDefinition, Footnote, FootnoteReference } from './types';

export function isUnistParent(n: Node): n is UnistParent {
  return Array.isArray(n.children);
}

export function isParent(n: Node): n is Parent {
  return Array.isArray(n.children);
}

export function isLiteral(n: Node): n is Literal {
  return typeof n.value === 'string';
}

export function isCode(n: Node): n is Code {
  return n.type === 'code';
}

export function isDefinition(n: Node): n is Definition {
  return n.type === 'definition';
}

export function isFootnoteDefinition(n: Node): n is FootnoteDefinition {
  return n.type === 'footnoteDefinition';
}

export function isFootnote(n: Node): n is Footnote {
  return n.type === 'footnote';
}

export function isFootnoteReference(n: Node): n is FootnoteReference {
  return n.type === 'footnoteReference';
}
