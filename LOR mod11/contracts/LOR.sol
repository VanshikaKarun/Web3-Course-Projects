// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract LOR{
    struct Student{
        string name;
        string university;
        string program;
        bool approved;
        bool exists;
        // in Solidity, there is no built-in way to check if a key exists in a mapping because Mappings always return a default value for any key, even if it hasn’t been set.
    }

    mapping(uint256=>Student) public students;

    uint256 public studentCount;

    function requestRecommendation(string memory _name, string memory _university, string memory _program) public returns(uint256){
        uint256 id = studentCount++;
        students[id] = Student({
            name:_name,
            university:_university,
            program:_program,
            approved:false,
            exists:true
        });

        return id;
    }

    function approveRecommendation(uint256 _id) public {
        require(!students[_id].approved, "Recommendation already Approved");
        students[_id].approved=true;
    }

    function getStudentDetails(uint256 _id) public view returns(string memory, string memory, string memory, bool){
        require(students[_id].exists, "Student ID does not exist");
        return(
            students[_id].name,
            students[_id].university,
            students[_id].program,
            students[_id].approved
        );
    }
}