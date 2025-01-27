"use client";
import { useRouter } from "next/navigation";
import { useTabs } from "../contexts/TabContexts";

const Navbar = () => {
  const router = useRouter();
  const { addTab } = useTabs();

  const navigateTo = (path: string) => {
    const pageTitle = path === "/" ? "Home" : path.split("/").pop();
    addTab({ title: pageTitle, path }); // Add tab on navigation
    router.push(path);
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        background: "#f5f5f5",
        marginBottom: "20px",
      }}
    >
      <button onClick={() => navigateTo("/")} style={navButtonStyle}>
        Home
      </button>
      <button onClick={() => navigateTo("/about")} style={navButtonStyle}>
        About
      </button>
      <button onClick={() => navigateTo("/contact")} style={navButtonStyle}>
        Contact
      </button>
    </nav>
  );
};

const navButtonStyle = {
  padding: "10px 20px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  background: "#0070f3",
  color: "#fff",
  cursor: "pointer",
};

export default Navbar;
