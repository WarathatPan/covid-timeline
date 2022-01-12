
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import CardTimeline from '../components/CardTimeline';
import moment from 'moment';

// interface Icovid {
//   gender: string,
//   age: float,
//   occupation: string,
//   time_from: string,
//   time_to: string,
//   detail: string,
//   location_type: string,
//   location_name: string,
// }

const GET_COVID = gql`
  query covid {
    covid(_id: "61dbd34a462414a67d1bbc74") {
      _id
      gender
      age
      occupation
      timelines {
        date
        information {
          time_from
          time_to
          detail
          location_type
          location_name
        }
      }
      visited
    }
  }
`;

const CREATE_COVID = gql`
  mutation createCovid ($gender: String!, $age: Float!, $occupation: String!, $timelines: [TimelinesInput!]!, $visited: [String!]!) {
    createCovid( payload: {
      gender: $gender,
      age: $age,
      occupation: $occupation,
      timelines: $timelines,
      visited: $visited
    }) {
      _id
      gender
      age
      occupation
      timelines {
        date
        information {
          time_from
          time_to
          detail
          location_type
          location_name
        }
      }
      visited
    }
  }
`;

const UPDATE_COVID = gql`
  mutation updateCovid ($_id: String!, $gender: String!, $age: Float!, $occupation: String!, $timelines: [TimelinesInput!]!, $visited: [String!]!) {
    updateCovid(payload: {
      _id: $_id,
      gender: $gender,
      age: $age,
      occupation: $occupation,
      timelines: $timelines,
      visited: $visited
    }) {
      _id
      gender
      age
      occupation
      timelines {
        date
        information {
          time_from
          time_to
          detail
          location_type
          location_name
        }
      }
      visited
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_COVID);
  const [createCovid] = useMutation(CREATE_COVID);
  const [updateCovid] = useMutation(UPDATE_COVID);
  const [isRequired, setIsRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(loading);
  const [covid, setCovid] = useState({
      gender: '',
      age: 0,
      occupation: '',
      time_from: '',
      time_to: '',
      detail: '',
      location_type: '',
      location_name: '',
  });
  
  const dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }
  
  const handleSubmit = (e) => {
    // e.preventDefault();
    const datetime = moment(new Date(covid?.time_from)).format('DD/MM/YYYY HH:mm').split(" ");
    const date = datetime[0];
    const time_from = datetime[1];
    const time_to = covid?.time_to;
    const information: any = {
      time_from: time_from,
      time_to: covid?.time_to,
      detail: covid?.detail,
      location_type: covid?.location_type,
      location_name: covid?.location_name,
    };
    let timelines: any = [];
    let visited: any = [];
    if (data?.covid) {
      const d = JSON.parse(JSON.stringify(data.covid)) || '';
      timelines = JSON.parse(JSON.stringify(d?.timelines)) || [];
      let check_dup = false;
      for (let i = 0; i < d?.timelines.length; i++) {
        const element = d?.timelines[i];
        // console.log('element==>', element);
        if (element.date == date) {
          let check_overlap = false;
          let check_push = false;
          for (let j = 0; j < element.information.length; j++) {
            const element2 = element.information[j];
              if (check_overlap) {
                break;
              }
              if (element2.time_from < time_to && element2.time_to > time_from) {
                  if (timelines[i]['information'].at(-1) == information) {
                  check_overlap = true;
                  timelines[i].information.pop();
                }
                alert('Each timeline entry must not collapsed with other entry.');
                break;
              } else {
                if (timelines[i]['information'].at(-1) != information && !check_push && !check_overlap) {
                  check_push = true;
                  check_dup = true;
                  timelines[i].information = [...timelines[i].information, information];
                }
              }
            delete timelines[i]['information'][j]['__typename'];
          }
        } else if (!check_dup) {
          check_dup = true;
          timelines = [...timelines, {
            "date": date,
            "information": [information]
          }];
        }
        for (let j = 0; j < element.information.length; j++) {
          delete timelines[i]['information'][j]['__typename'];
        }
        delete timelines[i]['__typename'];
        timelines[i]['information'].sort(dynamicSort("time_from"));
      }
      timelines.sort(dynamicSort("date"));
      
      visited = d?.visited;
      if (covid?.location_name !== '') {
        visited = [...visited, covid?.location_name];
        visited = visited.sort();
      }
    } else {
      timelines = [{
        "date": date,
        "information": [information]
      }];
      if (covid?.location_name !== '') {
        visited = [covid?.location_name];
      }
    }

    console.log('timelines==>', timelines);
    let payload: any = {
      gender: covid.gender || data?.covid?.gender,
      age: parseFloat(covid.age.toString()) || data?.covid?.age,
      occupation: covid.occupation || data?.covid?.occupation,
      timelines: timelines,
      visited: visited,
    };

    console.log('data==>', data?.covid?._id);

    if (data?.covid) {
      payload._id = data?.covid?._id;
      updateCovid({
        variables: payload
      });
    } else {
      createCovid({
        variables: payload
      });
    }
  }

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCovid((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDelete = (t_index, informatino_index)  => {
    let timelines: any = JSON.parse(JSON.stringify(data?.covid?.timelines));
    let visited: any = [];

    timelines[t_index]['information'].splice(informatino_index, 1);
    
    if (timelines[t_index]['information'].length == 0) {
      timelines.splice(t_index, 1);
    }

    for (let i = 0; i < timelines.length; i++) {
      const element = timelines[i];
      for (let j = 0; j < element.information.length; j++) {
        delete timelines[i]['information'][j]['__typename'];

        if (element?.information[j]?.location_name != '') {
          visited = [...visited, element?.information[j]?.location_name];
        }
      }
      delete timelines[i]['__typename'];
    }
    visited = visited.sort();

    let payload: any = {
      _id: data?.covid?._id,
      gender: data?.covid?.gender,
      age: data?.covid?.age,
      occupation: data?.covid?.occupation,
      timelines: timelines,
      visited: visited,
    };

    updateCovid({
      variables: payload
    });

    window.location.reload();
  };
  
  useEffect(() => {
    setIsLoading(loading);
    if (covid.age === 0) {
      setCovid((prevState: any) => ({
        ...prevState,
        ['age']: ''
      }));
    }

    if (covid.location_type == 'Indoor' || covid.location_type == 'Outdoor') {
      setIsRequired(true);
    } else {
      setIsRequired(false);
    }
  });

  // if (error) return <p>ERROR</p>;

  // if all good return data
  return (
    <div className='container mx-auto p-3 sm:p-5'>
      <h1 className='text-center text-3xl font-bold my-5 fs-yellow'>COVID Timeline Generator</h1>

      <form onSubmit={handleSubmit}>
        {/* Start Patient Information */}
        <h3 className='text-xl font-bold fs-yellow mb-2'>Patient Information</h3>
        <div className='flex flex-col md:flex-row border-solid border-2'>
          <div className='md:w-1/3 lg:w-2/6 p-4'>
            <p className='mb-2'>Gender</p>
            <select className='w-full text-black' name='gender' value={covid.gender} onChange={handleChange()}>
              <option disabled value=''>-- Select Gender --</option>
              <option value='Female'>Female</option>
              <option value='Male'>Male</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='md:w-1/3 lg:w-1/6 p-4'>
            <p className='mb-2'>Age</p>
            <input type='number' className='w-full text-black' name='age' placeholder='Age' value={covid.age} onChange={handleChange()}/>
          </div>
          <div className='md:w-1/3 lg:w-3/6 p-4'>
            <p className='mb-2'>Occupation</p>
            <input type='text' className='w-full text-black' name='occupation' placeholder='Occupation' value={covid.occupation} onChange={handleChange()}/>
          </div>
        </div>
        {/* End Patient Information */}
        {/* Start Timeline */}
        <h3 className='text-xl font-bold mb-2 mt-4 fs-yellow'>Timeline</h3>
        <div className='flex flex-col lg:flex-row md:gap-7'>
          {/* Start Content Timeline */}
          <div className='w-full lg:w-7/12 p-4 border-solid border-2'>
          {
            isLoading ? <p>Loading...</p> :
              data ? <div>
                <div className='text-center w-1/3 rounded-full fs-bg-color font-bold bg-yellow p-2 mx-auto my-5'>
                  <p>{data?.covid?.gender}</p>
                  <h3 className='text-xl'>{data?.covid?.age} years old</h3>
                  <p>{data?.covid?.occupation}</p>
                </div>
                <div className='flex flex-col'>
                  <CardTimeline timelines={data?.covid?.timelines} handleDelete={handleDelete}/>
                </div>
                <div className='w-full mt-5'>
                  <h3 className='text-xl fs-yellow'>Visited Places</h3>
                  <div className='flex flex-row flex-wrap'>
                    {data?.covid?.visited.map((v: any, i: any) => (
                      <span className='text-base w-1/4' key={'visited_'+i}>
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div> : <p>No Data!</p>
          }
          </div>
          {/* End Content Timeline */}
          {/* Start From Timeline */}
          <div className='w-full lg:w-5/12 p-4 border-solid border-2 h-max'>
              <div className='flex flex-row flex-wrap'>
                <div className='w-2/3 px-4 py-2'>
                  <p className='mb-2'>From</p>
                  <input type='datetime-local' className='w-full text-black' name='time_from' value={covid.time_from} onChange={handleChange()}/>
                </div>
                <div className='w-1/3 px-4 py-2'>
                  <p className='mb-2'>To</p>
                  <input type='time' className='w-full text-black' name='time_to' value={covid.time_to} onChange={handleChange()}/>
                </div>
                <div className='w-full px-4 py-2'>
                  <p className='mb-2'>Detail</p>
                  <textarea className='w-full text-black' name='detail' value={covid.detail} onChange={handleChange()}/>
                </div>
                <div className='w-1/3 px-4 py-2'>
                  <p className='mb-2'>Location Type</p>
                  <select className='w-full text-black' name='location_type' value={covid.location_type} onChange={handleChange()}>
                    <option disabled value=''>-- Select Location Type --</option>
                    <option value='Indoor'>Indoor</option>
                    <option value='Outdoor'>Outdoor</option>
                    <option value='Home'>Home</option>
                    <option value='Travelling'>Travelling</option>
                  </select>
                </div>
                <div className='w-2/3 px-4 py-2'>
                  <p className='mb-2'>Location Name</p>
                  <input type='text' className='w-full text-black' name='location_name' value={covid.location_name} onChange={handleChange()} required={isRequired}/>
                </div>
                <button type='submit' className='w-full text-center fs-bg-color bg-yellow m-4 p-2'>+ Add Entry</button>
              </div>
          </div>
          {/* End From Timeline */}
        </div>
        {/* End Timeline */}
      </form>
    </div>
  );
}