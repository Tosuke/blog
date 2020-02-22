import React from 'react';
import { Box } from '@chakra-ui/core';
import { HighlightTree } from '../../lib/highlight';

export const HighlightedCode: React.FC<React.ComponentProps<typeof Box> & { code: HighlightTree }> = ({
  code,
  ...rest
}) => (
  <Box as="pre" className="hljs" {...rest}>
    <code>
      <HLCodeContent code={code} />
    </code>
  </Box>
);

const HLCodeContent: React.FC<{ code: HighlightTree }> = ({ code }) => (
  <>
    {code.map(n =>
      typeof n === 'string' ? (
        n
      ) : (
        <span className={n[0]}>
          <HLCodeContent code={n[1]} />
        </span>
      )
    )}
  </>
);

export const InlineCode: React.FC<React.ComponentProps<typeof Box> & { code: string }> = ({ code, ...rest }) => (
  <Box as="code" className="hljs" display="inline" p={0} {...rest}>
    {code}
  </Box>
);
