import React, { createContext, useContext, useEffect, useState, Children, isValidElement, Fragment } from "react";
const Ctx = createContext({ pathname: "/", hash: "", search: "", params: {} });
function parse(prevPath = "/") {
  const raw = decodeURI(window.location.hash || "");
  if (!raw || raw === "#") return { pathname: "/", hash: "" };
  const body = raw.slice(1);
  if (!body.startsWith("/")) return { pathname: prevPath, hash: "#" + body };
  const i = body.indexOf("#");
  return i === -1 ? { pathname: body || "/", hash: "" } : { pathname: body.slice(0, i) || "/", hash: body.slice(i) };
}
function hrefFor(to, current) {
  if (typeof to !== "string") to = (to && to.pathname) || "/";
  if (/^(https?:|mailto:|tel:)/.test(to)) return to;
  if (to.startsWith("#")) return "#" + current + to;
  return "#" + to;
}
export function BrowserRouter({ children }) {
  const [loc, setLoc] = useState(() => parse());
  useEffect(() => {
    const on = () => setLoc((prev) => {
      const next = parse(prev.pathname);
      if (next.pathname !== prev.pathname && !next.hash) window.scrollTo(0, 0);
      return next;
    });
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return <Ctx.Provider value={{ ...loc, search: "", params: {} }}>{children}</Ctx.Provider>;
}
export const HashRouter = BrowserRouter;
export function useLocation() { const c = useContext(Ctx); return { pathname: c.pathname, hash: c.hash, search: "" }; }
export function useParams() { return useContext(Ctx).params || {}; }
export function useNavigate() { const c = useContext(Ctx); return (to) => { if (typeof to === "number") return history.go(to); window.location.hash = hrefFor(to, c.pathname).slice(1); }; }
export const Link = React.forwardRef(function Link({ to, children, replace, state, ...rest }, ref) {
  const c = useContext(Ctx);
  return <a ref={ref} href={hrefFor(to, c.pathname)} {...rest}>{children}</a>;
});
export const NavLink = Link;
function match(pattern, path) {
  const norm = (s) => s.replace(/\/+$/, "") || "/";
  const p = norm(pattern).split("/"), a = norm(path).split("/");
  if (pattern === "*") return {};
  if (p.length !== a.length) return null;
  const params = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(":")) params[p[i].slice(1)] = a[i];
    else if (p[i].toLowerCase() !== a[i].toLowerCase()) return null;
  }
  return params;
}
export function Route() { return null; }
export function Routes({ children }) {
  const c = useContext(Ctx);
  const list = [];
  const walk = (ch) => Children.forEach(ch, (el) => { if (!isValidElement(el)) return; if (el.type === Fragment) walk(el.props.children); else list.push(el); });
  walk(children);
  for (const el of list) {
    const params = match(el.props.path || "*", c.pathname);
    if (params) return <Ctx.Provider value={{ ...c, params }}>{el.props.element}</Ctx.Provider>;
  }
  return null;
}
export function Navigate({ to }) { useEffect(() => { window.location.hash = hrefFor(to, "/").slice(1); }, [to]); return null; }
