// Implemented GSAP animation suggestion flow, using AI to generate animation snippets based on content.
'use server';

/**
 * @fileOverview A GSAP animation suggestion AI agent.
 *
 * - suggestGsapAnimation - A function that suggests GSAP animation snippets.
 * - SuggestGsapAnimationInput - The input type for the suggestGsapAnimation function.
 * - SuggestGsapAnimationOutput - The return type for the suggestGsapAnimation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestGsapAnimationInputSchema = z.object({
  contentDescription: z
    .string()
    .describe('A description of the content that needs animation.'),
});
export type SuggestGsapAnimationInput = z.infer<typeof SuggestGsapAnimationInputSchema>;

const SuggestGsapAnimationOutputSchema = z.object({
  animationSnippet: z
    .string()
    .describe('A GSAP animation snippet that can be used for the content.'),
  explanation: z
    .string()
    .describe('An explanation of what the animation does and how to use it.'),
});
export type SuggestGsapAnimationOutput = z.infer<typeof SuggestGsapAnimationOutputSchema>;

export async function suggestGsapAnimation(input: SuggestGsapAnimationInput): Promise<SuggestGsapAnimationOutput> {
  return suggestGsapAnimationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestGsapAnimationPrompt',
  input: {schema: SuggestGsapAnimationInputSchema},
  output: {schema: SuggestGsapAnimationOutputSchema},
  prompt: `You are an expert in GSAP animations. You will generate a GSAP animation snippet based on the description of the content provided.

Content Description: {{{contentDescription}}}

Provide the animation snippet and an explanation of what the animation does and how to use it.

Follow these formatting rules:
- Animation snippet should be properly formatted.
- Explanation should be concise and clear.
`,
});

const suggestGsapAnimationFlow = ai.defineFlow(
  {
    name: 'suggestGsapAnimationFlow',
    inputSchema: SuggestGsapAnimationInputSchema,
    outputSchema: SuggestGsapAnimationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
