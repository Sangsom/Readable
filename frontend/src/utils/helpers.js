export function generateToken() {
  return (localStorage.token = Math.random()
    .toString(36)
    .substr(-8));
}
