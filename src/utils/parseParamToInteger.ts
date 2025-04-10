export function parseParamToInteger(value: any): number | null {
  const parsed = Number(value);

  if (isNaN(parsed) || !Number.isInteger(parsed)) {
    return null;
  }

  return parsed;
}
