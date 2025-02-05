"use client";
import { useState } from "react";
import { createCharacter } from "@/actions/character.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CharacterCreation() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    personality: "",
    appearance: "",
    gender: "",
    occupation: "",
  });

  //handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createCharacter(formData);

    if (!result.success) {
      toast.error(result.error || "Error creating character");
      return;
    }

    toast.success("Character created correctly");
    router.push("/dashboard");
  };

  //handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="block mb-2">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="personality" className="block mb-2">
            Personality
          </Label>
          <textarea
            id="personality"
            name="personality"
            value={formData.personality}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="appearance" className="block mb-2">
            Appearance
          </label>
          <textarea
            id="appearance"
            name="appearance"
            value={formData.appearance}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="gender" className="block mb-2">
            Gender
          </Label>
          <Input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="occupation" className="block mb-2">
            Occupation
          </Label>
          <Input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            className=" bg-white"
          />
        </div>

        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}
