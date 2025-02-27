"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { object, string, number } from "yup";

interface FormValues {
    nationalId: string;
    fullName?: string;
    phone?: string;
    complaintField?: string;
    complaintReason?: string;
    complaintLocation?: string;
    complaintDuration?: string;
    accompanyingSymptoms?: string;
    takingMedication?: string;
    painSeverity?: number;
    dailyLifeImpact?: string;
    additionalInfo?: string;
}

export default function BookingForm() {
    const router = useRouter();
    const [showExtraFields, setShowExtraFields] = useState(false);
    const [patientNotFound, setPatientNotFound] = useState(false);
    const token = false; 
    const nationalIdRegex: RegExp = /^\d{14}$/;
    const phoneRegex = /^01[0-9]{9}$/;

    const validationSchema = object({
        nationalId: string()
        .required(" الرقم القومي مطلوب!")
        .matches(nationalIdRegex, "الرقم القومي يجب أن يكون 14 رقمًا صحيحًا."),
        ...(showExtraFields && {
        fullName: string().required(" الاسم بالكامل مطلوب!"),
        phone: string()
            .required(" رقم الهاتف مطلوب!")
            .matches(phoneRegex, " يجب إدخال رقم هاتف مصري صحيح"),
        complaintReason: string().required(" يرجى إدخال سبب الشكوى"),
        complaintLocation: string().required(" يرجى إدخال مكان الشكوى"),
        complaintDuration: string().required(" يرجى إدخال مدة الشكوى"),
        accompanyingSymptoms: string().required(" يرجى إدخال الأعراض المصاحبة"),
        takingMedication: string().required(" يرجى تحديد إن كان المريض يتناول أدوية"),
        painSeverity: number()
            .required(" يرجى تحديد شدة الألم")
            .min(1, "يجب أن يكون بين 1 و 10")
            .max(10, "يجب أن يكون بين 1 و 10"),
        }),
    });

    const formik = useFormik({
        initialValues: {
        nationalId: "",
        fullName: "",
        phone: "",
        complaintReason: "",
        complaintLocation: "",
        complaintDuration: "",
        accompanyingSymptoms: "",
        takingMedication: "",
        painSeverity: undefined,
        dailyLifeImpact: "",
        additionalInfo: "",
        },
        validationSchema,
        onSubmit: (values) => {
        const toastId = toast.loading("جارِ التحقق من البيانات...");
        setTimeout(() => {
            toast.dismiss(toastId);
            if (token) {
            toast.success("تم العثور على المريض، جاري التوجيه...");
            router.push(`/patients/${values.nationalId}`);
            } else {
            toast.error("المريض غير موجود، يرجى إدخال بياناته.");
            setShowExtraFields(true);
            setPatientNotFound(true);
            }
        }, 2000);
        },
    });

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-3/4 space-y-5">
            <h1 className="text-2xl text-center font-bold text-blue-600">شاشة الحجز للمريض</h1>
            {!showExtraFields ? (
            !patientNotFound && (
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="nationalId"
                    value={formik.values.nationalId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"
                    placeholder="أدخل الرقم القومي"
                />
                {formik.touched.nationalId && formik.errors.nationalId && (
                    <p className="text-red-500 text-sm">{formik.errors.nationalId}</p>
                )}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    تحقق من البيانات
                </button>
                </form>
            )
            ) : (
            <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-700">إدخال بيانات المريض</h3>
                <input type="text" name="nationalId" value={formik.values.nationalId} readOnly className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600" />
                <input type="text" name="fullName" value={formik.values.fullName} onChange={formik.handleChange} placeholder="الاسم بالكامل" className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600" />
                <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} placeholder="رقم الهاتف" className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"/>
                <input type="text" name="complaintReason" value={formik.values.complaintReason} onChange={formik.handleChange} placeholder="سبب الشكوى" className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"/>
                <input type="text" name="complaintLocation" value={formik.values.complaintLocation} onChange={formik.handleChange} placeholder="مكان الشكوى" className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"/>
                <input type="text" name="complaintDuration" value={formik.values.complaintDuration} onChange={formik.handleChange} placeholder="مدة الشكوى" className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"/>
                <input type="text" name="accompanyingSymptoms" value={formik.values.accompanyingSymptoms} onChange={formik.handleChange} placeholder="الأعراض المصاحبة" className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"/>
                <select name="takingMedication" value={formik.values.takingMedication} onChange={formik.handleChange} className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600">
                <option value="">هل يتناول المريض أدوية؟</option>
                <option value="نعم">نعم</option>
                <option value="لا">لا</option>
                </select>
                <input type="number" name="painSeverity" value={formik.values.painSeverity} onChange={formik.handleChange} placeholder="شدة الألم (1-10)" className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"/>
                <input type="text" name="dailyLifeImpact" value={formik.values.dailyLifeImpact} onChange={formik.handleChange} placeholder="كيف يؤثر المرض على حياتك اليومية؟ (اختياري)" className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"/>
                <textarea name="additionalInfo" value={formik.values.additionalInfo} onChange={formik.handleChange} placeholder="معلومات إضافية" className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"></textarea>
                <button type="button" className="w-full bg-green-500 text-white p-2 rounded" onClick={() => toast.success("تم حفظ البيانات!")}>
                حفظ البيانات
                </button>
            </div>
            )}
        </div>
        </div>
    );
}
