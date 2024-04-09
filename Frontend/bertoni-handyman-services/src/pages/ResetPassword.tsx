import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from "../layouts/PageLayout";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle Reset Password Function
  const handleResetPassword = async () => {
    setIsSubmitting(true);
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    
    setIsSubmitting(false);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:3001/reset-password', {
        newPassword: password,
        token,
      });
      navigate('/login', { replace: true });
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
    setIsSubmitting(false); // Only need to set this once at the end of the try/catch block
  };

  return (
    <PageLayout>
      <div className="min-h-screen">
        <PaddingSectionLayout>
          <section className="flex flex-col items-center justify-center text-center">
            <h1 className="p-4 text-4xl font-bold">Reset Your Password</h1>
            <p className="max-w-md p-4 text-xl">
              Please enter your new password below.
            </p>
            <div className="flex w-full flex-col gap-7 rounded-md bg-gray-200 p-4 md:max-w-lg md:p-12">
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border ${
                  error ? "border-red-500" : "border-black"
                } rounded-xl bg-[#F2F2F4] p-1 md:p-2`}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full border ${
                  error ? "border-red-500" : "border-black"
                } rounded-xl bg-[#F2F2F4] p-1 md:p-2`}
              />
              {error && <div className="text-sm text-red-500">{error}</div>}
              <button
                type="submit"
                onClick={handleResetPassword}
                disabled={isSubmitting}
                className="rounded-xl bg-[#F69327] px-5 py-2 text-xs font-medium text-[#2D333A] shadow-md transition-transform hover:scale-105 md:text-lg"
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>

            </div>
          </section>
        </PaddingSectionLayout>
      </div>
    </PageLayout>
  );
};

export default ResetPassword;
