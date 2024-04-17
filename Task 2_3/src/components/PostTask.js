import React, { useState } from "react";


function PostTask(props) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState({});
  const host = "http://localhost:3003";
  function isAllDigits(str) {
    return /^\d+$/.test(str);
  }


  const handleOnClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(isAllDigits(phone)){
      try {
        const res = await fetch(host + "/api/getheader", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phonenumber: phone }),
        });
    
        const resp = await res.json();
        setHeader(resp);
        props.showAlert("Headers Fetched Successfully", "success");
      } catch (error) {
        
      }
    }
   else{
    props.showAlert("Enter Digits Only", "danger");
    setHeader({})
    
   }
   

    setLoading(false);
    setPhone("");
  };
  return (
    <div className={`${Object.keys(header).length === 0?'vh-100':''}`}>
      {" "}
      <form className="my-3" onSubmit={handleOnClick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Enter Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={(e) => {
              e.preventDefault();
              setPhone(e.target.value);
            }}
            value={phone}
            minLength={5}
            required
          />
        </div>
<div className="w-100 d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-primary my-3 px-3 w-25 text-center "
          disabled={loading}
        >
          {loading ? "Posting" : "Post"}
        </button>
</div>
      </form>
      <div className="my-3">
        <table className="mb-5">
         {Object.keys(header).length !== 0 && <thead>
          <tr >
            <th>Type</th>
            <th>Key</th>
            <th>Value</th>
          </tr>
          </thead>}
          <tbody>
            
            {Object.entries(header).map(([key, value]) => {
              return (
                <tr key={key}>
                  <td>Header</td>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default PostTask;
