import { ParsedQs } from 'qs';

export default function queryParam(val: ParsedQs[string], fallback: string): string {
  return typeof val === 'string' ? val : fallback;
}
