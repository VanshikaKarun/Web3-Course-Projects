import { useState } from "react";

function GetDetails({ state }) {
    const [id, setId] = useState("");
    const { contract } = state;
    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [program, setProgram] = useState("");
    const [approved, setApproved] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleGetDetails = async () => {
        try {
            const [name, university, program, approved] = await contract.getStudentDetails(id);
            setName(name);
            setUniversity(university);
            setProgram(program);
            setApproved(approved);
            setShowDetails(true);
        }
        catch (error) {
            console.error(error);
            alert("Error Fetching student details");
            setShowDetails(false);
        }
    }

    return (
        <div>
            <input type="text" placeholder="Student Id" value={id} onChange={(e) => setId(e.target.value)} />
            <button onClick={handleGetDetails}>Get Details</button>

            <div>
                {showDetails && (
                    <div>
                        <p>Name: {name}</p>
                        <p>University: {university}</p>
                        <p>Program: {program}</p>
                        <p>Approval Status: {approved ? "Yes":"No"}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GetDetails;