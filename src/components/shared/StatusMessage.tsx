type MessageTone = "warning" | "error" | "success";

interface StatusMessageProps {
  message: string;
  size?: "sm" | "lg";
}

function getMessageTone(message: string): MessageTone {
  const lower = message.toLowerCase();
  if (message.includes("⚠️") || lower.includes("overlap")) return "warning";
  if (
    message.includes("❌") ||
    lower.includes("failed") ||
    lower.includes("error")
  )
    return "error";
  return "success";
}

const toneClasses: Record<MessageTone, { sm: string; lg: string }> = {
  warning: {
    sm: "bg-yellow-50 border-yellow-200 text-yellow-800",
    lg: "bg-yellow-100 border-yellow-300 text-yellow-900",
  },
  error: {
    sm: "bg-red-50 border-red-200 text-red-800",
    lg: "bg-red-100 border-red-300 text-red-900",
  },
  success: {
    sm: "bg-green-50 border-green-200 text-green-800",
    lg: "bg-green-100 border-green-300 text-green-900",
  },
};

const sizeClasses = {
  sm: "mt-4 p-3 rounded-lg text-sm",
  lg: "mt-6 mx-auto max-w-md lg:max-w-none p-6 rounded-2xl text-center lg:text-left text-base lg:text-xl font-semibold",
};

export default function StatusMessage({
  message,
  size = "sm",
}: StatusMessageProps) {
  const tone = getMessageTone(message);

  return (
    <div
      className={`border shadow-sm ${sizeClasses[size]} ${toneClasses[tone][size]}`}
    >
      {message}
    </div>
  );
}
