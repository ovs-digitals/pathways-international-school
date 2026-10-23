
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  Children,
  isValidElement,
  Fragment,
} from "react";

const Ctx = createContext({
  pathname: "/",
  hash: "",
  search: "",
  params: {},
});

function parse() {
  const raw = window.location.hash || "";

  if (!raw || raw === "#") {
    return { pathname: "/", hash: "" };
  }

  const body = raw.slice(1);

  if (!body.startsWith("/")) {
    return { pathname: "/", hash: "#" + body };
  }

  const queryIndex = body.indexOf("?");
  const hashIndex = body.indexOf("#");

  let pathname = body;
  let search = "";
  let hash = "";

  if (queryIndex !== -1) {
    pathname = body.slice(0, queryIndex);
    search = body.slice(queryIndex, hashIndex !== -1 ? hashIndex : undefined);
  }

  if (hashIndex !== -1) {
    pathname = body.slice(
      0,
      queryIndex !== -1 && queryIndex < hashIndex
        ? queryIndex
        : hashIndex
    );
    hash = body.slice(hashIndex);
  }

  try {
    pathname = decodeURI(pathname);
  } catch {
    // Keep the original pathname if it contains malformed encoding.
  }

  return {
    pathname: pathname || "/",
    hash,
    search,
  };
}

function hrefFor(to, current = "/") {
  if (typeof to !== "string") {
    to = to?.pathname || "/";
  }

  if (/^(https?:|mailto:|tel:)/i.test(to)) {
    return to;
  }

  if (to.startsWith("#")) {
    return "#" + current + to;
  }

  if (!to.startsWith("/")) {
    to = "/" + to;
  }

  return "#" + to;
}

export function BrowserRouter({ children }) {
  const [loc, setLoc] = useState(parse);

  useEffect(() => {
    const onChange = () => {
      setLoc((previous) => {
        const next = parse();

        if (
          next.pathname !== previous.pathname &&
          !next.hash
        ) {
          window.scrollTo(0, 0);
        }

        return next;
      });
    };

    window.addEventListener("hashchange", onChange);
    window.addEventListener("popstate", onChange);

    return () => {
      window.removeEventListener("hashchange", onChange);
      window.removeEventListener("popstate", onChange);
    };
  }, []);

  return (
    <Ctx.Provider
      value={{
        ...loc,
        params: {},
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const HashRouter = BrowserRouter;

export function useLocation() {
  const location = useContext(Ctx);

  return {
    pathname: location.pathname,
    hash: location.hash,
    search: location.search || "",
  };
}

export function useParams() {
  return useContext(Ctx).params || {};
}

export function useNavigate() {
  const location = useContext(Ctx);

  return (to) => {
    if (typeof to === "number") {
      window.history.go(to);
      return;
    }

    window.location.hash = hrefFor(
      to,
      location.pathname
    ).slice(1);
  };
}

export const Link = React.forwardRef(function Link(
  { to = "/", children, replace, state, ...rest },
  ref
) {
  const location = useContext(Ctx);
  const href = hrefFor(to, location.pathname);

  const handleClick = (event) => {
    rest.onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (
      typeof to === "string" &&
      /^(https?:|mailto:|tel:)/i.test(to)
    ) {
      return;
    }

    event.preventDefault();

    if (replace) {
      window.history.replaceState(null, "", href);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      window.location.hash = href.slice(1);
    }
  };

  return (
    <a
      {...rest}
      ref={ref}
      href={href}
      onClick={handleClick}
    >
      {children}
    </a>
  );
});

export const NavLink = Link;

function match(pattern = "*", pathname = "/") {
  const normalize = (value) =>
    value.replace(/\/+$/, "") || "/";

  const patternParts = normalize(pattern).split("/");
  const pathParts = normalize(pathname).split("/");

  if (pattern === "*") {
    return {};
  }

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  const params = {};

  for (let i = 0; i < patternParts.length; i++) {
    const expected = patternParts[i];
    const actual = pathParts[i];

    if (expected.startsWith(":")) {
      params[expected.slice(1)] = actual;
    } else if (
      expected.toLowerCase() !== actual.toLowerCase()
    ) {
      return null;
    }
  }

  return params;
}

export function Route() {
  return null;
}

export function Routes({ children }) {
  const location = useContext(Ctx);
  const routes = [];

  const collectRoutes = (items) => {
    Children.forEach(items, (element) => {
      if (!isValidElement(element)) return;

      if (element.type === Fragment) {
        collectRoutes(element.props.children);
      } else {
        routes.push(element);
      }
    });
  };

  collectRoutes(children);

  for (const route of routes) {
    const params = match(
      route.props.path || "*",
      location.pathname
    );

    if (params !== null) {
      return (
        <Ctx.Provider
          value={{
            ...location,
            params,
          }}
        >
          {route.props.element ?? null}
        </Ctx.Provider>
      );
    }
  }

  return null;
}

export function Navigate({ to = "/", replace = true }) {
  useEffect(() => {
    const href = hrefFor(to, "/");

    if (replace) {
      window.history.replaceState(null, "", href);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      window.location.hash = href.slice(1);
    }
  }, [to, replace]);

  return null;
}
