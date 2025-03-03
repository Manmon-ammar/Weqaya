"use client";

import { useState } from "react";

interface Patient {
    id: string;
    name: string;
    specialty: string;
    waitingTime: string;
}

const specialties = ["طب عام", "أمراض القلب", "جراحة العظام", "طب الأطفال"];

const mockPatients: Patient[] = [
    { id: "1", name: "محمد أحمد", specialty: "طب عام", waitingTime: "10 دقائق" },
    { id: "2", name: "علي محمود", specialty: "أمراض القلب", waitingTime: "15 دقائق" },
    { id: "3", name: "فاطمة خالد", specialty: "جراحة العظام", waitingTime: "20 دقائق" },
    { id: "4", name: "ليلى سعيد", specialty: "طب الأطفال", waitingTime: "5 دقائق" },
    { id: "5", name: "أحمد علي", specialty: "طب عام", waitingTime: "30 دقائق" },
];

export default function QueuesPage() {
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");

    const filteredPatients = selectedSpecialty
        ? mockPatients.filter((patient) => patient.specialty === selectedSpecialty)
        : mockPatients;

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-blue-600 mb-6">شاشة طوابير المرضى</h1>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">التخصص الطبي</label>
                    <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">كل التخصصات</option>
                        {specialties.map((specialty) => (
                            <option key={specialty} value={specialty}>
                                {specialty}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredPatients.map((patient) => (
                        <div key={patient.id} className="p-4 bg-blue-100 border border-gray-200 rounded-lg">
                            <h2 className="text-lg font-semibold">{patient.name}</h2>
                            <p className="text-sm text-gray-600">التخصص: {patient.specialty}</p>
                            <p className="text-sm text-gray-600">وقت الانتظار: {patient.waitingTime}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 