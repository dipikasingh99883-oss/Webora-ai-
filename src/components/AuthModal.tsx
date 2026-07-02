import React, { useState } from 'react';
import { googleSignIn, User } from '../firebase';
import { Shield, LogIn, Chrome, X, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { email: string; displayName: string; photoURL: string; isAdmin: boolean; token?: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        onSuccess({
          email: result.user.email || '',
          displayName: result.user.displayName || 'Webora Client',
          photoURL: result.user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          isAdmin: result.user.email === 'dipikasingh99883@gmail.com',
          token: result.accessToken
        });
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      setError('Google authenticaton failed. Please check popup permissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Hardcoded credentials for simulation or agency demo
    const isDefaultAdmin = adminEmail === 'admin@webora.ai' && adminPassword === 'webora-admin-2026';
    const isNewAdmin = adminEmail === '@Ujjwal07' && adminPassword === '@Raksha12';

    if (isDefaultAdmin || isNewAdmin) {
      onSuccess({
        email: adminEmail,
        displayName: isNewAdmin ? 'Mr. Ujjwal Singh' : 'Webora Administrator',
        photoURL: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        isAdmin: true
      });
      onClose();
    } else {
      setError('Invalid Administrator credentials.');
    }
    setLoading(false);
  };

  return (
    <div id="auth-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div id="auth-modal" className="w-full max-w-md overflow-hidden rounded-2xl glass glow-blue relative p-8">
        {/* Close Button */}
        <button 
          onClick={onClose}
          id="auth-close-btn"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 mb-3">
            {isAdminMode ? <Shield className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white">
            {isAdminMode ? 'Admin Portal Access' : 'Sign in to Webora AI'}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {isAdminMode 
              ? 'Enter administrative agency credentials.' 
              : 'Create complete website documents & export directly to Google Drive.'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div id="auth-error" className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2.5 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Forms */}
        {!isAdminMode ? (
          <div className="space-y-4">
            {/* Google Sign-in */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              id="google-signin-btn"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-750 text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Chrome className="w-5 h-5 text-blue-400" />
              <span>Continue with Google</span>
            </button>

            <div className="relative my-6 flex py-2 items-center">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase font-semibold tracking-wider">Agency Staff</span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            {/* Admin toggle */}
            <button
              onClick={() => { setIsAdminMode(true); setError(null); }}
              id="toggle-admin-btn"
              className="w-full py-2.5 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium border border-blue-500/10 hover:border-blue-500/20 rounded-xl bg-blue-500/5"
            >
              Access Administrator Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Admin Email / Handle</label>
              <input
                type="text"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder=" Enter Name"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              id="admin-submit-btn"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Verify Credentials
            </button>

            <button
              type="button"
              onClick={() => { setIsAdminMode(false); setError(null); }}
              id="back-to-client-btn"
              className="w-full text-center text-xs text-gray-400 hover:text-white transition-colors pt-2 block font-medium"
            >
              ← Back to Client Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
