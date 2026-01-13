import { list } from "./data.js";

export const startPublisher = (io, time) => {
  let counter = 0;
  let itemIndex = 0;
  setInterval(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    io.to("list-updates").emit("update", {
      id: list[itemIndex].id,
      name: `${list[itemIndex].name} ~ ${counter}`,
      lastUpdated: formattedDate,
    });
    console.log("publish num ", counter);
    itemIndex = (itemIndex + 1) % list.length;
    counter++;
  }, time);
};
