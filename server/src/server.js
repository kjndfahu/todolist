import app from "./app.js";
import { connectDb } from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
