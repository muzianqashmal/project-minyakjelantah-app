export default function Header() {
  return (
    <div style={{
      background: "white",
      padding: "15px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
    }}>
      <h3>Dashboard</h3>
      <div>Owner</div>
    </div>
  );
}