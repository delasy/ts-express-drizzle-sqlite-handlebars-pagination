export interface Cursor {
  collection: string
  id: number
}

export function decode(collection: string, cursor: string): Cursor | null {
  if (cursor === '') {
    return {
      collection,
      id: 0,
    };
  }

  try {
    const text = Buffer.from(cursor, 'base64').toString();
    const [collectionName, idText] = text.split(':');
    const id = Number.parseInt(idText, 10);

    if (isNaN(id) || !isFinite(id) || id < 0) {
      return null;
    }

    if (collectionName !== 'Product') {
      return null;
    }

    return { collection, id };
  } catch {
    return null;
  }
}

export function encode(collection: string, id: number): string {
  return Buffer.from(`${collection}:${id}`).toString('base64');
}
