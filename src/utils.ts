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
