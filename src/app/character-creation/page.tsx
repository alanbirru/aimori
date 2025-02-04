"use client";
import { useState } from "react";
import { createCharacter } from "@/actions/character.actions";

export default function CharacterCreation() {
  const [formData, setFormData] = useState({
    name: "",
    personality: "",
    appearance: "",
    gender: "",
    occupation: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  return <div>page</div>;
}
