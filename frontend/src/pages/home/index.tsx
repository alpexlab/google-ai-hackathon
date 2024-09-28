import Navbar from "@/components/ui/navbar";
import { columns, PatientReport } from "./column";
import { DataTable } from "./data-table";
import Sidebar from "@/components/ui/sidebar";

async function getData(): Promise<PatientReport[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      risk_level: "High",
      email: "m@example.com",
      age: 12,
      cancer_type: "lungs",
      date_of_last_report: "12-2-2023",
      patient: "Robert Pan"
    },
    // ...
  ]
}

const Home = () => {
  const data: PatientReport[] = [{
    id: "728ed52f",
    risk_level: "High",
    email: "m@example.com",
    age: 12,
    cancer_type: "lungs",
    date_of_last_report: "12-2-2023",
    patient: "Robert Pa"
  },
  {
    id: "728ed52f",
    risk_level: "High",
    email: "m@example.com",
    age: 12,
    cancer_type: "lungs",
    date_of_last_report: "12-2-2023",
    patient: "Robert dd"
  }, {
    id: "728ed52f",
    risk_level: "High",
    email: "m@example.com",
    age: 12,
    cancer_type: "lungs",
    date_of_last_report: "12-2-2023",
    patient: "Robert Pfg"
  }, {
    id: "728ed52f",
    risk_level: "High",
    email: "m@example.com",
    age: 12,
    cancer_type: "lungs",
    date_of_last_report: "12-2-2023",
    patient: "Robert Pfss"
  }, {
    id: "728ed52f",
    risk_level: "High",
    email: "m@example.com",
    age: 12,
    cancer_type: "lungs",
    date_of_last_report: "12-2-2023",
    patient: "Robert gan"
  },
  ]


  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar /> {/* Sidebar component */}
        <div className="flex-1 container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default Home;

