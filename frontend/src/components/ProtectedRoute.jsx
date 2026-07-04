import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div data-testid="auth-loading" className="flex items-center justify-center py-32 text-zinc-500 font-mono text-sm">
        checking session…
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
};
