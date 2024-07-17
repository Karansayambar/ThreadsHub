import ContentLoader from 'react-content-loader';

const MobileLoader = (props) => (
 <ContentLoader viewBox="0 0 900 280" height={150} width={400} backgroundColor="#76abae22" foregroundColor="#555" {...props}>
    {/* Image on the left */}
    <rect x="10" y="10" rx="0" ry="0" width="250" height="244" />

    {/* Text and other elements */}
    <rect x="280" y="18" rx="0" ry="0" width="504" height="9" />
    <rect x="280" y="41" rx="0" ry="0" width="504" height="9" />
    <rect x="280" y="65" rx="0" ry="0" width="364" height="9" />
    <rect x="280" y="98" rx="0" ry="0" width="200" height="9" />
    <rect x="280" y="115" rx="0" ry="0" width="200" height="10" />
  </ContentLoader>
);

// Medium.metadata = {
//   name: 'DaniloWoz',
//   github: 'danilowoz',
//   description: 'Medium',
//   filename: 'Medium',
// };

export default MobileLoader;
