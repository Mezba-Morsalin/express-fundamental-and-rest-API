import { initDB, port } from "./db";
import app from "./server";

const main = async () => {
  try {
    await  initDB()
 app.listen(port, () => {
    console.log(`Express Server is running on the ${port}`);
})
  } catch (error) {
    console.log(error);
  }
}

main()