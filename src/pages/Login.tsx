import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple auth for demo: 'a' and 'a'
    if (email === "a" && password === "a") {
      dispatch(login(email));
      navigate("/dashboard");
    } else {
      alert("Please use 'a' for both email and password for this demo.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[60] bg-[#09090b]/60 backdrop-blur-md">
      {/* Background Aurora */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse-soft" />

      <div className="glass-dark p-10 rounded-[2.5rem] shadow-2xl border border-white/10 w-full max-w-md relative overflow-hidden">
        <Link 
          to="/" 
          className="absolute top-6 right-8 text-gray-500 hover:text-white transition-colors text-xl font-bold"
        >
          ✕
        </Link>

        <form onSubmit={handleLogin} className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black tracking-tighter uppercase aurora-text mb-2">Welcome Back</h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase">Continue your journey</p>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-blue-400 transition-colors">Email Address</label>
              <input
                type="text"
                placeholder="Hint: a"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700 text-white"
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-purple-400 transition-colors">Password</label>
              <input
                type="password"
                placeholder="Hint: a"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700 text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-500/20"
            >
              Sign In
            </button>
          </div>

          <p className="text-center mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            Don't have an account? <span className="text-blue-500 cursor-pointer hover:underline">Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
