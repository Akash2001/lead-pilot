import { useState } from "react";
import AgentResults from "./AgentResults";
import ActivityFeed from "./ActivityFeed";

export default function App() {

  const [industry,setIndustry] = useState("");
  const [location,setLocation] = useState("");
  const [results,setResults] = useState(null);
  const [logs,setLogs] = useState([]);

  async function runAgent(){

    setLogs([
      "Searching companies...",
      "Ranking leads...",
      "Generating outreach..."
    ]);

    const res = await fetch("http://localhost:5000/run-agent",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({industry,location})
    });

    const data = await res.json();

    setResults(data);

    setLogs(prev => [...prev,"Emails generated"]);
  }

  return (
    <div style={{padding:"40px",fontFamily:"Arial"}}>

      <h1>LeadPilot AI</h1>
      <p>Autonomous AI Sales Agent</p>

      <div style={{marginBottom:"20px"}}>

        <input
          placeholder="Industry"
          value={industry}
          onChange={e=>setIndustry(e.target.value)}
        />

        <input
          placeholder="Location"
          value={location}
          onChange={e=>setLocation(e.target.value)}
        />

        <button onClick={runAgent}>
          Run Agent
        </button>

      </div>

      <ActivityFeed logs={logs}/>

      <AgentResults results={results}/>

    </div>
  );
}