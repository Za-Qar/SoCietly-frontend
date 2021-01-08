export default async function fetchData(path) {
  console.log("fetch");
  const res = await fetch(`https://falcon5ives.herokuapp.com${path}`);
  const data = await res.json();

  return new Promise(function (myResolve, myReject) {
    myResolve(data);
  });
}
