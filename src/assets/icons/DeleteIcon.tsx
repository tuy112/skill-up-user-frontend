// src/assets/icons/DeleteIcon.tsx

export default function DeleteIcon({ color }: { color?: string }) {
  if (!color) color = "#000";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 4L4 20M4 4L20 20"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
