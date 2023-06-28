export function formatUnixTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const hourAndMinute = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date.toLocaleDateString()} ${hourAndMinute}`;
}
