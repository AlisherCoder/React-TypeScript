// import { ChangeEvent, useState } from "react";

// export const useChange = <T,>(initialState: T) => {
//    const [formData, setFormData] = useState<T>(initialState);

//    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setFormData((prev: T) => ({ ...prev, [name]: value }));
//    };

//    return { formData, setFormData, handleChange };
// };
