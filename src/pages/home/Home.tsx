import React, { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import ResponsiveAppBar from "../../components/header/Header";
import "./style.css";
import axios from "axios";

const url = "https://6763a6c017ec5852cae97bf8.mockapi.io/user";

interface Iuser {
   id?: string;
   avatar?: string;
   name: string;
   age: number | "";
}

const initialState: Iuser = {
   name: "",
   age: "",
};

const Home = () => {
   //    const { formData, handleChange, setFormData } = useChange<IBook>(initialState);

   const [data, setData] = useState<Iuser>(initialState);
   const [reload, setReload] = useState<boolean>(true);
   const [users, setUsers] = useState<[Iuser] | []>([]);

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      axios.post(`${url}`, data).then(() => setReload((p) => !p));

      setData(initialState);
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setData((p) => ({ ...p, [name]: value }));
   };

   const handleDelete = (id: string | undefined) => {
      axios.delete(`${url}/${id}`).then(() => setReload((p) => !p));
   };

   useEffect(() => {
      axios
         .get(`${url}`)
         .then((res) => {
            setUsers(res.data);
         })
         .catch();
   }, [reload]);

   return (
      <div>
         <ResponsiveAppBar />
         <div className='hero'>
            <form onSubmit={handleSubmit} action=''>
               <h1>Input data</h1>
               <div className='form'>
                  <input
                     required
                     className='input'
                     onChange={handleChange}
                     name='name'
                     value={data.name}
                     type='text'
                     placeholder='name'
                  />
                  <input
                     required
                     className='input'
                     onChange={handleChange}
                     name='age'
                     value={data.age}
                     type='number'
                     placeholder='age'
                  />
               </div>
               <div>
                  <button className='button'>Submit</button>
               </div>
            </form>
         </div>

         <div className='users'>
            {users?.map((user: Iuser) => (
               <div className='card' key={user.id}>
                  <div>
                     <img src={user.avatar} alt='' />
                  </div>
                  <h2>Name: {user.name}</h2>
                  <h3>Age: {user.age}</h3>
                  <button onClick={() => handleDelete(user.id)} className='delete'>
                     Delete
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};

export default React.memo(Home);
