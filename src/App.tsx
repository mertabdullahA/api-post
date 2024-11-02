import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<Post[]>([]); // API'den çekilen veriler burada tutulacak
  const [loading, setLoading] = useState<boolean>(true); // Yüklenme durumu için state

  // Verileri API'den çekmek için useEffect kullanıyoruz
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
        setData(response.data); // Veriyi state'e kaydet
        setLoading(false); // Yükleme durumunu false yap
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Veriyi silme fonksiyonu
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`); // API'den silme isteği
      setData(data.filter((item) => item.id !== id)); // Ekrandan da kaldır
      alert("Veri Silindi !");
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {data.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ccc", padding: "16px", width: "200px", }}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <button onClick={() => handleDelete(item.id)} style={{ background: "red", color: "white" }}>
            Sil
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
