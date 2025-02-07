"use client";
import { useState } from "react";
import { createCharacter } from "@/actions/character.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CharacterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    personality: "",
    appearance: "",
    gender: "",
    occupation: "",
  });

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

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | string
  ) => {
    if (typeof e === "string") {
      setFormData((prev) => ({
        ...prev,
        gender: e,
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient">
          Create Your Character
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-medium">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white border-2 focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="personality" className="text-lg font-medium">
              Personality
            </Label>
            <Textarea
              id="personality"
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              required
              rows={3}
              className="bg-white border-2 focus:border-cyan-500 transition-colors resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="appearance" className="text-lg font-medium">
              Appearance
            </Label>
            <Textarea
              id="appearance"
              name="appearance"
              value={formData.appearance}
              onChange={handleChange}
              required
              rows={3}
              className="bg-white border-2 focus:border-cyan-500 transition-colors resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-lg font-medium">
              Gender
            </Label>
            <Select value={formData.gender} onValueChange={handleChange}>
              <SelectTrigger className="w-full border-2 focus:border-cyan-500 transition-colors bg-white">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-lg font-medium">
              Occupation
            </Label>
            <Input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              className="bg-white border-2 focus:border-cyan-500 transition-colors"
            />
          </div>

          <Button
            type="submit"
            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 animate-gradient"
          >
            Create Character
          </Button>
        </form>
      </div>
    </div>
  );
}
