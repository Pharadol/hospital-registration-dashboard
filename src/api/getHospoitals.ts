import axios from "axios";
import { Hospital } from "../model/Hospital";
async function getHospitals() {
  const { data } = await axios.get<Hospital[]>("https://test-api-py77dwlbxa-df.a.run.app/data");
  return data
}

export default getHospitals;