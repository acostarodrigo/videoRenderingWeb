import { v4 as uuidv4 } from "uuid";

if (!(crypto && typeof crypto.randomUUID === "function")) {
  crypto.randomUUID = () => uuidv4();
}
