// create a form and store the student details

import { useState } from "react";
import { toBigInt } from "ethers";

function RequestLetter({ state }) {
    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [program, setProgram] = useState("");
    const [id, setId] = useState("");
    const { contract } = state;

    // same as asyn function handleRequest(){}
    const handleRequest = async () => {
        try {
            if (!contract) {
                alert("Smart contract not loaded");
                return;
            }
            const txnResp = await contract.requestRecommendation(name, university, program);
            await txnResp.wait();

            let cnt = await contract.studentCount();
            cnt = toBigInt(cnt) - 1n;
            setId(cnt.toString());
        }
        catch (error) {
            console.error(error);
            alert("Error requesting Recommendation");
        }
    }

    return (
        <div>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="University" value={university} onChange={(e) => setUniversity(e.target.value)} />
            <input type="text" placeholder="Program" value={program} onChange={(e) => setProgram(e.target.value)} />

            <button onClick={handleRequest}>Request Recommendation</button>

            {id !== "" && (<div> Recommendation id: {id}</div>)}
        </div>
    )
}

export default RequestLetter;