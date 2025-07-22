export default async function PageList() {
  const response = await fetch("https://test-decap-app.netlify.app/api/pages");
  const pages = await response.json();

  return pages;
}
