import parse from "/models/utils.js";

const data = await fetch("models/data.json").then((res) => res.json());
const parsed_categories = parse(data);

export default parsed_categories;