export default function ActivityFeed({logs}){

  if(!logs.length) return null;

  return (

    <div style={{marginTop:"20px"}}>

      <h3>Agent Activity</h3>

      {logs.map((log,i)=>(
        <div key={i}>
          {log}
        </div>
      ))}

    </div>
  );
}