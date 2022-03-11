const parse = (data) => {
  const parsed = {};
  let stored, days, sorted, keys;
  data.forEach((entry) => {
    parsed[entry.category] = parsed[entry.category] || {};
    stored = parsed[entry.category];
    if (stored.day_time && stored.day_freq) {
        ["day_time", "day_freq"].forEach(chart_type => {
          if (Object.keys(stored[chart_type]).includes(entry.date)) 
            stored[chart_type][entry.date] = chart_type === "day_time" ? parseInt(stored.day_time[entry.date]) + parseInt(entry.time_spent) : stored.day_freq[entry.date] += 1;
          else 
            stored[chart_type][entry.date] = chart_type === "day_time" ? entry.time_spent : 1;
        })
    } else 
        parsed[entry.category] = {
            day_time: {[entry.date]: [entry.time_spent]},
            day_freq: {[entry.date]: 1},
        };
  });
  for (let category in parsed) {
    stored = parsed[category], days = [], keys;
    Object.keys(stored).forEach((chart_type) =>  {
      keys = Object.keys(stored[chart_type]);
      days = getDays(new Date(keys[keys.length - 1]), new Date(keys[0]));
      days.forEach(day => {
        if (!stored[chart_type][day]) stored[chart_type][day] = 0;
      })
      sorted = Object.entries(stored[chart_type]).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      stored[chart_type] = Object.fromEntries(sorted);
      stored[chart_type] = {
        labels: Object.keys(stored[chart_type]),
        data: Object.values(stored[chart_type])
      }
    }
    )
  }
  return parsed;
};
const getDays = (start, end) => {
  for (
    var days = [], initial = new Date(new Date(start).setDate(new Date(start).getDate() - 1)), end = new Date(new Date(end).setDate(new Date(end).getDate() + 1)); 
    initial <= end;
    initial.setDate(initial.getDate() + 1)
  ) days.push(new Date(initial).toLocaleDateString("en-US"));
  return days;
};

export default parse;
