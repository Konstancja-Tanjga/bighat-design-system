import { useEffect, useState } from 'react';

/**
 * True from the render after mount.
 *
 * A live region announces what changes inside it, not what it holds when it
 * appears: most screen readers stay silent about a role="status" or
 * role="alert" that mounts with its words already in it. So a region that has
 * to be heard on arrival mounts empty and receives its content one render
 * later. Internal - not exported from the package.
 */
export function useAfterMount(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
