import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';
import { db } from '../firebase.config';

const initialFormState = {
  title: '',
  category: '',
  ac: false,
  parking: false,
  petFriendly: false,
  pool: false,
  kitchen: false,
  bathrooms: 1,
  bedrooms: 1,
  price: 0,
  location: '',
  lat: 0,
  lng: 0,
};

const CreateListing = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const {
    title,
    category,
    ac,
    parking,
    petFriendly,
    pool,
    bathrooms,
    bedrooms,
    kitchen,
    price,
    location,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...initialFormState, userRef: user.uid });
      } else {
        navigate('/signin');
      }
    });
    return unsub;
  }, [auth, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };
    try {
      const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
      setLoading(false);
      navigate(`/category/${formDataCopy.category}/${docRef.id}`);
      toast.success('Successfully created new listing!');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  const onMutate = (e) => {
    if (e.target.files) {
      setFormData((prevState) => ({ ...prevState, images: e.target.files }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    }
  };

  const onChangeCategory = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const onChangeBoolean = (e) => {
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: boolean,
    }));
  };

  if (loading) {
    return <BallTriangle height={70}
    width={70}
    color='#8ac8f4'
    ariaLabel='loading'/>;
  }
  return (
    <div>
      <header>
        <h2>Create a Listing</h2>
      </header>
      <main className="container">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={onMutate}
            placeholder="Title"
            minLength={3}
            required
          />
          <div>
            <label htmlFor="category">Category </label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={onChangeCategory}
              required
            >
              <option value="">--Listing category--</option>
              <option value="beach">Beach</option>
              <option value="city">City</option>
              <option value="luxury">Luxury</option>
              <option value="mountain">Mountain</option>
            </select>
          </div>
          <div>
            <label htmlFor="bathrooms">Bathrooms </label>
            <input
              className="numberInput"
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onMutate}
              min={0}
              max={50}
              required
            />
          </div>
          <div>
            <label htmlFor="bedrooms">Bedrooms </label>
            <input
              className="numberInput"
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onMutate}
              min={0}
              max={50}
              required
            />
          </div>

          <div>
            <div>
              <label htmlFor="ac">Air conditioner </label>
              <select
                className="booleanSelect"
                name="ac"
                id="ac"
                value={ac}
                onChange={onChangeBoolean}
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
              <label htmlFor="kitchen">Kitchen </label>
              <select
                className="booleanSelect"
                name="kitchen"
                id="kitchen"
                value={kitchen}
                onChange={onChangeBoolean}
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div>
              <label htmlFor="parking">Parking </label>
              <select
                className="booleanSelect"
                name="parking"
                id="parking"
                value={parking}
                onChange={onChangeBoolean}
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
              <label htmlFor="petFriendly">Pet friendly </label>
              <select
                className="booleanSelect"
                name="petFriendly"
                id="petFriendly"
                value={petFriendly}
                onChange={onChangeBoolean}
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div>
              <label htmlFor="pool">Pool </label>
              <select
                className="booleanSelect"
                name="pool"
                id="pool"
                value={pool}
                onChange={onChangeBoolean}
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="price">Price $</label>
            <input
              className="numberInput"
              type="number"
              id="price"
              value={price}
              onChange={onMutate}
              min={5}
              max={9000}
              required
            />
            <span> /night</span>
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={onMutate}
              minLength={3}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
