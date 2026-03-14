export default function AgentResults({results}){

  if(!results) return null;

  return (

    <div style={{marginTop:"30px"}}>

      <h2>{results.leadsFound} Leads Found</h2>

      {results.map((lead,i)=>(

        <div
          key={i}
          style={{
            border:"1px solid #ddd",
            padding:"15px",
            marginTop:"10px",
            borderRadius:"6px"
          }}
        >

          <h3>{lead.name}</h3>

          <p>Location: {lead.location}</p>

          {/* <pre>{lead.email}</pre> */}

        </div>

      ))}

    </div>
  );
}