"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { object, string, number } from "yup";

interface InputField {
    label: string;
    name: string;
    type?: string;
    formik: any; 
}

    const InputField = ({ label, name, type = "text", formik }: InputField) => (
    <div>
        <input
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={label}
        aria-invalid={formik.errors[name] && formik.touched[name] ? "true" : "false"}
        className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"
        />
        {formik.errors[name] && formik.touched[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
        )}
    </div>
    );

    export default function PatientDetailsForm({ nationalId }: { nationalId: string }) {
    const router = useRouter();

    const validationSchema = object().shape({
        fullName: string()
        .required("الاسم بالكامل مطلوب!")
        .min(3, "يجب ألا يقل الاسم عن ثلاثة أحرف")
        .max(20, "يجب ألا يزيد الاسم عن عشرين حرفًا"),
        phone: string()
        .required("رقم الهاتف مطلوب!")
        .matches(/^(20)?01[0125][0-9]{8}$/, "يجب إدخال رقم هاتف مصري صحيح"),
        complaintReason: string().required("يرجى إدخال سبب الشكوى"),
        complaintLocation: string().required("يرجى إدخال مكان الشكوى"),
        complaintDuration: string().required("يرجى إدخال مدة الشكوى"),
        accompanyingSymptoms: string().required("يرجى إدخال الأعراض المصاحبة"),
        takingMedication: string().required("يرجى تحديد إن كان المريض يتناول أدوية"),
        painSeverity: number()
        .required("يرجى تحديد شدة الألم")
        .min(1, "يجب أن يكون بين 1 و 10")
        .max(10, "يجب أن يكون بين 1 و 10"),
        dailyLifeImpact: string(),
        additionalInfo: string(),
    });

    const formik = useFormik({
        initialValues: {
        nationalId,
        fullName: "",
        phone: "",
        complaintReason: "",
        complaintLocation: "",
        complaintDuration: "",
        accompanyingSymptoms: "",
        takingMedication: "",
        painSeverity: "",
        dailyLifeImpact: "",
        additionalInfo: "",
        },
        validationSchema,
        onSubmit: (values) => {
        try {
            localStorage.setItem("patientData", JSON.stringify(values));
            const storedData = localStorage.getItem("patientData");

            if (storedData) {
            toast.success("تم حفظ البيانات بنجاح!");
            formik.resetForm();
            router.push(`/patients/${values.nationalId}`);
            } else {
            toast.error("⚠️ فشل حفظ البيانات، يرجى المحاولة مرة أخرى!");
            }
        } catch (error) {
            toast.error("❌ حدث خطأ أثناء حفظ البيانات!");
        }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
            type="text"
            name="nationalId"
            value={formik.values.nationalId}
            readOnly
            className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"
        />

        {[
            { label: "الاسم بالكامل", name: "fullName" },
            { label: "رقم الهاتف", name: "phone" },
            { label: "سبب الشكوى", name: "complaintReason" },
            { label: "مكان الشكوى", name: "complaintLocation" },
            { label: "مدة الشكوى", name: "complaintDuration" },
            { label: "الأعراض المصاحبة", name: "accompanyingSymptoms" },
        ].map((field) => (
            <InputField key={field.name} label={field.label} name={field.name} formik={formik} />
        ))}

        <select
            name="takingMedication"
            value={formik.values.takingMedication}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"
        >
            <option value="">هل يتناول المريض أدوية؟</option>
            <option value="نعم">نعم</option>
            <option value="لا">لا</option>
        </select>
        {formik.errors.takingMedication && formik.touched.takingMedication && (
            <p className="text-red-500 text-sm">{formik.errors.takingMedication}</p>
        )}

        <InputField label="شدة الألم (1-10)" name="painSeverity" type="number" formik={formik} />

        <textarea
            name="dailyLifeImpact"
            value={formik.values.dailyLifeImpact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="كيف تؤثر الشكوى على حياتك اليومية؟"
            className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"
        ></textarea>

        <textarea
            name="additionalInfo"
            value={formik.values.additionalInfo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="أي معلومات إضافية"
            className="w-full p-2 border rounded focus:outline-none border-2 border-gray-300 focus:border-blue-600"
        ></textarea>

        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
        حفظ البيانات
        </button>
        </form>
    );
}
