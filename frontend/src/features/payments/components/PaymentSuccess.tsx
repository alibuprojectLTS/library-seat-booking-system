import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTicket,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import AnimatedBackground from '../../../components/AnimatedBackground';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-8 md:p-10 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-6">
            <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-600 text-4xl" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Payment Successful!
          </h2>
          <p className="text-gray-600 text-base font-semibold mt-3">
            Your booking is confirmed. A ticket has been sent to your email.
          </p>

          {/* Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => navigate('/user/tickets')}
              className="w-full py-4 rounded-xl text-lg font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md hover:shadow-lg inline-flex items-center justify-center gap-3"
            >
              <FontAwesomeIcon icon={faTicket} />
              View My Tickets
            </button>

            <button
              onClick={() => navigate('/user')}
              className="w-full py-4 rounded-xl text-lg font-extrabold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition inline-flex items-center justify-center gap-3"
            >
              <FontAwesomeIcon icon={faHome} />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default PaymentSuccess;