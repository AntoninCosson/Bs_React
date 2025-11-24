// components/ChatActionButtons.jsx
export default function ChatActionButtons({ message, onActionClick }) {
    if (message.type !== "button_response" || !message.actions) {
      return null;
    }
  
    return (
      <div style={styles.wrap}>
        <div style={styles.message}>{message.message}</div>
        <div style={styles.actions}>
          {message.actions.map((action) => (
            <button
              key={action.id}
              style={{
                ...styles.btn,
                ...styles[`btn_${action.style || "primary"}`]
              }}
              onClick={() => onActionClick(action)}
            >
              {action.icon && <span style={styles.icon}>{action.icon} </span>}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  const styles = {
    wrap: { marginBottom: 12 },
    message: {
      background: "#1a1f2e",
      border: "1px solid #232a41",
      borderRadius: 12,
      padding: "10px 12px",
      marginBottom: 8,
      color: "#e8ecf3"
    },
    actions: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      paddingLeft: 12
    },
    btn: {
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #323a55",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
      transition: "all 0.2s"
    },
    btn_primary: {
      background: "#2a2f42",
      color: "#6ee7b7",
      borderColor: "#6ee7b7"
    },
    btn_secondary: {
      background: "#1a1f2e",
      color: "#94a3b8",
      borderColor: "#323a55"
    },
    btn_link: {
      background: "transparent",
      color: "#6ee7b7",
      borderColor: "transparent",
      textDecoration: "underline"
    },
    icon: { marginRight: 4 }
  };
