import type { LabDataset } from "../types";

/**
 * Creates a localStorage-backed store fully namespaced by brandId so that
 * data from one lab's app can never be read or overwritten by another,
 * even if two apps are opened in the same browser.
 */
export function createLabStore(brandId: string, seed: LabDataset) {
  const key = `mvp-sistema:${brandId}:dataset`;

  function read(): LabDataset {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return clone(seed);
      return JSON.parse(raw) as LabDataset;
    } catch {
      return clone(seed);
    }
  }

  function write(data: LabDataset) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  function reset() {
    write(clone(seed));
  }

  function ensureSeeded() {
    if (!window.localStorage.getItem(key)) {
      write(clone(seed));
    }
  }

  return { read, write, reset, ensureSeeded, key };
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function sessionKey(brandId: string) {
  return `mvp-sistema:${brandId}:session`;
}

export function genId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
