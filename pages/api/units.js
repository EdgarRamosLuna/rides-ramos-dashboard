import executeQuery from "../../lib/db";

export default async function handler(req, res) {
  // Manejar GET para obtener los horarios
  if (req.method === "GET") {
    try {
      const result = await executeQuery({
        query: "CALL GetAllUnits(?)",
        values: [0],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Manejar POST para crear un nuevo horario
  else if (req.method === "POST") {
    const { fullName, phoneNumber, userName, password } = req.body;
    try {
      const result = await executeQuery({
        query: "CALL AddOrUpdateUnit(?, ?, ?, ?, ?)",
        values: [0, fullName, phoneNumber, userName, password],
      });
      res
        .status(201)
        .json({ message: "Unit created successfully", result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Manejar otros métodos no soportados
  else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
