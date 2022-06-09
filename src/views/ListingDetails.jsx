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
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <h3>Loading...</h3>
  }
  return (
    <div>
      <header>
        <h2>{listing.name}</h2>
      </header>
      <main>
        {/* image */}
        <div>{listing.location}</div>
        <div>${listing.regularPrice}.00/night</div>
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
    </div>
  );
};

export default ListingDetails;
