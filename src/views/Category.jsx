import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ListingItem } from '../components/ListingItem';

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const {categoryName} = params

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(
          collection(db, 'listings'),
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
        <h3>{categoryName.replace(categoryName[0], categoryName[0].toUpperCase())}</h3>
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
      <Link to="/" >         
          <p>Go Back</p>
          </Link> 
    </div>
  );
};

export default Category;
