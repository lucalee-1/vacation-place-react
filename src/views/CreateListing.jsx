import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
  name: '',
  category: '',
  ac: '',
  parking: '',
  petFriendly: '',
  pool: '',
  kitchen: '',
  bathrooms: 1,
  bedrooms: 1,
  regularPrice: 0,
  address: '',
  lat: 0,
  lng: 0,
  images: [],
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
    regularPrice,
    address,
    images,
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    console.log(e.target.value);
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
    return <h3>Loading...</h3>;
  }
  return (
    <div>
      <header>
        <h2>Create a Listing</h2>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
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
              <option value="Beach">Beach</option>
              <option value="City">City</option>
              <option value="Luxury">Luxury</option>
              <option value="Mountain">Mountain</option>
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
                <option>--Select--</option>
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
                <option>--Select--</option>
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
                <option>--Select--</option>
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
                <option>--Select--</option>
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
                <option>--Select--</option>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="regularPrice">Price $</label>
            <input
              className="numberInput"
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onMutate}
              min={5}
              max={9000}
              required
            />
            <span> /night</span>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input    
              type="number"
              id="address"
              value={address}
              onChange={onMutate}
              minLength={3}
              required
            />
          </div>
          <div>
            <label htmlFor="images">Images </label>
            <input
              type="file"
              id="images"
              max="6"
              accept=".jpg, .png, .jpeg"
              multiple
              value={images}
              onChange={onMutate}
            />
          </div>          
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
