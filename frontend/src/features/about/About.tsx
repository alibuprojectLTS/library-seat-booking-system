import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGlobe, faUsers, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import aboutHero from '../../assets/images/about-hero.jpg';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div 
        className="relative w-full h-[400px] flex items-center justify-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(8,40,69,0.7), rgba(8,40,69,0.9)), url(${aboutHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">About Us</h1>
          <p className="text-xl text-blue-100 font-medium">Making a difference together</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faBook} className="text-3xl" style={{ color: '#082845' }} />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-center mb-8" style={{ color: '#082845' }}>
            The National Library Service Board
          </h2>

          {/* ✅ Supervisor's Exact Text */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center font-medium mb-12">
            Established under the National Library Service Act of 1967, the National Library Service Board is dedicated to empowering the people of Malawi through nationwide access to educational, training, and informational resources. Believing that a reading nation is a leading nation, we are continuously evolving beyond traditional walls—moving from "bricks to clicks" to serve you better.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center font-medium mb-12">
            Whether you are accessing our rich digital collections, creating in our state-of-the-art computer labs, gathering in the Pabwalo multipurpose space, or meeting our mobile library in your local community, this institution belongs to you. Together, as partners in learning and growth, we are building a brighter, more informed future for Malawi.
          </p>

          {/* Core Values / Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGraduationCap} className="text-xl" style={{ color: '#186BB1' }} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Educational Resources</h3>
              <p className="text-sm text-gray-500">Access thousands of physical and digital learning materials.</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faGlobe} className="text-xl" style={{ color: '#186BB1' }} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Nationwide Access</h3>
              <p className="text-sm text-gray-500">Serving communities across Malawi through our mobile libraries.</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-xl" style={{ color: '#186BB1' }} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Community Growth</h3>
              <p className="text-sm text-gray-500">Building a brighter, more informed future for all Malawians.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;