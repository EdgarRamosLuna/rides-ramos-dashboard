import executeQuery from "../../lib/db";

export default async function handler(req, res) {
  // Manejar GET para obtener los horarios
  if (req.method === "GET") {
    try {
      const result = await executeQuery({
        query: "CALL GetSchedules()",
        values: [],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Manejar POST para crear un nuevo horario
  else if (req.method === "POST") {
    const { description, startTime, endTime } = req.body;
    try {
      const result = await executeQuery({
        query: "CALL AddOrUpdateSchedule(?, ?, ?, ?)",
        values: [0, description, startTime, endTime],
      });
      res
        .status(201)
        .json({ message: "Schedule created successfully", result });
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
