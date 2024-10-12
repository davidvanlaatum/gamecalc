export function convertStringToFloatOrCurrentValue(value: string, current?: number): number | undefined {
  let newValue = current;
  if (value == '') {
    newValue = undefined;
  } else {
    const num = parseFloat(value);
    if (Number.isFinite(num)) {
      newValue = num;
    }
  }
  return newValue;
}

export function formatDuration(seconds: number | undefined): string {
  if (seconds === undefined) {
    return '';
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const hoursStr = hours > 0 ? `${hours}h ` : '';
  const minutesStr = minutes > 0 ? `${minutes}m ` : '';
  const secondsStr = secs > 0 ? `${secs}s` : '';

  return `${hoursStr}${minutesStr}${secondsStr}`.trim();
}

function countDecimalPlaces(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  const valueStr = value.toString();
  const decimalIndex = valueStr.indexOf('.');
  return decimalIndex === -1 ? 0 : valueStr.length - decimalIndex - 1;
}

export function validNumber(
  value: unknown,
  opts: { min?: number; max?: number; maxDecimals?: number; multipleOf?: number },
): boolean {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return false;
  }
  if (opts.min !== undefined && value < opts.min) {
    return false;
  }
  if (opts.max !== undefined && value > opts.max) {
    return false;
  }
  if (opts.maxDecimals !== undefined && countDecimalPlaces(value) > opts.maxDecimals) {
    return false;
  }
  return !(opts.multipleOf !== undefined && value % opts.multipleOf !== 0);
}
