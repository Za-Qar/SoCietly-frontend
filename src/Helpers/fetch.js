//Config
import { url } from "../config";

export default async function fetchData(path) {
  console.log("fetch");
  const res = await fetch(`${url}${path}`);
  const data = await res.json();
  console.log(data);
  return new Promise(function (myResolve, myReject) {
    myResolve(data);
  });
}
