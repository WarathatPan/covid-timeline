
import { useQuery } from '@apollo/client';
import {useState} from 'react';

export default function Home() {
  const [query, setQuery] = useState({
      gender: "",
      age: "",
      occupation: "",
      from: "",
      to: "",
      detail: "",
      location_type: "",
      location_name: "",
  });

  const handleSubmit = (e) => {
   console.log('query==> ', query);
  }

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
        ...prevState,
        [name]: value
    }));
};


  // if all good return data
  return (
    <div className="container mx-auto p-3 sm:p-5">
      <h1 className="text-center text-3xl font-bold my-5">COVID Timeline Generator</h1>

      <form onSubmit={handleSubmit}>
        {/* Start Patient Information */}
        <h3 className="text-xl font-bold mb-2">Patient Information</h3>
        <div className="flex flex-col md:flex-row border-solid border-2">
          <div className="md:w-1/3 lg:w-2/6 p-4">
            <p className="mb-2">Gender</p>
            <select className="w-full" name="gender" value={query.gender} onChange={handleChange()}>
              <option disabled>--- Select Option ---</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="md:w-1/3 lg:w-1/6 p-4">
            <p className="mb-2">Age</p>
            <input type="number" className="w-full" name="age" placeholder="Age" value={query.age} onChange={handleChange()}/>
          </div>
          <div className="md:w-1/3 lg:w-3/6 p-4">
            <p className="mb-2">Occupation</p>
            <input type="text" className="w-full" name="occupation" placeholder="Occupation" value={query.occupation} onChange={handleChange()}/>
          </div>
        </div>
        {/* End Patient Information */}

        {/* Start Timeline */}
        <h3 className="text-xl font-bold mb-2 mt-4">Timeline</h3>
        <div className="flex flex-col md:flex-row md:gap-7">
          <div className="md:w-1/2 lg:w-7/12 p-4 border-solid border-2">
          </div>
          {/* Start From Timeline */}
          <div className="md:w-1/2 lg:w-5/12 p-4 border-solid border-2">
              <div className="flex flex-row flex-wrap">
                <div className="w-2/3 px-4 py-2">
                  <p className="mb-2">From</p>
                  <input type="datetime-local" className="w-full" name="from" value={query.from} onChange={handleChange()}/>
                </div>
                <div className="w-1/3 px-4 py-2">
                  <p className="mb-2">To</p>
                  <input type="time" className="w-full" name="to" value={query.to} onChange={handleChange()}/>
                </div>
                <div className="w-full px-4 py-2">
                  <p className="mb-2">Detail</p>
                  <textarea className="w-full" name="detail" value={query.detail} onChange={handleChange()}/>
                </div>
                <div className="w-1/3 px-4 py-2">
                  <p className="mb-2">Location Type</p>
                  <select className="w-full" name="location_type" value={query.location_type} onChange={handleChange()}>
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                  </select>
                </div>
                <div className="w-2/3 px-4 py-2">
                  <p className="mb-2">Location Name</p>
                  <input type="text" className="w-full" name="location_name" value={query.location_name} onChange={handleChange()}/>
                </div>
                <button type="submit" className="w-full text-center bg-amber-400 m-4 p-2">+ Add Entry</button>
              </div>
          </div>
          {/* End From Timeline */}
        </div>
        {/* End Timeline */}
      </form>
    </div>
  );
}