// import React from 'react';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// /**
//  * @param {boolean} fullScreen - Centers loader in the middle of the screen with a backdrop
//  * @param {string} message - Optional text to display below the animation
//  * @param {number} size - Controls the width/height of the Lottie animation
//  */
// const Loader = ({ fullScreen = false, message = "Loading...", size = 200 }) => {
  
//   const loaderContent = (
//     <div className="flex flex-col items-center justify-center">
//       <div style={{ width: size, height: size }}>
//         <DotLottieReact
//           src="https://lottie.host/90573f5b-caf0-44f4-8756-5bc8aa96e1ef/5kYEdXxdKA.lottie"
//           loop
//           autoplay
//         />
//       </div>
      
//       {message && (
//         <p className="mt-2 text-slate-600 font-semibold tracking-wide animate-pulse">
//           {message}
//         </p>
//       )}
//     </div>
//   );

//   if (fullScreen) {
//     return (
//       <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
//         {loaderContent}
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center w-full p-10">
//       {loaderContent}
//     </div>
//   );
// };

// export default Loader;

// import React from 'react';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// /**
//  * @param {boolean} fullScreen - Centers loader in the middle of the screen with a backdrop
//  * @param {string} message - Optional text to display below the animation
//  * @param {number} size - Controls the width/height of the Lottie animation
//  */
// const Loader = ({ fullScreen = false, message = "Loading...", size = 200 }) => {
  
//   const loaderContent = (
//     <div className="flex flex-col items-center justify-center">
//       <div style={{ width: size, height: size }}>
//         <DotLottieReact
//           // New Animation Source integrated here
//           src="https://lottie.host/61054a76-e2a0-4ef0-9b08-95849afe0a8b/kNMotXTeMG.lottie"
//           loop
//           autoplay
//         />
//       </div>
      
//       {message && (
//         <p className="mt-2 text-slate-600 font-semibold tracking-wide animate-pulse text-center">
//           {message}
//         </p>
//       )}
//     </div>
//   );

//   if (fullScreen) {
//     return (
//       <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
//         {loaderContent}
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center w-full p-10">
//       {loaderContent}
//     </div>
//   );
// };

// export default Loader;







import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

/**
 * @param {boolean} fullScreen - Centers loader in the middle of the screen with a white backdrop
 * @param {string} message - Optional text to display below the animation
 * @param {number} size - Controls the width/height of the Lottie animation
 */
const Loader = ({ fullScreen = false, message = "Loading...", size = 200 }) => {
  
  const loaderContent = (
    <div className="flex flex-col items-center justify-center">
      <div style={{ width: size, height: size }}>
        <DotLottieReact
          // Your latest Lottie animation source
          src="https://lottie.host/89097d02-ef81-47d4-a0c4-cca0a33d42ae/eDcvVGUbav.lottie"
          loop
          autoplay
        />
      </div>
      
      {message && (
        <p className="mt-2 text-slate-600 font-semibold tracking-wide animate-pulse text-center">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full p-10">
      {loaderContent}
    </div>
  );
};

export default Loader;