import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../i18n/LanguageContext";

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: "login" | "register";
}

export function AuthModal({
  onClose,
  onSuccess,
  initialMode = "login",
}: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "register" && password !== confirmPassword) {
      setError(t.auth.errors.passwordsMismatch);
      return;
    }

    if (mode === "register") {
      if (password.length < 8) {
        setError(t.auth.errors.passwordTooShort);
        return;
      }
      if (!/[a-zA-Z]/.test(password)) {
        setError(t.auth.errors.passwordNoLetter);
        return;
      }
      if (!/[^a-zA-Z0-9]/.test(password)) {
        setError(t.auth.errors.passwordNoSymbol);
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (
          err.message.includes("user-not-found") ||
          err.message.includes("wrong-password") ||
          err.message.includes("invalid-credential")
        ) {
          setError(t.auth.errors.invalidCredential);
        } else if (err.message.includes("email-already-in-use")) {
          setError(t.auth.errors.emailInUse);
        } else if (err.message.includes("invalid-email")) {
          setError(t.auth.errors.invalidEmail);
        } else {
          setError(err.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      {/* Modal box — stop click from closing when clicking inside */}
      <div
        className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 w-full max-w-md mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-6">
          {mode === "login" ? t.auth.logIn : t.auth.createAccount}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              {t.auth.email}
            </label>{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              {t.auth.password}
            </label>{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
              placeholder="••••••••"
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                {t.auth.confirmPassword}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                placeholder="••••••••"
              />
            </div>
          )}

          {/* Error message */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading
              ? t.auth.loading
              : mode === "login"
                ? t.auth.logIn
                : t.auth.createAccount}
          </button>
        </form>

        {/* Switch mode */}
        <p className="text-center text-gray-400 text-sm mt-6">
          {mode === "login" ? t.auth.noAccount : t.auth.hasAccount}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError(null);
            }}
            className="text-white underline hover:no-underline"
          >
            {mode === "login" ? t.auth.register : t.auth.logIn}
          </button>
        </p>
      </div>
    </div>
  );
}
