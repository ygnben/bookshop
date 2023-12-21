import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  // Get the current route location
  const location = useLocation();

  // Extract the pathname from the location object
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((pathname, index) => {
          // Form the current route path by concatenating the pathnames
          const routePath = `/${pathnames.slice(0, index + 1).join("/")}`;

          // Capitalize each pathname segment to make it more readable
          const capitalizedPathname =
            pathname.charAt(0).toUpperCase() + pathname.slice(1);

          // Render a breadcrumb link for each pathname segment
          return (
            <li key={index}>
              <Link to={routePath}>{capitalizedPathname}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
