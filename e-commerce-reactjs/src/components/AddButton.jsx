export default function AddButton({onClick}) {
    return (
        <button
            onClick={onClick}
            className="cart-button shadow"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#1b995e",
                color: "white",
                fontSize: "20px",
                border: "none",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
            }}
        >
            +
        </button>
    );
}
