function generateTimeOptions() {
  const options: { label: string; value: string }[] = [];

  for (let hour = 6; hour <= 21; hour++) {
    for (const minute of [0, 30]) {
      const h = hour.toString().padStart(2, "0");
      const m = minute.toString().padStart(2, "0");
      const value = `${h}:${m}`;

      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const label = `${displayHour}:${m} ${period}`;

      options.push({ label, value });
    }
  }

  return options;
}

export const TIME_OPTIONS = generateTimeOptions();
