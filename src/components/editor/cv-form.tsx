
"use client";

import { CVData, Experience, Education, SkillSet } from "@/types/cv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { BulletEnhancer } from "./bullet-enhancer";

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

export function CVForm({ data, onChange }: CVFormProps) {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""],
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter((exp) => exp.id !== id) });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Math.random().toString(36).substr(2, 9),
      school: "",
      degree: "",
      field: "",
      location: "",
      graduationDate: "",
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter((edu) => edu.id !== id) });
  };

  const addSkillSet = () => {
    const newSkill: SkillSet = {
      id: Math.random().toString(36).substr(2, 9),
      category: "",
      items: [""],
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkillSet = (id: string, field: keyof SkillSet, value: any) => {
    onChange({
      ...data,
      skills: data.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  const removeSkillSet = (id: string) => {
    onChange({ ...data, skills: data.skills.filter((skill) => skill.id !== id) });
  };

  return (
    <div className="space-y-8 pb-20">
      <section>
        <Card className="shadow-sm border-none bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="John Doe"
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                placeholder="+1 234 567 890"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="New York, NY"
                value={data.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="shadow-sm border-none bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[120px]"
              placeholder="Write a brief professional summary..."
              value={data.summary}
              onChange={(e) => onChange({ ...data, summary: e.target.value })}
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">Work Experience</h2>
          <Button onClick={addExperience} size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Experience
          </Button>
        </div>
        {data.experience.map((exp) => (
          <Card key={exp.id} className="shadow-sm border-none bg-white">
            <CardContent className="pt-6 space-y-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    disabled={exp.current}
                    value={exp.current ? "" : exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                    id={`current-${exp.id}`}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor={`current-${exp.id}`}>Currently work here</Label>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Responsibilities (Bullet Points)</Label>
                  <BulletEnhancer 
                    bullets={exp.description} 
                    onEnhanced={(enhanced) => updateExperience(exp.id, "description", enhanced)} 
                  />
                </div>
                {exp.description.map((desc, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={desc}
                      onChange={(e) => {
                        const newDesc = [...exp.description];
                        newDesc[idx] = e.target.value;
                        updateExperience(exp.id, "description", newDesc);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newDesc = exp.description.filter((_, i) => i !== idx);
                        updateExperience(exp.id, "description", newDesc.length ? newDesc : [""]);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateExperience(exp.id, "description", [...exp.description, ""])}
                  className="w-full dashed border-slate-200"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Bullet Point
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">Education</h2>
          <Button onClick={addEducation} size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Education
          </Button>
        </div>
        {data.education.map((edu) => (
          <Card key={edu.id} className="shadow-sm border-none bg-white">
            <CardContent className="pt-6 grid grid-cols-2 gap-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="space-y-2">
                <Label>School</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Graduation Date</Label>
                <Input
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">Skills</h2>
          <Button onClick={addSkillSet} size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Skill Category
          </Button>
        </div>
        {data.skills.map((skill) => (
          <Card key={skill.id} className="shadow-sm border-none bg-white">
            <CardContent className="pt-6 space-y-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => removeSkillSet(skill.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="space-y-2">
                <Label>Category (e.g. Languages, Tools)</Label>
                <Input
                  value={skill.category}
                  onChange={(e) => updateSkillSet(skill.id, "category", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Skills (Comma separated)</Label>
                <Input
                  placeholder="React, Tailwind, Node.js"
                  value={skill.items.join(", ")}
                  onChange={(e) => {
                    const items = e.target.value.split(",").map(i => i.trim());
                    updateSkillSet(skill.id, "items", items);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
