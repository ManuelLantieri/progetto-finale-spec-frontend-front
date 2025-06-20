import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h1 className="text-center">Dettagli del Telefono</h1>
      <p className="text-center">
        Stiamo caricando le informazioni per il modello ID: {id}
      </p>
    </div>
  );
};

export default DetailPage;
