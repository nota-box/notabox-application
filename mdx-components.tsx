import type { MDXComponents } from 'mdx/types';
import { H1, H2, H3, H4 } from '@/components/docs/mdx/headings';
import { Code } from '@/components/docs/mdx/code';
import { Pre } from '@/components/docs/mdx/pre';
import { Link } from '@/components/docs/mdx/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    code: Code,
    pre: Pre,
    a: Link,
    ...components,
  };
}