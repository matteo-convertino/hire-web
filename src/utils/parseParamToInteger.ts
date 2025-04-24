export function parseParamToInteger(value: any): number | undefined {
  const parsed = Number(value);

  if (isNaN(parsed) || !Number.isInteger(parsed)) {
    return undefined;
  }

  return parsed;
}
