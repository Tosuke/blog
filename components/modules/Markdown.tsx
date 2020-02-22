/** @jsx jsx */
import React, { createContext, useContext } from 'react';
import { Text, Box, List, ListItem, Image, ModalContent, ModalFooter, Tooltip } from '@chakra-ui/core';
import { Content, BlockContent } from '../../lib/markdown/types';
import { isParent } from '../../lib/markdown/guards';
import { collectString } from '../../lib/markdown/collectString';
import { collectDefinitions } from '../../lib/markdown/collectDefinitions';
import { jsx, css } from '@emotion/core';
import { theme } from '../../theme';
import { HighlightedCode } from './Code';
import { collectFootnotes } from '../../lib/markdown/collectFootnotes';

const DefinitionsContext = createContext<ReturnType<typeof collectDefinitions>>({});
const FootnoteContext = createContext<ReturnType<typeof collectFootnotes>>([]);

export const Markdown: React.FC<React.ComponentProps<typeof Box> & { node: Content }> = ({ node, ...rest }) => {
  const footnotes = collectFootnotes(node);
  return (
    <Box
      color="text"
      wordBreak="break-word"
      css={{
        '& > *': {
          marginTop: '0.5rem',
          marginBottom: '0.5rem'
        }
      }}
      {...rest}
    >
      <DefinitionsContext.Provider value={collectDefinitions(node)}>
        <FootnoteContext.Provider value={footnotes}>
          <MDContent node={node} />
          {footnotes.length > 0 && (
            <Box mt={3} pt={3} borderColor="border" borderTopWidth={1}>
              <MDFooter footnotes={footnotes} />
            </Box>
          )}
        </FootnoteContext.Provider>
      </DefinitionsContext.Provider>
    </Box>
  );
};

const heading = (depth: number) => {
  return css({
    '::before': {
      content: `"${'#'.repeat(depth)} "`
    },
    '&:hover::before': {
      color: theme.colors.primary
    }
  });
};

const inlineCode = css({
  backgroundColor: theme.colors.gray[100],
  '@media(prefers-color-scheme: dark)': {
    backgroundColor: '#2b2b2b',
    color: '#f8f8f2'
  }
});

