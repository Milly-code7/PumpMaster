import { useParams } from "react-router-dom";

export default function PumpDetail() {
  const { id } = useParams();
  return <h1>Pump Detail Page - ID: {id}</h1>;
}
