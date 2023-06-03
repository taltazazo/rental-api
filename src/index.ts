import app from "./app";
import * as db from "./database";

const PORT = process.env.PORT || 8082;
db.connect()
  .then(() => {
    console.log("Db connected");
    app.listen(PORT, async () => {
      console.log(`Server is running http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`Db Error: ${e.message}`);
  });