const MDContent: React.FC<{ node: Content }> = ({ node }) => {
  const defs = useContext(DefinitionsContext);
  const footnotes = useContext(FootnoteContext);
  const renderContents = (nodes: Content[]) => nodes.map(n => <MDContent node={n} />);
  switch (node.type) {
    case 'root':
      return <>{renderContents(node.children)}</>;
    case 'paragraph':
      return <Text as="p">{renderContents(node.children)}</Text>;
    case 'heading': {
      const content = collectString(node);
      const id = content != null ? encodeURIComponent(content) : undefined;
      const child = (
        <a css={heading(node.depth)} href={id != null ? `#${id}` : undefined}>
          {renderContents(node.children)}
        </a>
      );
      switch (node.depth) {
        case 1:
          return (
            <Text as="h1" id={id} color="heading" fontSize="4xl" fontWeight="bold">
              {child}
            </Text>
          );
        case 2:
          return (
            <Text as="h2" id={id} color="heading" fontSize="3xl" fontWeight="bold">
              {child}
            </Text>
          );
        case 3:
          return (
            <Text as="h3" id={id} color="heading" fontSize="2xl" fontWeight="bold">
              {child}
            </Text>
          );
        case 4:
          return (
            <Text as="h4" id={id} color="heading" fontSize="2xl" fontWeight="bolder">
              {child}
            </Text>
          );
        case 5:
          return (
            <Text as="h5" id={id} color="heading" fontSize="xl" fontWeight="bold">
              {child}
            </Text>
          );
        case 6:
          return (
            <Text as="h6" id={id} color="heading" fontSize="lg" fontWeight="bolder">
              {child}
            </Text>
          );
        default:
          return null;
      }
    }
    case 'thematicBreak':
      return <Box borderColor="border" borderTopWidth="1px" />;
    case 'list':
      return (
        <List as={node.ordered ? 'ol' : 'ul'} styleType={node.ordered ? 'decimal' : 'disc'} ml="1em">
          {renderContents(node.children)}
        </List>
      );
    case 'listItem':
      return (
        <ListItem>
          {node.children.map(n =>
            n.type === 'paragraph' ? <>{renderContents(n.children)}</> : <MDContent node={n} />
          )}
        </ListItem>
      );
    case 'table': {
      const [head, ...body] = node.children;
      const align = (i: number) =>
        css({
          textAlign: node.align?.[i] ?? undefined
        });
      return (
        <Box as="table" borderColor="border" borderTopWidth={2} borderBottomWidth={2}>
          <Box as="thead" fontWeight="bold" py={1}>
            <tr>
              {head.children.map((n, i) => (
                <Box as="th" css={align(i)} px={2}>
                  <MDContent node={n} />
                </Box>
              ))}
            </tr>
          </Box>
          <tbody>
            {body.map(r => (
              <Box as="tr" py={1} borderColor="border" borderTopWidth={1}>
                {r.children.map((n, i) => (
                  <Box as="td" css={align(i)} px={2}>
                    <MDContent node={n} />
                  </Box>
                ))}
              </Box>
            ))}
          </tbody>
        </Box>
      );
    }
    case 'tableCell':
      return <>{renderContents(node.children)}</>;
    case 'image':
      return <Image display="inline" maxH={64} src={node.url} alt={node.alt} title={node.title} />;
    case 'imageReference': {
      const def = defs[node.identifier];
      return def && <MDContent node={{ type: 'image', url: def.url, title: def.title }} />;
    }
    case 'linkReference': {
      const def = defs[node.identifier];
      return def && <MDContent node={{ type: 'link', url: def.url, children: node.children as any }} />;
    }
    case 'blockquote':
      return (
        <Box as="blockquote" borderLeftColor="border" borderLeftWidth={2} py={1} pl={4}>
          {renderContents(node.children)}
        </Box>
      );
    case 'code':
      return <HighlightedCode code={[node.value]} rounded="md" />;
    case 'highlightedCode':
      return <HighlightedCode code={node.value} rounded="md" />;
    case 'strong':
      return <strong>{renderContents(node.children)}</strong>;
    case 'delete':
      return <del>{renderContents(node.children)}</del>;
    case 'emphasis':
      return <em>{renderContents(node.children)}</em>;
    case 'inlineCode':
      return (
        <Box as="code" px={1} css={inlineCode}>
          {node.value}
        </Box>
      );
    case 'link':
      return (
        <a
          href={node.url}
          css={{
            color: theme.colors.primary,
            ':visited': {
              color: theme.colors.secondary
            },
            ':hover': {
              textDecoration: 'underline'
            }
          }}
        >
          {renderContents(node.children)}
        </a>
      );
    case 'break':
      return <br />;
    case 'text':
      return <>{node.value}</>;
    case 'footnoteReference': {
      const idx = footnotes.findIndex(n => n.identifier === node.identifier);
      return <FootnoteRef index={idx} node={footnotes[idx]} />;
    }
    case 'footnote': {
      const idx = footnotes.findIndex(n => n === node);
      return <FootnoteRef index={idx} node={footnotes[idx]} />;
    }
    case 'footnoteDefinition':
      return null;
    default:
      if (process.env.NODE_ENV === 'development') {
        console.log(`Unknown node type: ${node.type}`);
      }
      if (isParent(node)) {
        return <>{renderContents(node.children)}</>;
      } else {
        return null;
      }
  }
};

const FootnoteRef: React.FC<{ index: number; node?: Content }> = ({ index, node }) => {
  const label = node != null ? collectString(node) ?? '' : '';
  return index >= 0 ? (
    <Box as="sup" color="primary">
      <a href={`#fn${1 + index}`} id={`fnref${1 + index}`} rel="footnote" title={label}>
        [{1 + index}]
      </a>
    </Box>
  ) : null;
};

const MDFooter: React.FC<{ footnotes: ReturnType<typeof collectFootnotes> }> = ({ footnotes }) => (
  <List as="ol" styleType="decimal" listStylePosition="inherit" pl="1em">
    {footnotes.map((n, i) => (
      <ListItem id={`fn${1 + i}`} py={2}>
        {(n.children as Content[]).map((c, j) =>
          j < n.children.length - 1 ? (
            <MDContent node={c} />
          ) : (
            <Box display="block" css={{ '& > *': { display: 'inline' } }}>
              <MDContent node={c} />
              <Box as="span" pl={2}>
                <FootnoteBack index={i} />
              </Box>
            </Box>
          )
        )}
      </ListItem>
    ))}
  </List>
);

const FootnoteBack: React.FC<{ index: number }> = ({ index }) => <a href={`#fnref${1 + index}`}>↩︎</a>;
