import axios from "axios";

export const fetchList = async () => {
  try {
    const res = await axios.get("http://localhost:3000/list");
    console.log("got ", { res });
    return res.data;
  } catch (error) {
    console.log("Failed fetch List", error);
  }
};
