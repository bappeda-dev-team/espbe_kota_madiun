"use client"

import React, { useEffect, useState } from 'react';

// Define the type for the dropdown options
interface Option {
  kode_opd: string;
  nama_opd: string;
  urusan_opd: string | null;
}

const Dropdown: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    // Define an async function to fetch data
    const fetchOptions = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/opdall');
        const data = await response.json();

        // Ensure that data.data is an array before setting it
        if (Array.isArray(data.data)) {
          setOptions(data.data);
        } else {
          console.error('Data received from API is not an array:', data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the async function
    fetchOptions();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className="border rounded px-2 py-1"
    >
      {options.map((item) => (
        <option key={item.kode_opd} value={item.kode_opd}>
          {item.nama_opd}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

