// components/Form.js
import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  grade: string;
  parallel: string;
  tShirtId: string;
  allergies: string;
}

const Form: React.FC = () => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic here to submit the form data
    console.log(formData);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
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
