import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import {
  updateDoc,
  doc,
  collection,
  query,
  getDocs,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { ListingItem } from '../components/ListingItem';

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);

  const { name, email } = user;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      setLoading(true);
      const qSnap = await getDocs(
        query(
          collection(db, 'listings'),
          where('userRef', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc')
        )
      );
      const listings = [];

      qSnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onDelete = async (listingId, title) => {
    if (window.confirm(`Are you sure you wnat to delete ${title}?`)) {
      await deleteDoc(doc(db, 'listings', listingId));
      setListings(listings.filter((listing) => listing.id !== listingId));
      toast.success(`Successfully delete ${title}`);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
    toast.success('Successfully logged out.');
  };

  return (
    <div>
      <h2>Hi, {name}</h2>
      <p>{email}</p>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
      {!loading && listings?.length > 0 && (
        <div>
          <h3>Your Listings:</h3>
          <div>
            {listings.map((listing) => (
              <ListingItem
                id={listing.id}
                key={listing.id}
                listing={listing.data}
                onDelete={() => onDelete(listing.id, listing.data.title)}
              />
            ))}
          </div>
        </div>
      )}
      <Link to="/create-listing">
        <p>Create a New Listing</p>
      </Link>
    </div>
  );
};

export default Profile;
