"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading"; 
interface PatientData {
    nationalId: string;
    fullName: string;
    phone: string;
    complaintReason: string;
    complaintLocation: string;
    complaintDuration: string;
    accompanyingSymptoms: string;
    takingMedication: string;
    painSeverity: number;
    dailyLifeImpact: string;
    additionalInfo: string;
}

export default function PatientPage() {
    const params = useParams();
    const router = useRouter();
    const patientId = params.id;

    const [patientData, setPatientData] = useState<PatientData | null>(null);

    useEffect(() => {
        // جلب بيانات المريض من localStorage
        const storedData = localStorage.getItem("patientData");
        if (storedData) {
            const data = JSON.parse(storedData);
            if (data.nationalId === patientId) {
                setPatientData(data);
            }
        }
    }, [patientId]);

    const handleGoBackToBooking = () => {
        router.push("/booking");
    };

    const handleEditPatient = () => {
        router.push(`/patients/${patientId}/edit`);
    };

    const handleBookAppointment = () => {
        router.push(`/patients/${patientId}/book-appointment`);
    };

    if (!patientData) {
        return <div className="p-4 flex justify-center items-center min-h-screen">
            <Loading/>
        </div>;
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-blue-600 mb-6">بيانات المريض</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">الرقم القومي</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.nationalId}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">الاسم بالكامل</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.fullName}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.phone}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">سبب الشكوى</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.complaintReason}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">مكان الشكوى</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.complaintLocation}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">مدة الشكوى</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.complaintDuration}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">الأعراض المصاحبة</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.accompanyingSymptoms}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">هل يتناول المريض أدوية؟</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.takingMedication}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">شدة الألم (من 1 إلى 10)</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.painSeverity}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">كيف يؤثر المرض على حياتك اليومية؟</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.dailyLifeImpact}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">معلومات إضافية</label>
                        <p className="mt-1 p-2 bg-gray-50 rounded">{patientData.additionalInfo}</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-between gap-5">
                    <button
                        onClick={handleEditPatient}
                        className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                        تعديل البيانات
                    </button>
                    <button
                        onClick={handleBookAppointment}
                        className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        حجز موعد
                    </button>
                </div>

                <button
                    onClick={handleGoBackToBooking}
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    العودة إلى صفحة الحجز
                </button>
            </div>
        </div>
    );
}