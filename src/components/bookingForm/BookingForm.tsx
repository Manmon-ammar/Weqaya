"use client";
import { useState } from "react";
import CheckPatientForm from "../CheckPatientForm/CheckPatientForm";
import PatientDetailsForm from "../PatientDetailsForm/PatientDetailsForm";

export default function BookingForm() {
    const [showExtraFields, setShowExtraFields] = useState(false);
    const [nationalId, setNationalId] = useState("");

    const handlePatientNotFound = (nationalId : string) => {
        setNationalId(nationalId); 
        setShowExtraFields(true); 
    };
    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md md:w-3/4 space-y-5">
                <h1 className="text-2xl text-center font-bold text-blue-600">شاشة الحجز للمريض</h1>
                {!showExtraFields ? (
                    <CheckPatientForm onPatientNotFound={handlePatientNotFound} />
                ) : (
                    <PatientDetailsForm nationalId={nationalId} />
                )}
            </div>
        </div>
    );
}
