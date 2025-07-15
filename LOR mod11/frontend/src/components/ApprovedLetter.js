import { useState } from "react";

// approve a particular id
function ApprovedLetter({ state }) {
    const [id, setId] = useState("");
    const { contract } = state;

    // only allowedAccount can approve the recommendation because we do not wish to allow everyone to approve it
    const allowedAccount = "0xC451CA3D32C2406FFaBC7AC9Df3a07158F71d164";

    const handleApprove = async () => {
        try {
            const account = await state.signer.getAddress();
            console.log(account);
            if (account !== allowedAccount) {
                alert("you are not allowed to approve recommendation");
            }
            else {
                const [, , , approved] = await contract.getStudentDetails(id);
                if (approved) {
                    alert("ID already approved");
                }
                else {
                    await contract.approveRecommendation(id);
                    alert("Recommendation approved successfully");
                }
            }
        }
        catch (error) {
            console.error(error);
            alert("Error approving recommendation");
        }
    }

    return (
        <div>
            <input type="text" placeholder="Recommendation ID" value={id} onChange={(e) => setId(e.target.value)} />
            <button onClick={handleApprove}>Approve Recommendation</button>
        </div>
    )
}

export default ApprovedLetter;