import { useState, useEffect } from 'react';
import ky from 'ky';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

const EditAnnonce = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [superficie, setSuperficie] = useState('');
    const [nombre_de_pieces, setNombre_de_pieces] = useState('');
    const [terrasse_jardin, setterrasse_jardin] = useState(null);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchAnnonce();
    }, []);

    const fetchAnnonce = async () => {
        const token = Cookies.get('token');
        try {
            const response = await ky.get(`http://localhost:3000/create-annonce/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).json();
            setTitle(response.title);
            setPrice(response.price);
            setDescription(response.description);
            setSuperficie(response.superficie);
            setNombre_de_pieces(response.nombre_de_pieces);
            setterrasse_jardin(response.terrasse_jardin);
            setImage(response.image_url);
            setPreviewImage(response.image_url);
        } catch (error) {
            console.error('There was an error fetching the annonce!', error);
        }
    };

    const handleEdit = async () => {
        const token = Cookies.get('token');

        const formData = new FormData();
        formData.append('annonce[title]', title);
        formData.append('annonce[price]', price);
        formData.append('annonce[description]', description);
        formData.append('annonce[superficie]', superficie);
        formData.append('annonce[nombre_de_pieces]', nombre_de_pieces);
        formData.append('annonce[terrasse_jardin]', terrasse_jardin);

        if (image && image !== previewImage) {
          formData.append('annonce[image]', image);
        }

        try {
            await ky.put(`http://localhost:3000/create-annonce/${id}`, {
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            window.location.href = "/"; 
        } catch (error) {
            console.error('There was an error saving the edited annonce!', error);
        }
    };

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
      }

    return (
        <div className='edit-form'>
            <h1> ÉDITER MON ANNONCE </h1>
            <div>
                <div>
                    <label> Image : </label>
                    <input type="file" onChange={handleImage} accept="image/*" />
                    {<img src={previewImage} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
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
                        <input type="radio" id="terrasse_jardin_oui" name="terrasse_jardin" value="oui" checked={terrasse_jardin === true} onChange={() => setterrasse_jardin(true)} />
                        <label htmlFor="terrasse_jardin_oui"> Oui </label>
                    </div>
                    <div>
                        <input
                            type="radio" id="terrasse_jardin_non" name="terrasse_jardin" value="non" checked={terrasse_jardin === false} onChange={() => setterrasse_jardin(false)} />
                        <label htmlFor="terrasse_jardin_non"> Non </label>
                    </div>
                </div>
                <button onClick={handleEdit}> ENREGISTRER </button>
            </div>
        </div>
    );
};

export default EditAnnonce;

