import { useState } from 'react';
import ky from 'ky';
import Cookies from 'js-cookie';

const UserCreatAnnonce = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [nombre_de_pieces, setNombre_de_pieces] = useState('');
  const [terasse_jardin, setTerasse_jardin] = useState(null);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get('token'); 

    try {
      const response = await ky.post('http://localhost:3000/cree-annonces', {
        json: {
          annonce: {
            title,
            price,
            description,
            superficie,
            nombre_de_pieces,
            terasse_jardin,
            image
          }
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }).json();

      console.log(response);

      window.location.href = "/";
    } catch (error) {
      console.error('There was an error creating the annonce!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='create-form'>
      <h1> CRÉER UNE ANNONCE </h1>
      <div>
        <label> Image : </label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
      </div>
      <div>
        <label> Titre : </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label> Prix : </label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <label> € </label>
      </div>
      <div>
        <label> Description : </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label> Superficie : </label>
        <input type="number" value={superficie} onChange={(e) => setSuperficie(e.target.value)} />
        <label> m2 </label>
      </div>
      <div>
        <label> Nombre de pièces : </label>
        <input type="number" value={nombre_de_pieces} onChange={(e) => setNombre_de_pieces(e.target.value)} />
      </div>
      <div className='checkbox'>
        <label> Terrasse/Jardin : </label>
        <div>
          <input
            type="radio" id="terasse_jardin_oui" name="terasse_jardin" value={true} checked={terasse_jardin === true} onChange={() => setTerasse_jardin(true)} />
          <label htmlFor="terasse_jardin_oui"> Oui </label>
          <input
            type="radio" id="terasse_jardin_non" name="terasse_jardin" value={false} checked={terasse_jardin === false} onChange={() => setTerasse_jardin(false)} />
            <label htmlFor="terasse_jardin_non"> Non </label>
        </div>
      </div>
      <button type="submit"> CRÉER </button>
    </form>
  );
};

export default UserCreatAnnonce;

