import React, { useState } from 'react';
import { addNotification } from '../servicos/firestore';

function Home() {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    content: '',
  });

  const sendNotification = async () => {
    try {
      const result = await fetch('/api/apiblix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modalData),
      });

      console.log(modalData,' modal data')

      if (result.status === 200) {
        console.log(result)
        addNotification(modalData)
        console.log('Notificação enviada com sucesso!');
      } else {
        console.error('Erro ao enviar notificação.');
      }
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const openModal = () => {
    if (email === 'admin@admin.com') {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTitleChange = (e) => {
    setModalData({
      ...modalData,
      title: e.target.value,
    });
  };

  const handleMessageChange = (e) => {
    setModalData({
      ...modalData,
      content: e.target.value,
    });
  };

  return (
    <div className="container">
      <input
        type="email"
        placeholder="Digite o seu email"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={openModal}>Acessar</button>

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor da sombra de fundo
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999, // Para colocar o modal sobre todos os outros elementos
          }}
        >
          <div className="modal-content" style={{
            backgroundColor: 'white',
            width: '300px',
            height: '300px',
          }}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2 style={{textAlign:'center'}}>Painel Administrador</h2>
            <div className="modal-form" style={{
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'center'
            }}>
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                value={modalData.title}
                onChange={handleTitleChange}
              />
              <label htmlFor="message">Mensagem:</label>
              <textarea
                id="message"
                value={modalData.content}
                onChange={handleMessageChange}
              />
              <button onClick={sendNotification}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
