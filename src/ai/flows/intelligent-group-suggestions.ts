'use server';

/**
 * @fileOverview A Genkit flow for providing intelligent group suggestions to students based on their skills and interests.
 *
 * - suggestGroups - A function that suggests groups based on student profile data.
 * - SuggestGroupsInput - The input type for the suggestGroups function.
 * - SuggestGroupsOutput - The return type for the suggestGroups function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestGroupsInputSchema = z.object({
  studentProfile: z.object({
    skills: z.array(z.string()).describe('List of the student\u2019s skills.'),
    interests: z.string().describe('Description of the student\u2019s interests.'),
    groupPreferences: z.string().optional().describe('Any specific preferences for group types.'),
  }).describe('The student profile containing skills, interests and group preferences.'),
  availableGroups: z.array(z.object({
    groupId: z.string().describe('The unique identifier for the group.'),
    groupName: z.string().describe('The name of the group.'),
    projectTitle: z.string().describe('The project title of the group.'),
    techStack: z.array(z.string()).describe('The tech stack used by the group.'),
    description: z.string().describe('A brief description of the group and its goals.'),
  })).describe('A list of available groups with their details.'),
});
export type SuggestGroupsInput = z.infer<typeof SuggestGroupsInputSchema>;

const SuggestGroupsOutputSchema = z.array(z.object({
  groupId: z.string().describe('The ID of the suggested group.'),
  reason: z.string().describe('The reason why this group is suggested for the student.'),
})).describe('A list of group suggestions with reasons.');
export type SuggestGroupsOutput = z.infer<typeof SuggestGroupsOutputSchema>;

export async function suggestGroups(input: SuggestGroupsInput): Promise<SuggestGroupsOutput> {
  return suggestGroupsFlow(input);
}

const suggestGroupsPrompt = ai.definePrompt({
  name: 'suggestGroupsPrompt',
  input: {schema: SuggestGroupsInputSchema},
  output: {schema: SuggestGroupsOutputSchema},
  prompt: `You are an AI assistant designed to suggest suitable groups to students based on their profiles and available group information.

Given the following student profile:
Skills: {{studentProfile.skills}}
Interests: {{studentProfile.interests}}
Group Preferences: {{studentProfile.groupPreferences}}

And the following available groups:
{{#each availableGroups}}
Group ID: {{groupId}}
Group Name: {{groupName}}
Project Title: {{projectTitle}}
Tech Stack: {{techStack}}
Description: {{description}}
{{/each}}

Suggest a list of groups that the student might be interested in joining. For each suggested group, provide a clear and concise reason why that group is a good fit for the student.

Ensure that the output is a valid JSON array of objects, where each object contains the groupId and the reason for the suggestion.
`,
});

const suggestGroupsFlow = ai.defineFlow(
  {
    name: 'suggestGroupsFlow',
    inputSchema: SuggestGroupsInputSchema,
    outputSchema: SuggestGroupsOutputSchema,
  },
  async input => {
    const {output} = await suggestGroupsPrompt(input);
    return output!;
  }
);
