import { admin } from '../../config/firebaseAdmin'
import { getTokens } from '../../servicos/firestore';

export default async function handler(req, res) {
  const { title, content } = req.body;
  console.log(title, content);

  const tokens = await getTokens();

  try {
    const message = {
      notification: {
        title,
        body: content,
      },
      tokens,
    };

    await admin.messaging().sendEachForMulticast(message);
    res.status(200).json({ message: 'sucesso' });
    console.log('foi enviado');
  } catch (error) {
    res.status(400).json({ message: 'falhou' });
  }
}
