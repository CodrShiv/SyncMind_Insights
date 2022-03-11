import parsed_categories from "../models/parse.js";
import displayChart from "../views/view.js";

let selectedCategory;
["day_time", "day_freq"].forEach((chart_type) => {
  selectedCategory = parsed_categories[Object.keys(parsed_categories)[0]][chart_type];
  displayChart(chart_type, selectedCategory.labels, []);
});
document.querySelectorAll(".cat_select").forEach((select) => {
  let identifier = select.id.split("_").splice(0, 2).join("_");
  Object.keys(parsed_categories).forEach(
    (category) => (select.innerHTML += `<option class="${identifier}" value="${category}">${category}</option>`)
  );
  NiceSelect.bind(select);
  select.options.selectedIndex = 0;
  select.onchange = (e) => {
    selectedCategory = parsed_categories[e.target.value][identifier];
    displayChart(identifier, selectedCategory.labels, selectedCategory.data);
  };
});