export async function getSessionUser() {
  const res = await fetch("http://localhost:5000/api/me", {
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}
