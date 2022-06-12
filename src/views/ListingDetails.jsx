import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';

const ListingDetails = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'listings', params.listingId));
        if (docSnap.exists()) {
          setListing(docSnap.data());
          setLoading(false);
        } else {
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, [params.listingId, navigate]);

  if (loading) {
    return;
  }
  return (
    <div>
      <header>
        <h2>{listing.title}</h2>
      </header>
      <main>
        {/* image */}
        <div>{listing.location}</div>
        <div>${listing.price}.00/night</div>
        <span>{listing.bedrooms} bedrooms</span>
        <span> & </span>
        <span>{listing.bathrooms} bathrooms</span>
        <ul>
          <li>Air conditioning: {listing.ac ? 'Yes' : 'No'}</li>
          <li>Parking: {listing.parking ? 'Yes' : 'No'}</li>
          <li>Pool: {listing.pool ? 'Yes' : 'No'}</li>
          <li>Pet-friendly: {listing.petFriendly ? 'Yes' : 'No'}</li>
        </ul>
      </main>
      <Link to={`/category/${params.categoryName}`}>
        <p>Go back</p>
      </Link>
    </div>
  );
};

export default ListingDetails;
