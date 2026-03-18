'use server';
/**
 * @fileOverview This file implements a Genkit flow for enhancing CV bullet points.
 *
 * - enhanceCvBulletPoints - A function that enhances an array of CV bullet points.
 * - CvBulletPointEnhancementInput - The input type for the enhanceCvBulletPoints function.
 * - CvBulletPointEnhancementOutput - The return type for the enhanceCvBulletPoints function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CvBulletPointEnhancementInputSchema = z.object({
  bulletPoints: z
    .array(z.string())
    .describe('An array of CV bullet points to be enhanced.'),
});
export type CvBulletPointEnhancementInput = z.infer<
  typeof CvBulletPointEnhancementInputSchema
>;

const CvBulletPointEnhancementOutputSchema = z.object({
  enhancedBulletPoints: z
    .array(z.string())
    .describe(
      'An array of enhanced CV bullet points, optimized for clarity, impact, and keywords.'
    ),
});
export type CvBulletPointEnhancementOutput = z.infer<
  typeof CvBulletPointEnhancementOutputSchema
>;

export async function enhanceCvBulletPoints(
  input: CvBulletPointEnhancementInput
): Promise<CvBulletPointEnhancementOutput> {
  return cvBulletPointEnhancementFlow(input);
}

const cvBulletPointEnhancementPrompt = ai.definePrompt({
  name: 'cvBulletPointEnhancementPrompt',
  input: { schema: CvBulletPointEnhancementInputSchema },
  output: { schema: CvBulletPointEnhancementOutputSchema },
  prompt: `You are an expert CV writer. Your task is to enhance the provided bullet points for a resume.
Focus on:
1.  **Impact**: Use strong action verbs and quantify achievements where possible.
2.  **Clarity**: Ensure each point is concise and easy to understand.
3.  **Keyword Optimization**: Incorporate relevant keywords for the role or industry.
4.  **Format**: Each enhanced point should still be a single bullet point.

Improve the following bullet points. Return the enhanced bullet points as a JSON array of strings, wrapped in an object with a key 'enhancedBulletPoints'.

Bullet Points to enhance:
{{#each bulletPoints}}
- {{{this}}}
{{/each}}`,
});

const cvBulletPointEnhancementFlow = ai.defineFlow(
  {
    name: 'cvBulletPointEnhancementFlow',
    inputSchema: CvBulletPointEnhancementInputSchema,
    outputSchema: CvBulletPointEnhancementOutputSchema,
  },
  async (input) => {
    const { output } = await cvBulletPointEnhancementPrompt(input);
    return output!;
  }
);
