import { Link } from "react-router-dom";

export default function CampusDetails({ title }) {
  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ marginBottom: 10 }}>{title}</h1>
      <p>This is the details page. Add content here.</p>
      <Link to="/" style={{ color: "#17365D" }}>← Back</Link>
    </div>
  );
}
