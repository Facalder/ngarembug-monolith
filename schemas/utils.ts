import { z } from "zod";

/**
 * Creates a Zod schema that handles aliased values (e.g. for query parameters).
 * Accepts string, comma-separated string, or array of strings.
 * Maps aliases to actual values using the provided map.
 * Filters out invalid values.
 */
export const createAliasSchema = <T extends string>(
  values: T[],
  aliasMap: Record<string, string>,
) => {
  return z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      const inputs = Array.isArray(val) ? val : val.split(",");
      const mapped = inputs
        .map((item) => aliasMap[item] || item)
        .filter((item): item is T => values.includes(item as T));

      return mapped.length > 0 ? mapped : undefined;
    });
};
