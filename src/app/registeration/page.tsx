"use client";

import { useFormik } from "formik";
import { number, object, string, array, boolean } from "yup";
import { useState } from "react";

export default function Register() {
    const [step, setStep] = useState(0);
    const [role, setRole] = useState("");

    const validationSchema = object().shape({
        role: string().required("يجب اختيار نوع الحساب"),
        fullName: string().min(3,"يجب الا يقل عن 3 حروف").max(20, "يجب الا يزيد عن 20 حرف").required("الاسم مطلوب"),
        phone: string().required("رقم الهاتف مطلوب").matches(/^(20)?01[0125][0-9]{8}$/, "يجب إدخال رقم هاتف مصري صحيح"),
        password: string().required("كلمة المرور مطلوبة").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ , "يجب الا يقل عن 8 احرف و يجب ان يحتوى على حرف كبير على الاقل و حرف صغير على الاقل و رقم و حرف خاص"),
    
        age: number().min(23 ,"يجب الا يقل السن عن 23 عام").required("العمر مطلوب"),
        address: string().required("العنوان مطلوب"),
        nationalID: string().required("الرقم القومي مطلوب").matches(/^\d{14}$/, "الرقم القومي يجب أن يكون 14 رقمًا"),
        gender: string().required("يجب اختيار النوع"),
        experienceYears: number().min(0, "عدد سنوات الخبرة يجب أن يكون رقم موجب"),
        profileDescription: string().required("يجب إدخال وصف الملف الشخصي"),
        cvFile: string().required("ملف السيرة الذاتية مطلوب"),
        profileImage: string().required("الصورة الشخصية مطلوبة"),
    
        // Doctor-specific fields
        university: string().nullable(),
        specialization: string().nullable(),
        certificates: array().of(object({
            name: string().required("اسم الشهادة مطلوب"),
            provider: string().required("الجهة المانحة مطلوبة"),
            issueDate: string().required("تاريخ الإصدار مطلوب"),
        })),
        currentWorkplace: string().nullable(),
        workplaceAddress: string().nullable(),
        licenseNumber: string().nullable().matches(/^\d{5,7}$/, "رقم الترخيص يجب أن يكون بين 5 و 7 أرقام صحيحة"),
        licenseIssuer: string().nullable(),
        isMedicalSyndicateMember: boolean(),
        syndicateNumber: string().nullable(),
        medicalSpecialties: array().of(string()),
        supportingDocuments: array().of(string()),
        workEmail: string().email("البريد الإلكتروني غير صالح").nullable(),
        workingHours: string().nullable(),
        contactMethods: array().of(string()),
    });
    
    const formik = useFormik({
        initialValues: {
        role: "",
        fullName: "",
        phone: "",
        password: "",
        age: "",
        address: "",
        nationalID: "",
        gender: "",
        experienceYears: "",
        profileDescription: "",
        cvFile: "",
        profileImage: "",
        university: "",
        specialization: "",
        certificates: [],
        currentWorkplace: "",
        workplaceAddress: "",
        licenseNumber: "",
        licenseIssuer: "",
        isMedicalSyndicateMember: false,
        syndicateNumber: "",
        medicalSpecialties: [],
        supportingDocuments: [],
        workEmail: "",
        workingHours: "",
        contactMethods: [],
        },
        validationSchema,
        onSubmit: (values) => {
        console.log("بيانات المستخدم:", values);
        },
    });

    return <>
        <div className="min-h-screen flex justify-center items-center bg-gray-50 py-4">
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md grow">
        <h2 className="text-2xl font-semibold text-center mb-4">تسجيل حساب جديد</h2>

        {/* الخطوة 1: اختيار نوع الحساب */}
        {step === 0 && (
            <div>
            <label className="block mb-2 text-sm font-medium">اختر نوع الحساب</label>
            <select
                name="role"
                value={formik.values.role}
                onChange={(e) => {
                setRole(e.target.value);
                formik.handleChange(e);
                }}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
            >
                <option value="">اختر</option>
                <option value="employee">موظف</option>
                <option value="doctor">طبيب</option>
            </select>
            {formik.errors.role && <p className="text-red-500 m-1">{formik.errors.role}</p>}

            <button 
                onClick={() => {
                    if (!formik.values.role) {
                        formik.setFieldError("role", "يجب اختيار نوع الحساب");
                    } else {
                        setStep(1);
                    }
                }} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                التالي
            </button>
            </div>
        )}

        {/* الخطوة 2: المعلومات الشخصية */}
        {step === 1 && (
            <div className="space-y-4">
            <div>
            <input
                type="text"
                placeholder="الاسم الكامل"
                {...formik.getFieldProps("fullName")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.fullName && formik.errors.fullName && <p className="text-red-500 m-1">{formik.errors.fullName}</p>}
            </div>
            <div>
            <input
                type="tel"
                placeholder="رقم الهاتف"
                {...formik.getFieldProps("phone")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && <p className="text-red-500 m-1">{formik.errors.phone}</p>}
            </div>
            <div>
            <input
                type="password"
                placeholder="كلمة المرور"
                {...formik.getFieldProps("password")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password && <p className="text-red-500 m-1">{formik.errors.password}</p>}
            </div>
            <div>
            <input
                type="number"
                placeholder="العمر"
                {...formik.getFieldProps("age")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.age && formik.errors.age && <p className="text-red-500 m-1">{formik.errors.age}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="العنوان"
                {...formik.getFieldProps("address")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.address && formik.errors.address && <p className="text-red-500 m-1">{formik.errors.address}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="الرقم القومي"
                {...formik.getFieldProps("nationalID")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.nationalID && formik.errors.nationalID && <p className="text-red-500 m-1">{formik.errors.nationalID}</p>}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">النوع</label>
                <div className="flex gap-4">
                    {/* ذكر */}
                    <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formik.values.gender === "male"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    ذكر
                    </label>

                    {/* أنثى */}
                    <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formik.values.gender === "female"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    أنثى
                    </label>
                </div>
                {formik.touched.gender && formik.errors.gender && (
                    <p className="text-red-500 m-1">{formik.errors.gender}</p>
                )}
            </div>
            <button
            onClick={async () => {
                // تحديد أن جميع الحقول قد تم لمسها
                formik.setTouched({
                fullName: true,
                phone: true,
                password: true,
                age: true,
                address: true,
                nationalID: true,
                gender: true,
                });

                // التحقق من صحة البيانات
                await formik.validateForm(); // نتحقق من الصحة أولاً

                // إذا كانت البيانات صحيحة، ننتقل إلى الخطوة التالية
                if (formik.isValid) {
                setStep(2);
                }
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
            التالي
            </button>
            </div>
        )}

        {/* الخطوة 3: التفاصيل المهنية */}
        {step === 2 && role === "employee" && (
            <div className="space-y-4">
            <div>
            <input
                type="number"
                placeholder="عدد سنوات الخبرة"
                {...formik.getFieldProps("experienceYears")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.experienceYears && formik.errors.experienceYears && <p className="text-red-500 m-1">{formik.errors.experienceYears}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="وصف الملف الشخصي"
                {...formik.getFieldProps("profileDescription")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.profileDescription && formik.errors.profileDescription && <p className="text-red-500 m-1">{formik.errors.profileDescription}</p>}
            </div>
            <div>
            <input
                type="file"
                placeholder="ملف السيرة الذاتية"
                {...formik.getFieldProps("cvFile")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.cvFile && formik.errors.cvFile && <p className="text-red-500 m-1">{formik.errors.cvFile}</p>}
            </div>
            <div>
            <input
                type="file"
                placeholder="الصورة الشخصية"
                {...formik.getFieldProps("profileImage")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.profileImage && formik.errors.profileImage && <p className="text-red-500 m-1">{formik.errors.profileImage}</p>}
            </div>
            <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">تسجيل</button>
            </div>
        )}

        {/* الخطوة 3: التفاصيل المهنية للطبيب */}
        {step === 2 && role === "doctor" && (
            <div className="space-y-4">
            <div>
            <input
                type="text"
                placeholder="اسم الجامعة"
                {...formik.getFieldProps("university")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.university && formik.errors.university && <p className="text-red-500 m-1">{formik.errors.university}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="التخصص"
                {...formik.getFieldProps("specialization")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.specialization && formik.errors.specialization && <p className="text-red-500 m-1">{formik.errors.specialization}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="مكان العمل الحالي"
                {...formik.getFieldProps("currentWorkplace")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.currentWorkplace && formik.errors.currentWorkplace && <p className="text-red-500 m-1">{formik.errors.currentWorkplace}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="عنوان مكان العمل"
                {...formik.getFieldProps("workplaceAddress")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.workplaceAddress && formik.errors.workplaceAddress && <p className="text-red-500 m-1">{formik.errors.workplaceAddress}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="رقم ترخيص مزاولة المهنة"
                {...formik.getFieldProps("licenseNumber")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.licenseNumber && formik.errors.licenseNumber && <p className="text-red-500 m-1">{formik.errors.licenseNumber}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="جهة إصدار الترخيص"
                {...formik.getFieldProps("licenseIssuer")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.licenseIssuer && formik.errors.licenseIssuer && <p className="text-red-500 m-1">{formik.errors.licenseIssuer}</p>}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium">مسجل في نقابة الأطباء؟</label>
                <select
                    name="isMedicalSyndicateMember"
                    value={formik.values.isMedicalSyndicateMember ? "true" : "false"} // تحويل boolean إلى string
                    onChange={(e) => {
                    const value = e.target.value === "true";
                    formik.setFieldValue("isMedicalSyndicateMember", value);
                    }}
                    className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                >
                    <option value="false">لا</option>
                    <option value="true">نعم</option>
                </select>
                {formik.touched.isMedicalSyndicateMember && formik.errors.isMedicalSyndicateMember && (
                    <p className="text-red-500 m-1">{formik.errors.isMedicalSyndicateMember}</p>
                )}
            </div>
            {formik.values.isMedicalSyndicateMember && (
                <div>
                <input
                    type="text"
                    placeholder="رقم العضوية في نقابة الأطباء"
                    {...formik.getFieldProps("syndicateNumber")}
                    className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.syndicateNumber && formik.errors.syndicateNumber && <p className="text-red-500 m-1">{formik.errors.syndicateNumber}</p>}
                </div>
            )}
            <div>
            <input
                type="text"
                placeholder="التخصصات الطبية"
                {...formik.getFieldProps("medicalSpecialties")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.medicalSpecialties && formik.errors.medicalSpecialties && <p className="text-red-500 m-1">{formik.errors.medicalSpecialties}</p>}
            </div>
            <div>
            <input
                type="file"
                placeholder="ملف السيرة الذاتية"
                {...formik.getFieldProps("cvFile")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.cvFile && formik.errors.cvFile && <p className="text-red-500 m-1">{formik.errors.cvFile}</p>}
            </div>
            <div>
            <input
                type="file"
                placeholder="المستندات الداعمة"
                {...formik.getFieldProps("supportingDocuments")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.supportingDocuments && formik.errors.supportingDocuments && <p className="text-red-500 m-1">{formik.errors.supportingDocuments}</p>}
            </div>
            <div>
            <input
                type="email"
                placeholder="البريد الإلكتروني المهني"
                {...formik.getFieldProps("workEmail")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.workEmail && formik.errors.workEmail && <p className="text-red-500 m-1">{formik.errors.workEmail}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="مواعيد العمل"
                {...formik.getFieldProps("workingHours")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.workingHours && formik.errors.workingHours && <p className="text-red-500 m-1">{formik.errors.workingHours}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="وسائل الاتصال الأخرى"
                {...formik.getFieldProps("contactMethods")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.contactMethods && formik.errors.contactMethods && <p className="text-red-500 m-1">{formik.errors.contactMethods}</p>}
            </div>
            <div>
            <input
                type="file"
                placeholder="الصورة الشخصية"
                {...formik.getFieldProps("profileImage")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.profileImage && formik.errors.profileImage && <p className="text-red-500 m-1">{formik.errors.profileImage}</p>}
            </div>
            <div>
            <input
                type="text"
                placeholder="وصف الملف الشخصي"
                {...formik.getFieldProps("profileDescription")}
                className="border border-gray-300 focus:border-gray-400 focus:outline-none p-2 w-full rounded"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
            />
            {formik.touched.profileDescription && formik.errors.profileDescription && <p className="text-red-500 m-1">{formik.errors.profileDescription}</p>}
            </div>
            <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">تسجيل</button>
            </div>
        )}
        </div>
        </div>
    </>
}