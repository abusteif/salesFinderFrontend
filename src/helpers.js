export const getRelativeTime = (dateString) => {
  const now = new Date();
  const givenDate = new Date(dateString);

  const secondsDiff = Math.floor((now - givenDate) / 1000);

  const intervals = {
    year: 31536000, // 60 * 60 * 24 * 365
    month: 2592000, // 60 * 60 * 24 * 30
    week: 604800, // 60 * 60 * 24 * 7
    day: 86400, // 60 * 60 * 24
    hour: 3600, // 60 * 60
    minute: 60, // 60
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    if (secondsDiff >= value) {
      const count = Math.floor(secondsDiff / value);
      return count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`;
    }
  }

  return "just now";
};

export const relativeTimeComparator = (v1, v2) => {
  const parseRelativeTime = (relativeTime) => {
    const [value, unit] = relativeTime.split(" ");
    const multiplier = {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400,
      week: 604800,
      month: 2592000,
      year: 31536000,
    };

    return parseInt(value) * multiplier[unit.replace(/s$/, "")];
  };

  const time1 = parseRelativeTime(v1);
  const time2 = parseRelativeTime(v2);

  return time1 - time2
};
