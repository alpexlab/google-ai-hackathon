import { BrainCard } from "@/components/analysis/brain_card";
import { BreastCard } from "@/components/analysis/breast_card";
import { GenomeCard } from "@/components/analysis/genome_card";
import { LungCard } from "@/components/analysis/lung_card";
import Patient_Profile from "@/components/analysis/patient_profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Analysis = () => {
  return (
    <div className="flex-1 p-8">
      {/* Breadcrumb and Edit Profile Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          <a href="#" className="text-blue-500">Patients list</a> &gt; Emily Johnson
        </div>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
          Edit Profile
        </button>
      </div>

      {/* Profile Details and Upload Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Patient Profile Card */}
        <Patient_Profile />
        <Tabs defaultValue="brain" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="brain">Brain</TabsTrigger>
            <TabsTrigger value="breast">Breast</TabsTrigger>
            <TabsTrigger value="lungs">Lungs</TabsTrigger>
            <TabsTrigger value="genome">Genome</TabsTrigger>
          </TabsList>
          <TabsContent value="brain"><BrainCard/></TabsContent>
          <TabsContent value="breast"><BreastCard/></TabsContent>
          <TabsContent value="lungs"><LungCard/></TabsContent>
          <TabsContent value="genome"><GenomeCard/></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Analysis;