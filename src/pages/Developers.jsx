import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const developers = [
  {
    name: 'Sakshi Joshi',
    photo: 'https://via.placeholder.com/150', // Replace with actual photo if available
    role: 'AI Developer',
    description: 'Passionate about AI and Data Science, and making impactful solutions.',
    github: 'https://github.com/sakshijoshi',
    instagram: 'https://instagram.com/sakshi_insta',
    email: 'sakshi.joshi@example.com',
    twitter: 'https://twitter.com/sakshi_twitter',
  },
  {
    name: 'Lulwa Anif',
    photo: 'https://via.placeholder.com/150',
    role: 'Frontend Developer',
    description: 'Expert in frontend development and crafting beautiful UIs.',
    github: 'https://github.com/lulwaanif',
    instagram: 'https://instagram.com/lulwa_insta',
    email: 'lulwa.anif@example.com',
    twitter: 'https://twitter.com/lulwa_twitter',
  },
  {
    name: 'Rutika Gite',
    photo: 'https://via.placeholder.com/150',
    role: 'Backend Developer',
    description: 'Building scalable backend systems and APIs.',
    github: 'https://github.com/rutikagite',
    instagram: 'https://instagram.com/rutika_insta',
    email: 'rutika.gite@example.com',
    twitter: 'https://twitter.com/rutika_twitter',
  },
  {
    name: 'Shravani Kakad',
    photo: 'https://via.placeholder.com/150',
    role: 'Full Stack Developer',
    description: 'Bridging the gap between frontend and backend.',
    github: 'https://github.com/shravanikakad',
    instagram: 'https://instagram.com/shravani_insta',
    email: 'shravani.kakad@example.com',
    twitter: 'https://twitter.com/shravani_twitter',
  },
  {
    name: 'Swarali Bedse',
    photo: 'https://via.placeholder.com/150',
    role: 'UI/UX Designer',
    description: 'Creating intuitive and user-friendly designs.',
    github: 'https://github.com/swaralibedse',
    instagram: 'https://instagram.com/swarali_insta',
    email: 'swarali.bedse@example.com',
    twitter: 'https://twitter.com/swarali_twitter',
  }
];

function Developers() {
  return (
    <div className="md:pt-24 pb-10 lg:px-8 pt-24 bg-gray-100 mx-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-color">Developed By</h1>
      <div className="flex items-center justify-center flex-col gap-5 md:flex-row">
        {developers.map((developer, index) => (
          <div key={index} className="bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md">
            <div className="flex flex-col items-center">
              <img src={developer.photo} alt={developer.name} className="w-32 h-32 rounded-full mb-6" />
              <h2 className="text-2xl font-bold mb-2 font-kalam text-primary-color text-center">{developer.name}</h2>
              <h3 className="text-sm text-gray-100 mb-4">{developer.role}</h3>
              <p className="text-gray-100 text-center mb-4">{developer.description}</p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mb-6">Hire Me</button>
              <div className="flex justify-center space-x-6 mb-4">
                <a href={developer.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-500 transition-colors duration-300 p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
                <a href={developer.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-500 transition-colors duration-300 p-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a href={developer.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-500 transition-colors duration-300 p-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </div>
              <p className="text-gray-100 text-center">{developer.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Developers;
