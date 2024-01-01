import Travels from "@/components/travels/Travels";
import TabComponent from "@/components/ui/TabComponent";

export default function Home() {
  const tabsData = [
    {
      label: "Viajes activos",
      content: <Travels/>,
    },
    {
      label: "Viajes completados",
      content: <Travels/>,
    },
  ];
  return (
    <div>      
      <TabComponent tabs={tabsData}/>
    
    </div>
  );
}
