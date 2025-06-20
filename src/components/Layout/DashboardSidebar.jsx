// // src/components/Layout/DashboardSidebar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom'; // Assuming you use React Router

// const DashboardSidebar = ({ userRole }) => {
//   const getNavItems = () => {
//     switch (userRole) {
//       case 'ADMIN':
//         return [
//           { to: '/admin/dashboard', label: 'Admin Overview' },
//           { to: '/admin/candidates', label: 'Manage Candidates' },
//           { to: '/admin/officers', label: 'Manage Officers' },
//           { to: '/admin/pages', label: 'Manage Site Pages' },
//           // ... other admin links
//         ];
//       case 'ENLISTMENT_OFFICER':
//         return [
//           { to: '/officer/dashboard', label: 'Officer Overview' },
//           { to: '/officer/applications', label: 'Review Applications' },
//           // ... other officer links
//         ];
//       case 'RECEPTION_COMMISSION':
//         return [
//           { to: '/reception/dashboard', label: 'Commission Overview' },
//           {
//             to: '/reception/admission-decisions',
//             label: 'Finalize Admissions',
//           },
//           // ... other commission links
//         ];
//       default:
//         return [];
//     }
//   };

//   const navItems = getNavItems();

//   return (
//     <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
//       <div className="text-2xl font-bold mb-8 text-center">Dashboard</div>
//       <ul>
//         {navItems.map((item, index) => (
//           <li key={index} className="mb-2">
//             <Link
//               to={item.to}
//               className="block px-4 py-2 rounded hover:bg-gray-700 transition"
//             >
//               {item.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// };

// export default DashboardSidebar;

// src/components/Layout/DashboardSidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardSidebar = ({ userRole }) => {
  const navigate = useNavigate(); // For potential logout button if needed here

  const getNavItems = () => {
    switch (userRole) {
      case 'ADMIN':
        return [
          { to: '/admin/dashboard', label: 'Admin Overview' },
          { to: '/admin/candidates', label: 'Manage Candidates' },
          { to: '/admin/pages', label: 'Manage Site Pages' },
          { to: '/admin/universities', label: 'Manage Universities' }, // Add university management
          // Add more admin links here
        ];
      case 'ENLISTMENT_OFFICER':
        return [
          { to: '/officer/dashboard', label: 'Officer Overview' },
          { to: '/officer/applications', label: 'Review Applications' },
          // Add more officer links here
        ];
      case 'CANDIDATE':
        return [
          { to: '/candidate/dashboard', label: 'My Dashboard' },
          { to: '/candidate/profile', label: 'My Profile' },
          { to: '/candidate/documents', label: 'My Documents' },
          { to: '/candidate/exams', label: 'Exam Results' },
          // Add more candidate links here
        ];
      default:
        return []; // No navigation for unknown roles or if not logged in (though this sidebar is in protected routes)
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 flex-shrink-0">
      <div className="text-xl font-bold mb-8 text-center text-gray-200">
        {userRole} Panel
      </div>
      <ul>
        {navItems.map((item, index) => (
          <li key={index} className="mb-2">
            <Link
              to={item.to}
              className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-gray-300 transition duration-200 text-sm"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {/* You might add a logout button here too if it's specific to the dashboard */}
    </aside>
  );
};

export default DashboardSidebar;
