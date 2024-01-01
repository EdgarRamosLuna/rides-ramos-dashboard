// pages/api/schedules/[id].js
import executeQuery from "../../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query; // Acceder al 'id' a través de los parámetros de la ruta

  if (req.method === "PUT") {    
    try {
      const result = await executeQuery({
        query: "CALL DeleteDriver(?)",
        values: [id],
      });
      res
        .status(200)
        .json({ message: "Schedule updated successfully", result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Método no permitido
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
