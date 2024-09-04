const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const monthSort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


const d = new Date();
const date = d.getDate();
const year = d.getFullYear();
const monthSortName = monthSort[d.getMonth()];
const lastMonth = month[d.getMonth() - 1];
let name = month[d.getMonth()];

export {
  name,
  date,
  year,
  monthSortName,
  lastMonth,
  d
}