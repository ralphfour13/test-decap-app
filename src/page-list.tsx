export default async function PageList() {
  const response = await fetch("http://localhost:3000/api/pages");
  const pages = await response.json();

  return pages;
}
