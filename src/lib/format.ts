export function timeAgo(dateString: string) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);

  const units: [string, number][] = [
    ["년", 31536000],
    ["개월", 2592000],
    ["일", 86400],
    ["시간", 3600],
    ["분", 60],
  ];

  for (const [label, secondsInUnit] of units) {
    const value = Math.floor(seconds / secondsInUnit);
    if (value >= 1) return `${value}${label} 전`;
  }

  return "방금 전";
}
