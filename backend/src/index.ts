import express from 'express';
import cors from 'cors';
import countryRoutes from './routes/countryRoutes'; // adjust path if needed

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Mount the routes at /api
app.use('/api', countryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});