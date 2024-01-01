
import executeQuery from "../../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query; // Acceder al 'id' a través de los parámetros de la ruta

  console.log(id)
  if (req.method === "GET") {
    // Manejar solicitud GET para obtener un horario específico por su id
    try {
      const result = await executeQuery({
        query: "CALL GetAllDrivers(?)",
        values: [id],
      });
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: "Schedule not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "PUT") {
    const { fullName, phoneNumber, userName, password } = req.body;
    try {
      const result = await executeQuery({
        query: "CALL AddOrUpdateDriver(?, ?, ?, ?, ?)",
        values: [id, fullName, phoneNumber, userName, password],
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
