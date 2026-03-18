
export const defaultTemplate = `
<div class="max-w-[800px] mx-auto p-8 bg-white shadow-lg text-slate-800 font-sans leading-relaxed">
  <header class="border-b-2 border-primary pb-6 mb-6">
    <h1 class="text-4xl font-bold text-primary mb-2 uppercase tracking-wide">{{personalInfo.fullName}}</h1>
    <div class="flex flex-wrap gap-4 text-sm text-slate-600">
      <span class="flex items-center gap-1">{{personalInfo.email}}</span>
      <span class="flex items-center gap-1">{{personalInfo.phone}}</span>
      <span class="flex items-center gap-1">{{personalInfo.location}}</span>
      {{#if personalInfo.website}}
      <span class="flex items-center gap-1">{{personalInfo.website}}</span>
      {{/if}}
      {{#if personalInfo.linkedin}}
      <span class="flex items-center gap-1">{{personalInfo.linkedin}}</span>
      {{/if}}
    </div>
  </header>

  <section class="mb-8">
    <h2 class="text-xl font-bold text-primary border-b border-slate-200 pb-1 mb-3 uppercase tracking-wider">Professional Summary</h2>
    <p class="text-slate-700">{{summary}}</p>
  </section>

  <section class="mb-8">
    <h2 class="text-xl font-bold text-primary border-b border-slate-200 pb-1 mb-4 uppercase tracking-wider">Experience</h2>
    <div class="space-y-6">
      {{#each experience}}
      <div>
        <div class="flex justify-between items-baseline mb-1">
          <h3 class="text-lg font-bold text-slate-800">{{role}}</h3>
          <span class="text-sm font-semibold text-slate-500">{{startDate}} — {{#if current}}Present{{else}}{{endDate}}{{/if}}</span>
        </div>
        <div class="flex justify-between items-baseline mb-2">
          <span class="font-semibold text-primary">{{company}}</span>
          <span class="text-sm italic text-slate-500">{{location}}</span>
        </div>
        <ul class="list-disc ml-5 space-y-1 text-slate-700">
          {{#each description}}
          <li>{{this}}</li>
          {{/each}}
        </ul>
      </div>
      {{/each}}
    </div>
  </section>

  <section class="mb-8">
    <h2 class="text-xl font-bold text-primary border-b border-slate-200 pb-1 mb-4 uppercase tracking-wider">Education</h2>
    <div class="space-y-4">
      {{#each education}}
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-bold text-slate-800">{{degree}} in {{field}}</h3>
          <div class="text-primary">{{school}}</div>
        </div>
        <div class="text-right">
          <div class="text-sm font-semibold text-slate-500">{{graduationDate}}</div>
          <div class="text-sm italic text-slate-500">{{location}}</div>
        </div>
      </div>
      {{/each}}
    </div>
  </section>

  <section>
    <h2 class="text-xl font-bold text-primary border-b border-slate-200 pb-1 mb-4 uppercase tracking-wider">Skills</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {{#each skills}}
      <div>
        <h3 class="font-bold text-slate-800 mb-1">{{category}}</h3>
        <p class="text-slate-700">{{#each items}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}</p>
      </div>
      {{/each}}
    </div>
  </section>
</div>
`;
