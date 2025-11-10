import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Failed to signup with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] flex">
      {/* Left side - Logo/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f5f1e8] relative overflow-hidden">
        {/* Full size logo as background */}
        <img 
          src="/img.png" 
          alt="ResumeForge Logo" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Translucent text overlay at bottom center */}
        <div className="absolute bottom-12 left-0 right-0 z-10 flex justify-center px-12">
          <div className="text-center backdrop-blur-md px-10 py-6 rounded-3xl bg-white/10">
            <h1 className="text-5xl font-bold text-[#2d2a26]">ResumeForge</h1>
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#e8dcc4]/30">
        <div className="w-full max-w-md flex-1 flex flex-col justify-center">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-bold text-[#2d2a26]">ResumeForge</h1>
          </div>

          {/* Signup heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-[#2d2a26] mb-2">Create an account</h2>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-[#6b5d4f]">Already have an account?</span>
              <Link to="/login" className="text-[#2d2a26] underline hover:no-underline">
                log in instead
              </Link>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2d2a26] mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-[#d4c5a9] bg-[#f5f1e8] rounded-lg text-[#2d2a26] placeholder-[#a89270] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2d2a26] mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-[#d4c5a9] bg-[#f5f1e8] rounded-lg text-[#2d2a26] placeholder-[#a89270] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2d2a26] mb-1.5">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-[#d4c5a9] bg-[#f5f1e8] rounded-lg text-[#2d2a26] placeholder-[#a89270] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2d2a26] text-[#f5f1e8] py-3 rounded-lg font-medium hover:bg-[#3d3933] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating account...' : 'Create an account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d4c5a9]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#e8dcc4]/30 text-[#6b5d4f]">OR</span>
            </div>
          </div>

          {/* Google Signup */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            type="button"
            className="w-full bg-[#f5f1e8] border border-[#d4c5a9] text-[#2d2a26] py-3 rounded-lg font-medium hover:bg-[#e8dcc4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Monkey illustration at bottom */}
        <div className="mt-8 flex justify-center">
          <img 
            src="https://assets.integrity.sh/assets/monkey-Oy299BHX.png" 
            alt="" 
            className="w-24 h-24 object-contain opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
