import React from 'react';

const ParticipantsList = ({ participants }) => {
    return (
        <div className="p-4 pt-8 mt-4 bg-white rounded-md shadow-md overflow-auto" style={{ maxHeight: 'calc(100vh - 7rem)' }}>
            <h2 className="text-xl font-bold mb-4">Participants</h2>
            <div className="flex flex-col space-y-2  ">
                {participants.map((participant, index) => (
                    <div key={index} className="flex items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm ">
                        <span className="text-sm font-medium text-gray-500 mr-2">{index + 1}.</span>
                        <p className="text-sm font-medium text-gray-800">{participant.fullName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParticipantsList;


