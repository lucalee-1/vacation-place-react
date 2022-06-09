import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ListingItem } from '../components/ListingItem';

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');

        const q = query(
          listingsRef,
          where('category', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
        const qSnap = await getDocs(q);
        let listingsUpdate = [];

        qSnap.forEach((doc) => {
          return listingsUpdate.push({ id: doc.id, data: doc.data() });
        });
        setListings(listingsUpdate);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, [params.categoryName]);

  return (
    <div>
      <header>
        <p>{params.categoryName}</p>
      </header>
      {loading ? (
        <h3>Loading...</h3>
      ) : listings && listings.length > 0 ? (
        <main>
          <div>
            {listings.map((listing) => (
              <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
            ))}
          </div>
        </main>
      ) : (
        'No listings yet'
      )}
    </div>
  );
};

export default Category;
