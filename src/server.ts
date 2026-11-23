import app from "./app";
import { initDB, port } from "./db";


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