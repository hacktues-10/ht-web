"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-dropdown-select";

import { convertToTechnology, technologies } from "~/app/technologies";
import {
  getParticipant,
  insertParticipant,
} from "../../user/configure/actions";
import { parseElsysEmail } from "~/app/_elsys/service";
import { convertStringToGrade } from "./isAlumni";

interface FromProps {
  email: string | null | undefined;
}

export interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  grade:
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "1993"
    | "1994"
    | "1995"
    | "1996"
    | "1997"
    | "1998"
    | "1999"
    | "2000"
    | "2001"
    | "2002"
    | "2003"
    | "2004"
    | "2005"
    | "2006"
    | "2007"
    | "2008"
    | "2009"
    | "2010"
    | "2011"
    | "2012"
    | "2013"
    | "2014"
    | "2015"
    | "2016"
    | "2017"
    | "2018"
    | "2019"
    | "2020"
    | "2021"
    | "2022"
    | "2023"
    | "";
  parallel: "А" | "Б" | "В" | "Г" | "";
  tShirtId: string;
  allergies: string;
  technologies: string;
}

const Form: React.FC<FromProps> = ({ email }) => {
  const router = useRouter();
  const [showAllergiesInput, setShowAllergiesInput] = useState(false);
  const [values, setValues] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    grade: "",
    parallel: "",
    tShirtId: "",
    allergies: "",
    technologies: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.grade ||
      (!formData.parallel && !(parseInt(formData.grade) > 12)) ||
      !formData.tShirtId
    ) {
      console.error("Please fill in all fields");
      return;
    }

    const res = await insertParticipant({
      ...formData,
      grade: formData.grade,
      parallel: formData.parallel,
      tShirtId: parseInt(formData.tShirtId),
      technologies: values.map((value) => value.name).join(", "),
    });
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
          technologies: res[0].technologies ?? "",
        });

        if (res[0].allergies) setShowAllergiesInput(true);
      }
    };
    setData();
  }, []);

  useEffect(() => {
    const getElsysEmail = async () => {
      if (email) {
        const a = parseElsysEmail(email);
        if (a) {
          const converted = convertStringToGrade(a?.grade);
          setFormData((prevData) => ({ ...prevData, grade: converted }));
        }
      }
    };
    getElsysEmail();
  }, [email]);

  useEffect(() => {
    if (formData.technologies) {
      const res = convertToTechnology(formData.technologies);
      setValues(res);
    }
  }, [formData]);

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
      {parseInt(formData.grade) > 12 ? (
        <select
          name="vipusk"
          value={formData.grade}
          onChange={handleChange}
          className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
          required
          disabled
        >
          <option value="">Избери випуск</option>
          <option value={formData.grade}>{formData.grade}</option>
        </select>
      ) : (
        <>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
            required
            disabled
          >
            <option value="">Избери клас</option>
            <option value={formData.grade}>{formData.grade}</option>
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
        </>
      )}

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
      <Select
        options={technologies}
        labelField="name"
        valueField="id"
        onChange={(values) => setValues(values)}
        values={values}
        searchBy="name"
        multi={true}
        dropdownHandle={false}
        debounceDelay={300}
        keepSelectedInList={true}
        searchable={true}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "6px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
          padding: ".5rem",
          height: "198px",
        }}
      />

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
