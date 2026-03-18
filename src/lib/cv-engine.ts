// src/lib/cv-engine.ts
import { db } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";

export async function generateCV(userId: string, templateName: 'template1' | 'template2' | 'template3') {
  // 1. Fetch user data from Firebase
  const userDoc = await getDoc(doc(db, "users", userId));
  if (!userDoc.exists()) throw new Error("User data not found");
  const userData = userDoc.data().cvData;

  // 2. Fetch the HTML template from the public folder
  const response = await fetch(`/templates/${templateName}.html`);
  let html = await response.text();

  // 3. Fetch Skills and AI rules for context
  const skillsRes = await fetch('/skills.md');
  const skills = await skillsRes.text();

  // 4. Simple Parser (Replace placeholders like {{name}} with Firebase data)
  Object.keys(userData).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, userData[key]);
  });

  return html;
}
