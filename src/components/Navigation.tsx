import { NavLink, Link } from "react-router";


export default function Navigation() {
    return (
        <nav>
      {/* NavLink makes it easy to show active states */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "active" : ""
        }
      >
        Home
      </NavLink>

      <Link to="draft">Draft!</Link>
      <Link to="about">About Us</Link>
      <Link to="collection">Vault</Link>
    </nav>
    // <>
    // im a nav bar
    // </>
    )
}

