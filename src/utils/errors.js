import { db, firebase } from "configuration/firebase";
import moment from "moment";

export const logError = async (errorAction, error, uid) => {
  try {
    const number = error?.number ? error.number : 0;
    const action = errorAction ? errorAction : "Unkown";
    const data = {
      action,
      number,
      name: error?.name || "none",
      message: error?.message || "none",
      lineNumber: error?.lineNumber ? error.lineNumber : 0,
      stack: error?.stack?.toString() || "none",
      description: typeof error == "object" ? JSON.stringify(error) : error.toString(),
      uid: uid ? uid : "none",
      origin: "web",
      timestamp: moment().unix(),
      date: moment().toDate(),
    };
    console.log(data);

    await db
      .collection("errors")
      .doc(action)
      .set({ ...data, ocurrence: firebase.firestore.FieldValue.increment(1) }, { merge: true });
  } catch (logError) {
    // we failed loggin the error. not much we can do :-(
    console.log(logError);
  }
};
