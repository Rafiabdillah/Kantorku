export interface D16Lesson{id:string;title:string;description:string;minutes:number;skillId:string;summary:string;estimatedMinutes:number;lastReviewed:string}
export const D16_LESSONS:D16Lesson[]=[
 {id:'D16-LES-01',title:'Contrast and Readable Text',description:'Hitung kontras dengan luminance dan tentukan ukuran teks minimum.',minutes:15,skillId:'D16-SKILL-01',summary:'Kontras WCAG dihitung dari luminance warna.',estimatedMinutes:15,lastReviewed:'2026-11-01'},
 {id:'D16-LES-02',title:'Accessible Layout',description:'Susun hierarchy, spacing, dan responsive layout dengan fokus keyboard.',minutes:15,skillId:'D16-SKILL-02',summary:'Hierarchy dan layout responsif yang konsisten.',estimatedMinutes:15,lastReviewed:'2026-11-01'},
 {id:'D16-LES-03',title:'Interaction States',description:'Gunakan feedback yang tidak bergantung pada warna saja.',minutes:15,skillId:'D16-SKILL-03',summary:'State fokus, error, dan sukses dengan feedback jelas.',estimatedMinutes:15,lastReviewed:'2026-11-01'}
];
