"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { getParticipant, insertParticipant } from "./actions";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  grade: "8" | "9" | "10" | "11" | "12" | "";
  parallel: "А" | "Б" | "В" | "Г" | "";
  tShirtId: string;
  allergies: string;
}

const Form: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    grade: "",
    parallel: "",
    tShirtId: "",
    allergies: "",
  });

  const [showAllergiesInput, setShowAllergiesInput] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.grade || !formData.parallel || !formData.tShirtId) {
      console.error("Please fill in all fields");
      return;
    }
    const res = await insertParticipant({
      ...formData,
      grade: formData.grade,
      parallel: formData.parallel,
      tShirtId: parseInt(formData.tShirtId),
    });
    console.log(res);
    if (!res.success) {
      console.error(res.message);
    } else {
      router.push("/");
    }
  };

  const handleAllergiesCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowAllergiesInput(e.target.checked);
    if (!e.target.checked) {
      setFormData((prevData) => ({
        ...prevData,
        allergies: "",
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getParticipant();
      return res;
    };
    const setData = async () => {
      let res = await fetchData();
      if (res && res[0]) {
        setFormData({
          firstName: res[0].firstName ?? "",
          lastName: res[0].lastName ?? "",
          phoneNumber: res[0].phoneNumber ?? "",
          grade: res[0].grade ?? "",
          parallel: res[0].parallel ?? "",
          tShirtId: res[0].tShirtId.toString() ?? 1,
          allergies: res[0].allergies ?? "",
        });
        if (res[0].allergies) setShowAllergiesInput(true);
      }
    };
    setData();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-lg bg-gray-100 p-4 shadow-md"
    >
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
        required
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
        required
      />
      <select
        name="grade"
        value={formData.grade}
        onChange={handleChange}
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
        required
      >
        <option value="">Избери клас</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      <select
        name="parallel"
        value={formData.parallel}
        onChange={handleChange}
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
        required
      >
        <option value="">Избери паралелка</option>
        <option value="А">А</option>
        <option value="Б">Б</option>
        <option value="В">В</option>
        <option value="Г">Г</option>
      </select>
      <select
        name="tShirtId"
        value={formData.tShirtId}
        onChange={handleChange}
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
        required
      >
        <option value="">Избери размер на тениска</option>
        <option value="1">XS</option>
        <option value="2">S</option>
        <option value="3">M</option>
        <option value="4">L</option>
        <option value="5">XL</option>
      </select>
      <label className="mb-2 flex items-center">
        <input
          type="checkbox"
          name="allergiesCheckbox"
          checked={showAllergiesInput}
          onChange={handleAllergiesCheckboxChange}
          className="mr-2"
        />
        Имаш ли алергии?
      </label>
      {showAllergiesInput && (
        <input
          type="text"
          name="allergies"
          placeholder="Мляко, ядки и т.н."
          value={formData.allergies}
          onChange={handleChange}
          className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
          required
        />
      )}
      <button
        type="submit"
        className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
