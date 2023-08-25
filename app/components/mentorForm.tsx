"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-dropdown-select";

import { uploadFile } from "~/app/r2";
import { convertToTechnology, technologies } from "~/app/technologies";
import { getMentor, insertMentor } from "../mentors/actions";

interface MentorFormProps {
  email: string | null | undefined;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  description: string;
  tShirtId: string;
  allergies: string;
  technologies: string;
  youtubeURL: string;
}

const MentorFrom: React.FC<MentorFormProps> = ({ email }) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [showAllergiesInput, setShowAllergiesInput] = useState(false);
  const [values, setValues] = useState<any[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    email: email || "",
    phoneNumber: "",
    description: "",
    tShirtId: "",
    allergies: "",
    technologies: "",
    youtubeURL: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await insertMentor({
      ...formData,
      tShirtId: parseInt(formData.tShirtId),
      technologies: values.map((value) => value.name).join(", "),
    });
    if (!file) return;
    uploadFile({ fileName: file.name })
      .then((res) => {
        const url = res.url;
        return fetch(url, {
          method: "PUT",
          body: file,
        });
      })
      .then((res) => {
        console.log(res);
      });
    console.log(res);
    if (res) {
      router.push("/");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMentor(email ? email : "");
      return res;
    };
    const setData = async () => {
      let res = await fetchData();
      if (res) {
        setFormData({
          firstName: res.firstName ?? "",
          lastName: res.lastName ?? "",
          companyName: res.companyName ?? "",
          email: res.email ?? "",
          phoneNumber: res.phoneNumber ?? "",
          description: res.description ?? "",
          tShirtId: res.tShirtId.toString() ?? "",
          allergies: res.allergies ?? "",
          technologies: res.technologies ?? "",
          youtubeURL: res.youtubeURL ?? "",
        });
        if (res.allergies) setShowAllergiesInput(true);
      }
    };
    setData();
  }, [email]);

  useEffect(() => {
    if (formData.technologies) {
      const res = convertToTechnology(formData.technologies);
      setValues(res);
    }
  }, [formData.technologies]);

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
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
        required
      />
      <label htmlFor="file-upload">File Upload</label>
      <br />
      <input
        multiple={false}
        id="file-upload"
        type="file"
        onChange={(e) => {
          if (!e.target.files || e.target.files.length === 0) return;
          setFile(e.target.files[0]);
        }}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChangeTextArea}
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
        required
      />

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
      <input
        type="text"
        name="youtubeURL"
        placeholder="Youtube URL(optional)"
        value={formData.youtubeURL}
        onChange={handleChange}
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:ring focus:ring-blue-200"
      />
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

export default MentorFrom;
