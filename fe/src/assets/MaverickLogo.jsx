// MaverickLogo.jsx
export const MaverickLogo = ({
                                 width = 200,
                                 height = 48,
                                 primary = "#000000",   // Đen
                                 accent = "#D62828",    // Đỏ
                             }) => (
    <svg
        role="img"
        aria-label="Maverick"
        viewBox="0 0 800 180"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            {/* Gợi ý font sans hiện đại; nếu bạn đã dùng font khác thì vẫn ổn */}
            <style>{`
        .mv-word {
          font-family: 'Poppins','Montserrat','Segoe UI',Arial,sans-serif;
          font-weight: 800;
          font-size: 110px;
          letter-spacing: 2px;
        }
      `}</style>
        </defs>

        {/* Chữ "MA" + "ERICK" màu đen, riêng chữ "V" màu đỏ để làm điểm nhấn */}
        <text className="mv-word" x="8" y="115" fill={primary}>
            MA
            <tspan fill={accent}>V</tspan>
            ERICK
        </text>

        {/* Gạch nhấn màu đỏ nhẹ dạng “swoosh” dưới đuôi chữ, cho cảm giác tốc độ */}
        <path
            d="M40,140 C210,165 445,168 690,142"
            fill="none"
            stroke={accent}
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.9"
        />
    </svg>
);
