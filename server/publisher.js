import { list } from "./data.js";
export default function startPublisher(io, time) {
  let counter = 0;
  let itemIndex = 0;
  setInterval(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    io.to("foo").emit("update", {
      id: list[itemIndex].id,
      name: `${list[itemIndex].name} ${counter}`,
      lastUpdated: formattedDate,
    });
    console.log("published to foo ", counter);
    itemIndex = (itemIndex + 1) % list.length;
    counter++;
  }, time);
}
