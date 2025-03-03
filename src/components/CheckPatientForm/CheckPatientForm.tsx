"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { object, string } from "yup";

interface CheckPatientFormProps {
    onPatientNotFound: (nationalId: string) => void;
}

export default function CheckPatientForm({ onPatientNotFound }: CheckPatientFormProps) {
    const router = useRouter();
    const token = false; // يمكن استبدالها بمنطق التحقق من وجود المريض

    const validationSchema = object().shape({
        nationalId: string()
            .required("الرقم القومي مطلوب!")
            .matches(/^\d{14}$/, "الرقم القومي يجب أن يكون 14 رقمًا صحيحًا."),
    });

    const formik = useFormik({
        initialValues: {
            nationalId: "",
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
                    onPatientNotFound(values.nationalId);
                }
            }, 2000);
        },
    });

    return (
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
    );
}
